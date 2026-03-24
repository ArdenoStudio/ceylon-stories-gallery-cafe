/**
 * Ardeno OS — Verification Test Runner
 * Usage: npx tsx tests/run-suite.ts [infra|advanced|all]
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const INFRA_TESTS = [
  { id: '01', name: 'Vercel Deploy', file: 'infra/01-vercel-deploy.ts' },
  { id: '02', name: 'Supabase Realtime', file: 'infra/02-supabase-realtime.ts' },
  { id: '03', name: 'QStash Queue', file: 'infra/03-qstash-queue.ts' },
  { id: '04', name: 'Playwright Scrape', file: 'infra/04-playwright-scrape.ts' },
  { id: '05', name: 'Memory Retrieval', file: 'infra/05-memory-retrieval.ts' },
  { id: '06', name: 'Skill Auto-Update', file: 'infra/06-skill-update.ts' },
  { id: '20', name: 'Production Build', file: 'infra/20-production-build.ts' },
];

const ADVANCED_TESTS = [
  { id: '07', name: 'Critic Agent E2E', file: 'advanced/07-critic-agent.ts' },
  { id: '08', name: 'Red-Team Simulation', file: 'advanced/08-red-team.ts' },
  { id: '09', name: 'Marketplace Flow', file: 'advanced/09-marketplace-flow.ts' },
  { id: '10', name: 'Computer-Use E2E', file: 'advanced/10-computer-use.ts' },
  { id: '11', name: 'Compliance Report', file: 'advanced/11-compliance-report.ts' },
  { id: '12', name: 'Tenant Creation', file: 'advanced/12-tenant-creation.ts' },
  { id: '13', name: 'Simulation Sandbox', file: 'advanced/13-simulation-sandbox.ts' },
  { id: '14', name: 'Trace Visibility', file: 'advanced/14-trace-visibility.ts' },
  { id: '15', name: 'Quota Exhaustion', file: 'advanced/15-quota-exhaustion.ts' },
  { id: '16', name: 'Timeout Recovery', file: 'advanced/16-timeout-recovery.ts' },
  { id: '17', name: 'RLS Leak Detection', file: 'advanced/17-rls-leak.ts' },
  { id: '18', name: 'Auto-Approve Rules', file: 'advanced/18-auto-approve.ts' },
  { id: '19', name: 'Complexity Dashboard', file: 'advanced/19-complexity-dashboard.ts' },
];

// ─── Helpers ───
function log(msg: string, type: 'info' | 'pass' | 'fail' | 'skip' = 'info') {
  const icons = { info: '📋', pass: '✅', fail: '❌', skip: '⏭️' };
  console.log(`${icons[type]} ${msg}`);
}

function runTest(test: { id: string; name: string; file: string }): 'pass' | 'fail' | 'skip' {
  const filePath = path.join(__dirname, test.file);
  if (!fs.existsSync(filePath)) {
    log(`[${test.id}] ${test.name} — File not found: ${test.file}`, 'skip');
    return 'skip';
  }

  try {
    log(`[${test.id}] Running: ${test.name}...`, 'info');
    // Use --env-file to load .env.local natively in Node 20+
    const output = execSync(`node --env-file=.env.local node_modules/tsx/dist/cli.mjs "${filePath}"`, {
      stdio: ['inherit', 'pipe', 'inherit'],
      timeout: 120000,
      env: { ...process.env },
    }).toString();
    
    process.stdout.write(output);

    if (output.includes('⏭️ Skipped')) {
       log(`[${test.id}] ${test.name} — SKIPPED`, 'skip');
       return 'skip';
    }

    log(`[${test.id}] ${test.name} — PASSED`, 'pass');
    return 'pass';
  } catch (e: any) {
    log(`[${test.id}] ${test.name} — FAILED: ${e.message?.slice(0, 100)}`, 'fail');
    return 'fail';
  }
}

// ─── Main ───
const suite = process.argv[2] || 'all';
const tests = suite === 'infra' ? INFRA_TESTS : suite === 'advanced' ? ADVANCED_TESTS : [...INFRA_TESTS, ...ADVANCED_TESTS];

console.log(`\n🧪 Ardeno OS Verification Suite — Running ${tests.length} tests (${suite})\n${'═'.repeat(60)}\n`);

let passedCount = 0;
let failedCount = 0;
let skippedCount = 0;

for (const test of tests) {
  const result = runTest(test);
  if (result === 'pass') passedCount++;
  else if (result === 'skip') skippedCount++;
  else failedCount++;
}

console.log(`\n${'═'.repeat(60)}`);
log(`Results: ${passedCount} passed | ${failedCount} failed | ${skippedCount} skipped / ${tests.length} total`, failedCount > 0 ? 'fail' : 'pass');
console.log(`${'═'.repeat(60)}\n`);

process.exit(failedCount > 0 ? 1 : 0);
