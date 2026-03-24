import { NextRequest, NextResponse } from 'next/server';
import { Receiver } from '@upstash/qstash';
import { AgencyEngine } from '../../../../engine/AgencyEngine';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 11: Vercel Deployment Foundation (§33)
 * §33 QStash Queue Worker: The Pulse of the Sentient Agency.
 * Decouples long-running agent tasks from Vercel's 10s-59s serverless timeouts.
 * Every agent "thought" is micro-checkpointed and dispatched through this route.
 */

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export const POST = async (req: NextRequest) => {
  // 1. Verify QStash Signature (§33 Secure Foundation)
  const signature = req.headers.get('upstash-signature');
  const body = await req.text();
  
  if (!signature) {
     return NextResponse.json({ error: 'Unauthorized: Missing Signature' }, { status: 401 });
  }

  const isValid = await receiver.verify({
    signature: signature!,
    body,
  });

  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized: Invalid QStash Signature' }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const { traceId, tenantId, agentType, taskPayload } = payload;

  console.log(`[QStash] ⚡ Received agent task: ${agentType} (Trace: ${traceId})`);

  try {
    // 2. Mark agent activity in Supabase Realtime (§3)
    await supabaseAdmin
      .from('agent_activities')
      .insert({
        trace_id: traceId,
        tenant_id: tenantId,
        agent_type: agentType,
        status: 'running',
        message: `Agent ${agentType} processing task...`
      });

    // 3. Dispatch to Agency Engine (§1, §35)
    const engine = new AgencyEngine();
    const result = await engine.processAgentTask(agentType, taskPayload, traceId);

    // 4. Finalize activity
    await supabaseAdmin
      .from('agent_activities')
      .update({ status: 'completed', message: `Task finished for ${agentType}.` })
      .match({ trace_id: traceId, agent_type: agentType });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error(`[QStash] 🚨 Agent ${agentType} failed (Trace: ${traceId}):`, error.message);
    
    // 5. Log failure for Observability & Self-Healing (§39, §45)
    await supabaseAdmin
      .from('agent_activities')
      .update({ status: 'failed', message: `FAIL: ${error.message}` })
      .match({ trace_id: traceId, agent_type: agentType });

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
