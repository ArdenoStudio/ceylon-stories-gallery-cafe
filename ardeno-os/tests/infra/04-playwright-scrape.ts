/**
 * Test 04: Playwright + Key Rotation on Vercel (§32, §43)
 * Verifies: @sparticuz/chromium can take a screenshot in serverless.
 */

async function test() {
  console.log('[Test 04] Verifying Playwright screenshot capability...');

  if (process.platform === 'win32') {
    console.log('[Test 04] ⏭️ Skipped — @sparticuz/chromium runs on Linux Vercel/AWS instances only.');
    return;
  }

  try {
    // This test requires @sparticuz/chromium and playwright-core
    const chromium = await import('@sparticuz/chromium').catch(() => null);
    const pw = await import('playwright-core').catch(() => null);

    if (!chromium || !pw) {
      console.log('[Test 04] ⏭️ Skipped — playwright-core or @sparticuz/chromium not installed.');
      return;
    }

    const browser = await pw.chromium.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });

    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();

    if (screenshot.length < 1000) {
      throw new Error('Screenshot too small — likely failed');
    }

    console.log(`[Test 04] ✅ Playwright screenshot captured (${(screenshot.length / 1024).toFixed(1)}KB).`);
  } catch (e: any) {
    if (e.message?.includes('not installed')) {
      console.log('[Test 04] ⏭️ Skipped — Dependencies not available locally.');
    } else {
      throw e;
    }
  }
}

test().catch(e => { console.error(`[Test 04] ❌ ${e.message}`); process.exit(1); });
