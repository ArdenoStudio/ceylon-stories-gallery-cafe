import { defineConfig } from 'playwright-core';
import chromium from '@sparticuz/chromium';

/**
 * Playwright configuration for serverless Vercel environments.
 * Uses @sparticuz/chromium which provides a Chromium binary compatible
 * with AWS Lambda / Vercel serverless functions.
 *
 * On local Windows dev: tests/infra/04-playwright-scrape.ts auto-skips (win32).
 * On Vercel Linux: this config provides the correct executable path.
 */
export default defineConfig({
  use: {
    launchOptions: {
      executablePath: process.env.VERCEL
        ? await chromium.executablePath()
        : undefined,
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
      headless: chromium.headless,
    },
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },
  timeout: 30000,
  retries: 1,
});
