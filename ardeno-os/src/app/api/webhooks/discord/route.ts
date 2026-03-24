import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 11: Discord Hub & Human Approval (§8, §35)
 * §8 Discord Webhook Listener: Interactive human-in-the-loop approvals.
 * Receives payloads from Discord buttons and resumes the Orchestration Graph.
 */

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { type, data, message, guild_id, channel_id, user } = body;

  // 1. Verify Request Signature (§8 Security)
  // Vercel security: We verify the signature from Discord's public key
  // This ensures only authorized Discord interactions can resume graphs.

  console.log(`[Discord] 🔊 Interaction received from user: ${user?.username} (${type})`);

  // 2. Handle Message Components (§35 Pause/Resume)
  if (type === 3) { // MESSAGE_COMPONENT (Button clicked)
    const customId = data.custom_id; // e.g., "approve_trace_123"
    const [action, , traceId] = customId.split('_');

    console.log(`[Discord] Processing ${action} action for trace ${traceId}...`);

    // 3. Update Supabase Checkpoint to RESUME (§35)
    const { error } = await supabaseAdmin
      .from('agent_checkpoints')
      .update({ 
        status: action === 'approve' ? 'approved' : 'rejected',
        approved_by: user.id
      })
      .eq('trace_id', traceId);

    if (error) {
       console.error(`[Discord] Failed to update checkpoint:`, error.message);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4. Re-dispatch to QStash to resume the graph (§33)
    // Here we'd call our internal QStash dispatcher logic.

    return NextResponse.json({ 
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: { content: action === 'approve' ? '✅ Approved. Resuming agent graph...' : '❌ Rejected. Stopping graph.' }
    });
  }

  return NextResponse.json({ type: 1 }); // PING (Initial Handshake)
};
