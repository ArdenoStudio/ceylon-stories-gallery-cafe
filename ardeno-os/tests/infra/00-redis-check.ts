/**
 * Quick Redis connectivity check
 */
import { Redis } from '@upstash/redis';

async function test() {
  console.log('[Redis] Testing Upstash Redis connection...');
  
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || 'https://improved-fox-83518.upstash.io',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || 'gQAAAAAAAUY-AAIncDI1ZjU2YWFhZTE1ZWM0MmVlYWJiYTRkMmJiZjZmOWRmMnAyODM1MTg',
  });

  // Set a test key
  await redis.set('ardeno-os:test', 'connection-verified');
  const result = await redis.get('ardeno-os:test');
  
  if (result !== 'connection-verified') {
    throw new Error(`Expected 'connection-verified', got '${result}'`);
  }

  // Cleanup
  await redis.del('ardeno-os:test');
  
  console.log('[Redis] ✅ Upstash Redis connection verified!');
}

test().catch(e => { console.error(`[Redis] ❌ ${e.message}`); process.exit(1); });
