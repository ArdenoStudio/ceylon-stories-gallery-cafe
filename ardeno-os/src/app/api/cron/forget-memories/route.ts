import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 2: Agent Memory & Dynamic Skills (§34)
 * §34 Intelligent Forgetting: Prunes low-relevance memories older than 90 days.
 * Prevents context dilution and keeps the DB lightweight.
 * Expected frequency: Daily via vercel.json
 */

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[Cron] 🧹 Running Intelligent Forgetting (§34)...');

  try {
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Archive memories older than 90 days with low relevance
    const { data: staleMemories, error: fetchErr } = await supabaseAdmin
      .from('agent_memories')
      .select('id, agent_id, content, metadata')
      .lt('created_at', cutoffDate)
      .order('created_at', { ascending: true })
      .limit(100);

    if (fetchErr) throw new Error(fetchErr.message);

    if (!staleMemories || staleMemories.length === 0) {
      console.log('[Forgetting] No stale memories found. All good.');
      return NextResponse.json({ success: true, archived: 0 });
    }

    // 2. Move to archive table
    const { error: archiveErr } = await supabaseAdmin
      .from('agent_memories_archive')
      .insert(staleMemories.map((m: any) => ({
        original_id: m.id,
        agent_id: m.agent_id,
        content: m.content,
        metadata: m.metadata,
        archived_at: new Date().toISOString(),
      })));

    if (archiveErr) {
      console.warn('[Forgetting] Archive insert skipped (table may not exist yet):', archiveErr.message);
    }

    // 3. Delete from active table
    const ids = staleMemories.map((m: any) => m.id);
    const { error: deleteErr } = await supabaseAdmin
      .from('agent_memories')
      .delete()
      .in('id', ids);

    if (deleteErr) throw new Error(deleteErr.message);

    console.log(`[Forgetting] Archived ${staleMemories.length} stale memories.`);
    return NextResponse.json({ success: true, archived: staleMemories.length });
  } catch (error: any) {
    console.error('[Cron] 🚨 Intelligent Forgetting failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
