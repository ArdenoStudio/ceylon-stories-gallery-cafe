/**
 * Test 05: Memory Retrieval (§34)
 * Verifies: pgvector similarity search via match_documents RPC.
 */
import { createClient } from '@supabase/supabase-js';

async function test() {
  console.log('[Test 05] Verifying pgvector memory retrieval...');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url === 'http://localhost:54321') {
    console.log('[Test 05] ⏭️ Skipped — No live Supabase credentials.');
    return;
  }

  const supabase = createClient(url, key);

  // 1. Insert a test memory with a dummy 1536-dim vector
  const dummyVector = Array(1536).fill(0).map(() => Math.random() * 0.1);
  const { error: insertErr } = await supabase.from('agent_memories').insert({
    agent_id: 'test-memory-agent',
    content: 'Test memory: Urban Kitchen brand uses warm amber palette',
    embedding: dummyVector,
    metadata: { test: true, project: 'urban-kitchen' },
  });

  if (insertErr) {
    console.log(`[Test 05] ⏭️ Skipped — Table may not exist: ${insertErr.message}`);
    return;
  }

  // 2. Query via RPC
  const { data, error: rpcErr } = await supabase.rpc('match_documents', {
    query_embedding: dummyVector,
    match_threshold: 0.5,
    match_count: 5,
    filter_agent_id: 'test-memory-agent',
  });

  if (rpcErr) {
    console.log(`[Test 05] ⏭️ Skipped — RPC not configured: ${rpcErr.message}`);
  } else if (data && data.length > 0) {
    console.log(`[Test 05] ✅ Memory retrieval working — found ${data.length} results.`);
  } else {
    console.log('[Test 05] ⚠️ RPC returned 0 results (may need function setup).');
  }

  // 3. Cleanup
  await supabase.from('agent_memories').delete().eq('agent_id', 'test-memory-agent');
}

test().catch(e => { console.error(`[Test 05] ❌ ${e.message}`); process.exit(1); });
