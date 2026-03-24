import { OrchestrationGraph } from './OrchestrationGraph';
import { SubAgentDispatcher } from './SubAgentDispatcher';
import { LLMKeyPool } from './LLMKeyPool';
import { supabaseAdmin } from '../lib/supabase/client';

/**
 * Priority 11: Vercel Deployment Foundation (§33)
 * §33 AgencyEngine: The main background job orchestrator.
 * Routes QStash-triggered tasks to the correct state machine or sub-agent dispatcher.
 */
export class AgencyEngine {
  private graph: OrchestrationGraph;
  private dispatcher: SubAgentDispatcher;
  private keyPool: LLMKeyPool;

  constructor() {
    this.graph = new OrchestrationGraph();
    this.dispatcher = new SubAgentDispatcher();
    this.keyPool = LLMKeyPool.getInstance();
  }

  /**
   * Main entry point for the QStash Worker (§33, §35)
   */
  async processAgentTask(agentType: string, payload: any, traceId: string) {
    console.log(`[AgencyEngine] 🚀 Processing task: ${agentType} (Trace: ${traceId})`);

    // 1. Log to the Sentient Stream (§3)
    // 2. Identify if this is a Graph node or a direct Sub-Agent task
    
    // Example: Dispatch to the Orchestration Graph if it's a multi-step task
    if (['DemoPipeline', 'ClientOnboarding', 'MarketScan'].includes(agentType)) {
       return await this.graph.executeNode(agentType, payload, traceId);
    }

    // Example: Direct dispatch for atomic tasks
    return await this.dispatcher.dispatchAtomicTask(agentType, payload, traceId);
  }
}
