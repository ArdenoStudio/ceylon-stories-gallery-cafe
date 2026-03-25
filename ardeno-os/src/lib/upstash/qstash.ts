import { Client } from '@upstash/qstash';

let qstashClient: Client;

try {
  qstashClient = new Client({
    token: process.env.QSTASH_TOKEN || 'MISSING_TOKEN',
  });
} catch (e: any) {
  console.warn('[QStash] Warning: Failed to init client:', e.message);
  qstashClient = null as any;
}

export const qstash = qstashClient;
