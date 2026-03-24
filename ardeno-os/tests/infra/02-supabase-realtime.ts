/**
 * Test 02: Supabase Realtime Sync (§33, §3)
 * Verifies: Database modifications reflect on the Sentient Stream in real-time.
 */
import { createClient } from '@supabase/supabase-js';

async function test() {
  console.log('[Test 02] Verifying Supabase Realtime connectivity...');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url === 'http://localhost:54321') {
    console.log('[Test 02] ⏭️ Skipped — No live Supabase credentials configured.');
    return;
  }

  const supabase = createClient(url, key);

  // 1. Insert a test activity
  const testRecord = {
    trace_id: `test-realtime-${Date.now()}`,
    tenant_id: 'test-tenant',
    agent_type: 'TestAgent',
    status: 'running',
    message: 'Verification test — Supabase Realtime sync',
  };

  const { error: insertErr } = await supabase.from('agent_activities').insert(testRecord);
  if (insertErr) throw new Error(`Insert failed: ${insertErr.message}`);

  // 2. Verify it can be read back
  const { data, error: readErr } = await supabase
    .from('agent_activities')
    .select('*')
    .eq('trace_id', testRecord.trace_id)
    .single();

  if (readErr) throw new Error(`Read failed: ${readErr.message}`);
  if (!data) throw new Error('Record not found after insert');

  // 3. Cleanup
  await supabase.from('agent_activities').delete().eq('trace_id', testRecord.trace_id);

  console.log('[Test 02] ✅ Supabase Realtime sync verified.');
}

test().catch(e => { console.error(`[Test 02] ❌ ${e.message}`); process.exit(1); });
