import { NextRequest, NextResponse } from 'next/server';
import { OrchestrationGraph } from '@/engine/OrchestrationGraph';
import { SubAgentDispatcher } from '@/engine/SubAgentDispatcher';

/**
 * Priority 3: Hierarchical Agent Orchestration (§35)
 * QStash Background Queue Responder
 * Resumes agent workflows after serverless timeout "resets".
 */
export async function POST(req: NextRequest) {
  try {
    const { trace_id } = await req.json();

    if (!trace_id) {
      return NextResponse.json({ error: 'Missing trace_id' }, { status: 400 });
    }

    const graph = new OrchestrationGraph();
    const dispatcher = new SubAgentDispatcher();

    // 1. Resume graph state from Supabase checkpoint (§45 Resilience)
    const state = await graph.resume(trace_id);
    if (!state) {
      return NextResponse.json({ error: 'Graph state not found' }, { status: 404 });
    }

    console.log(`[Queue] Resuming graph for trace ${trace_id} at node ${state.current_node}...`);

    // 2. Execute the logic for the current node
    // For this POC, we route to the Aggregator or next logical department
    if (state.current_node === 'Aggregator') {
       state.history.push({ node: 'Aggregator', output: 'Synthesized all sub-agent results.', timestamp: Date.now() });
       state.current_node = 'Critic'; // Hand off to Priority 4 (§36)
       state.status = 'active';
       
       await graph.nextStep(state);
    }

    return NextResponse.json({ success: true, resumed_node: state.current_node });
  } catch (error: any) {
    console.error('[Queue] Error resuming agent graph:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
