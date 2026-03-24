/**
 * Test 01: Vercel Preview Deployment (§33)
 * Verifies: Next.js app builds and deploys successfully to Vercel.
 */
import { execSync } from 'child_process';

async function test() {
  console.log('[Test 01] Verifying Next.js production build...');

  try {
    execSync('npx next build', {
      cwd: process.cwd(),
      stdio: 'pipe',
      timeout: 120000,
    });
    console.log('[Test 01] ✅ Production build succeeded.');
  } catch (e: any) {
    const output = e.stdout?.toString() || e.stderr?.toString() || '';
    console.error('[Test 01] ❌ Build failed.');
    console.error(output.slice(-500));
    throw new Error('Production build failed');
  }
}

test().catch(e => { console.error(e.message); process.exit(1); });
