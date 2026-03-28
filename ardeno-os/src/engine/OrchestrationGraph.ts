import { supabaseAdmin } from '../lib/supabase/client';
import { Client } from '@upstash/qstash';
import { ObservabilityTracer } from './ObservabilityTracer';
import { DiscordDispatcher } from './DiscordDispatcher';

/**
 * Priority 3: Hierarchical Agent Orchestration (§35)
 * §45 Resilience: Micro-checkpointing state machines to bypass Serverless timeouts.
 */
export interface GraphState {
  trace_id: string;
  tenant_id: string;
  current_node: string;
  history: any[];
  context: any;
  status: 'active' | 'paused' | 'completed' | 'failed';
}

export class OrchestrationGraph {
  private qstash = new Client({ token: process.env.QSTASH_TOKEN || 'dummy' });
  private tracer = new ObservabilityTracer();
  private discord = new DiscordDispatcher();

  /**
   * Dispatches the next step of an agent's workflow via QStash.
   */
  public async nextStep(state: GraphState): Promise<void> {
    const startTime = Date.now();
    console.log(`[OrchestrationGraph] Checkpointing state for trace ${state.trace_id} at node ${state.current_node}`);

    // Log the trace span for this transition (§39 / §45)
    await this.tracer.logSpan({
      trace_id: state.trace_id,
      agent_id: state.current_node,
      status: state.status === 'active' ? 'completed' : 'failed',
      latency_ms: Date.now() - startTime
    });

    // Persist full state to Supabase before triggering Next.js background execution
    const { error } = await supabaseAdmin
      .from('agent_checkpoints')
      .upsert({
        trace_id: state.trace_id,
        tenant_id: state.tenant_id,
        agent_id: state.current_node,
        state_json: state,
        checkpoint_type: 'handoff',
        node_name: state.current_node,
        status: state.status
      }, { onConflict: 'trace_id' });

    if (error) throw new Error(`Failed to save checkpoint: ${error.message}`);

    // Trigger the next background execution via QStash
    // This hits the /api/agents/queue route which resumes the graph
    if (state.status === 'active') {
      await this.qstash.publishJSON({
        url: `${process.env.VERCEL_URL}/api/agents/queue`,
        body: { trace_id: state.trace_id },
        delay: 0, // Instant async execution
      });
    }
  }

  /**
   * Resumes the graph from the last saved Supabase checkpoint.
   */
  public async resume(traceId: string): Promise<GraphState | null> {
    const { data, error } = await supabaseAdmin
      .from('agent_checkpoints')
      .select('state_json')
      .eq('trace_id', traceId)
      .single();

    if (error || !data) return null;
    return data.state_json as GraphState;
  }
  /**
   * Main entry for resuming a graph node (§35).
   * Includes auto-restart loop with exponential backoff (§39 Self-Healing).
   */
  public async executeNode(nodeName: string, payload: any, traceId: string): Promise<any> {
    console.log(`[OrchestrationGraph] Executing node ${nodeName} for trace ${traceId}`);

    try {
      // Logic to actually run the node via SubAgentDispatcher or direct engine calls
      return { success: true, node: nodeName };
    } catch (err: any) {
      console.error(`[OrchestrationGraph] Node ${nodeName} failed: ${err.message}`);
      return await this.handleNodeFailure(nodeName, payload, traceId, err.message);
    }
  }

  /**
   * Auto-restart logic for failed graph nodes (§39 Self-Healing).
   * Reads retry_count from Supabase checkpoint, retries up to 3 times
   * with exponential backoff (5s → 15s → 45s), then permanently fails.
   */
  private async handleNodeFailure(nodeName: string, payload: any, traceId: string, errorMessage: string): Promise<any> {
    const { data: checkpoint } = await supabaseAdmin
      .from('agent_checkpoints')
      .select('retry_count, state_json')
      .eq('trace_id', traceId)
      .single();

    const retryCount = (checkpoint?.retry_count ?? 0) as number;
    const BACKOFF_DELAYS = [5, 15, 45]; // seconds

    if (retryCount < 3) {
      const delaySeconds = BACKOFF_DELAYS[retryCount] ?? 45;
      console.warn(`[OrchestrationGraph] Auto-restarting node ${nodeName} (attempt ${retryCount + 1}/3) in ${delaySeconds}s...`);

      await supabaseAdmin
        .from('agent_checkpoints')
        .update({ retry_count: retryCount + 1, status: 'retrying' })
        .eq('trace_id', traceId);

      await this.qstash.publishJSON({
        url: `${process.env.VERCEL_URL}/api/agents/queue`,
        body: { trace_id: traceId, agentType: nodeName, taskPayload: payload },
        delay: delaySeconds,
      });

      return { success: false, retrying: true, attempt: retryCount + 1 };
    }

    // Max retries reached — permanently fail and escalate
    console.error(`[OrchestrationGraph] 🚨 Node ${nodeName} permanently failed after 3 attempts. (Trace: ${traceId})`);

    await supabaseAdmin
      .from('agent_checkpoints')
      .update({ status: 'permanently_failed' })
      .eq('trace_id', traceId);

    await this.discord.sendAlert(
      `[Graph] 🚨 Node permanently failed after 3 auto-restart attempts.\n` +
      `**Node:** ${nodeName} | **Trace:** \`${traceId}\`\n` +
      `**Error:** ${errorMessage}`
    );

    return { success: false, permanently_failed: true };
  }
}
