import { NextRequest, NextResponse } from 'next/server';
import { DemoPipeline } from '../../../../engine/DemoPipeline';
import { supabaseAdmin } from '../../../../lib/supabase/client';
import { Client } from '@upstash/qstash';

/**
 * Priority 12: Autonomous Demo Pipeline (§10)
 * §10 Demo Creator API: The revenue engine.
 * Triggers the 6-phase demo generation pipeline:
 *   Phase 0: Multi-Turn Requirement Extraction
 *   Phase 1: Lead Qualification & Research
 *   Phase 2: Design (Template + Smart Component Selection)
 *   Phase 3: Development (Vercel Preview Deployment)
 *   Phase 4: Approval Gate (Discord Human-in-the-Loop)
 *   Phase 5: Delivery & Follow-Up
 */

const qstash = new Client({ token: process.env.QSTASH_TOKEN || '' });

export const POST = async (req: NextRequest) => {
  console.log('[Demo] 🚀 Demo Pipeline triggered (§10)...');

  try {
    const { leadId, tenantId, requirementProfileId } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required' }, { status: 400 });
    }

    // 1. Create the demo trace
    const traceId = `demo-${leadId}-${Date.now()}`;

    // 2. Log initial activity (§3)
    await supabaseAdmin.from('agent_activities').insert({
      trace_id: traceId,
      tenant_id: tenantId || 'ardeno-core',
      agent_type: 'DemoPipeline',
      status: 'running',
      message: `Phase 0: Starting 6-phase demo generation for lead ${leadId}...`,
    });

    // 3. Dispatch to QStash background worker (§33, §45)
    // This ensures the entire pipeline runs async without hitting Vercel timeouts
    await qstash.publishJSON({
      url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/agents/queue`,
      body: {
        traceId,
        tenantId: tenantId || 'ardeno-core',
        agentType: 'DemoPipeline',
        taskPayload: {
          leadId,
          requirementProfileId,
          phase: 0,
        },
      },
    });

    return NextResponse.json({
      success: true,
      traceId,
      message: 'Demo pipeline dispatched to background worker',
    });
  } catch (error: any) {
    console.error('[Demo] 🚨 Pipeline trigger failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
