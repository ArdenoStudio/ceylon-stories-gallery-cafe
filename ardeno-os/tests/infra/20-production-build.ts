/**
 * Test 20: Full Production Build (§33)
 * Verifies: npm run build completes without errors.
 */
import { execSync } from 'child_process';
import path from 'path';

async function test() {
  console.log('[Test 20] Running full production build (next build)...');

  try {
    const rootDir = path.resolve(__dirname, '..', '..');
    execSync('npx next build', {
      cwd: rootDir,
      stdio: 'pipe',
      timeout: 180000,
      env: { ...process.env, NODE_ENV: 'production' },
    });
    console.log('[Test 20] ✅ Full production build succeeded.');
  } catch (e: any) {
    const stderr = e.stderr?.toString()?.slice(-300) || '';
    console.error('[Test 20] ❌ Build failed:', stderr);
    throw new Error('Production build failed');
  }
}

test().catch(e => { console.error(e.message); process.exit(1); });
