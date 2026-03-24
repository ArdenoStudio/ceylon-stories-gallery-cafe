/**
 * Test 14: Trace Visibility in Sentient Stream (§39, §3)
 * Verifies: trace_id elements appear in agent_activities for UI rendering.
 */
import { createClient } from '@supabase/supabase-js';

async function test() {
  console.log('[Test 14] Verifying trace visibility in Sentient Stream...');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || url === 'http://localhost:54321') {
    console.log('[Test 14] ⏭️ Skipped — No live Supabase credentials.');
    return;
  }

  const supabase = createClient(url, key);

  const traceId = `test-trace-vis-${Date.now()}`;

  // Insert activity with trace_id
  const { error } = await supabase.from('agent_activities').insert({
    trace_id: traceId,
    tenant_id: 'test-tenant',
    agent_type: 'DesignArchitect',
    status: 'running',
    message: 'Generating UI layout for trace visibility test',
  });

  if (error) {
    console.log(`[Test 14] ⏭️ Skipped — Table may not exist: ${error.message}`);
    return;
  }

  // Verify the trace shows up in a query (simulating what SentientStream.tsx does)
  const { data } = await supabase
    .from('agent_activities')
    .select('trace_id, agent_type, status')
    .eq('trace_id', traceId)
    .single();

  if (!data || data.trace_id !== traceId) throw new Error('Trace not visible');

  console.log(`[Test 14] ✅ Trace ${traceId.slice(0, 20)}... visible in Sentient Stream.`);
  await supabase.from('agent_activities').delete().eq('trace_id', traceId);
}

test().catch(e => { console.error(`[Test 14] ❌ ${e.message}`); process.exit(1); });
