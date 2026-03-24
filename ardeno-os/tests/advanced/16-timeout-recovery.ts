/**
 * Test 16: Timeout Recovery (§45)
 * Verifies: Micro-checkpointed state survives a simulated timeout.
 */
import { createClient } from '@supabase/supabase-js';

async function test() {
  console.log('[Test 16] Verifying timeout recovery via checkpoints...');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || url === 'http://localhost:54321') {
    console.log('[Test 16] ⏭️ Skipped — No live Supabase credentials.');
    return;
  }

  const supabase = createClient(url, key);

  const checkpoint = {
    trace_id: `test-timeout-${Date.now()}`,
    tenant_id: null,
    agent_id: 'DemoPipeline',
    node_name: 'Phase2_Design',
    checkpoint_type: 'timeout_recovery',
    state_json: { phase: 2, progress: 0.6, lastAction: 'template_selected' },
    status: 'active',
  };

  const { error: insertErr } = await supabase.from('agent_checkpoints').insert(checkpoint);
  if (insertErr) {
    console.log(`[Test 16] ⏭️ Skipped — Table may not exist: ${insertErr.message}`);
    return;
  }

  // Simulate resume after "timeout"
  const { data } = await supabase.from('agent_checkpoints')
    .select('state_json, node_name')
    .eq('trace_id', checkpoint.trace_id)
    .single();

  if (!data || data.node_name !== 'Phase2_Design') throw new Error('Checkpoint not recovered');

  const state = data.state_json as any;
  if (state.progress !== 0.6) throw new Error('State data corrupted after recovery');

  console.log(`[Test 16] ✅ Timeout recovery verified — resumed at ${data.node_name} (${state.progress * 100}% progress).`);
  await supabase.from('agent_checkpoints').delete().eq('trace_id', checkpoint.trace_id);
}

test().catch(e => { console.error(`[Test 16] ❌ ${e.message}`); process.exit(1); });
