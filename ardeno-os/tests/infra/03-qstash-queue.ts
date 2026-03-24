/**
 * Test 03: QStash Background Queue (§33, §45)
 * Verifies: Long-running agent jobs can be dispatched via QStash.
 */
import { Client } from '@upstash/qstash';

async function test() {
  console.log('[Test 03] Verifying QStash background queue...');

  const token = process.env.QSTASH_TOKEN;
  if (!token || token === '') {
    console.log('[Test 03] ⏭️ Skipped — No QStash token configured.');
    return;
  }

  const qstash = new Client({ token });

  // Publish a test message
  const result = await qstash.publishJSON({
    url: `${process.env.VERCEL_URL || 'https://httpbin.org/post'}`,
    body: {
      traceId: `test-qstash-${Date.now()}`,
      tenantId: 'test-tenant',
      agentType: 'TestAgent',
      taskPayload: { test: true },
    },
  });

  if (!result.messageId) {
    throw new Error('QStash did not return a messageId');
  }

  console.log(`[Test 03] ✅ QStash message dispatched: ${result.messageId}`);
}

test().catch(e => { console.error(`[Test 03] ❌ ${e.message}`); process.exit(1); });
