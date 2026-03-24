import { supabaseAdmin } from '../lib/supabase/client';
import { Client } from '@upstash/qstash';

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

  /**
   * Dispatches the next step of an agent's workflow via QStash.
   * This effectively "resets" the Vercel serverless timeout at every graph transition.
   */
  public async nextStep(state: GraphState): Promise<void> {
    console.log(`[OrchestrationGraph] Checkpointing state for trace ${state.trace_id} at node ${state.current_node}`);

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
}
