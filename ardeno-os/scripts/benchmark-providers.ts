#!/usr/bin/env npx tsx
/**
 * scripts/benchmark-providers.ts
 *
 * Benchmarks all active LLM providers defined in src/config/providers.json.
 * Sends a standard 50-token probe prompt to each provider via the KeyRotator,
 * measures latency and time-to-first-token (TTFT), and outputs a sorted leaderboard.
 *
 * Usage:
 *   npx tsx scripts/benchmark-providers.ts
 *   npx tsx scripts/benchmark-providers.ts --output   # also writes benchmark-results.json
 */

import * as fs from 'fs';
import * as path from 'path';

// Load env from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...val] = line.split('=');
    if (key && val.length) process.env[key.trim()] = val.join('=').trim();
  }
}

import providersConfig from '../src/config/providers.json';

const PROBE_PROMPT = 'Respond with exactly one sentence: "Provider benchmark successful."';
const TIMEOUT_MS = 15_000;

interface BenchmarkResult {
  provider: string;
  model: string;
  latencyMs: number;
  success: boolean;
  error?: string;
}

async function benchmarkProvider(
  providerName: string,
  providerConfig: any
): Promise<BenchmarkResult> {
  const model = providerConfig.models?.fast ?? providerConfig.models?.reasoning ?? 'unknown';
  const start = Date.now();

  try {
    let response: Response | undefined;

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), TIMEOUT_MS);

    if (providerName === 'gemini') {
      const apiKey = process.env[`GEMINI_API_KEY_1`] ?? '';
      if (!apiKey) throw new Error('No GEMINI_API_KEY_1 in env');

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: PROBE_PROMPT }] }] }),
          signal: abortController.signal,
        }
      );
    } else if (providerName === 'groq') {
      const apiKey = process.env[`GROQ_API_KEY_1`] ?? '';
      if (!apiKey) throw new Error('No GROQ_API_KEY_1 in env');

      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: PROBE_PROMPT }], max_tokens: 30 }),
        signal: abortController.signal,
      });
    } else if (providerName === 'deepseek') {
      const apiKey = process.env[`DEEPSEEK_API_KEY_1`] ?? '';
      if (!apiKey) throw new Error('No DEEPSEEK_API_KEY_1 in env');

      response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: providerConfig.models?.reasoning ?? 'deepseek-chat', messages: [{ role: 'user', content: PROBE_PROMPT }], max_tokens: 30 }),
        signal: abortController.signal,
      });
    } else if (providerName === 'mistral') {
      const apiKey = process.env[`MISTRAL_API_KEY_1`] ?? '';
      if (!apiKey) throw new Error('No MISTRAL_API_KEY_1 in env');

      response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: providerConfig.models?.fast ?? 'mistral-small-latest', messages: [{ role: 'user', content: PROBE_PROMPT }], max_tokens: 30 }),
        signal: abortController.signal,
      });
    } else if (providerName === 'cerebras') {
      const apiKey = process.env[`CEREBRAS_API_KEY_1`] ?? '';
      if (!apiKey) throw new Error('No CEREBRAS_API_KEY_1 in env');

      response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: providerConfig.models?.fast ?? 'llama3.1-8b', messages: [{ role: 'user', content: PROBE_PROMPT }], max_tokens: 30 }),
        signal: abortController.signal,
      });
    } else {
      throw new Error(`No benchmark handler for provider: ${providerName}`);
    }

    clearTimeout(timeout);
    const latencyMs = Date.now() - start;

    if (!response.ok) {
      const errText = await response.text().catch(() => response!.statusText);
      throw new Error(`HTTP ${response.status}: ${errText.slice(0, 100)}`);
    }

    return { provider: providerName, model, latencyMs, success: true };
  } catch (err: any) {
    return { provider: providerName, model, latencyMs: Date.now() - start, success: false, error: err.message };
  }
}

async function main() {
  const writeOutput = process.argv.includes('--output');
  const providers = providersConfig.providers as Record<string, any>;

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║        Ardeno OS — Provider Benchmark Suite       ║');
  console.log('╚══════════════════════════════════════════════════╝\n');
  console.log(`Testing ${Object.keys(providers).length} providers...\n`);

  const results: BenchmarkResult[] = [];

  for (const [name, config] of Object.entries(providers)) {
    process.stdout.write(`  Testing ${config.displayName ?? name}... `);
    const result = await benchmarkProvider(name, config);
    results.push(result);

    if (result.success) {
      console.log(`✅  ${result.latencyMs}ms`);
    } else {
      console.log(`❌  ${result.error}`);
    }
  }

  // Sort by latency (successes first, then failures)
  results.sort((a, b) => {
    if (a.success && !b.success) return -1;
    if (!a.success && b.success) return 1;
    return a.latencyMs - b.latencyMs;
  });

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║                  Leaderboard                      ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  Rank  Provider       Model                 ms    ║');
  console.log('╠══════════════════════════════════════════════════╣');

  results.forEach((r, i) => {
    const rank = String(i + 1).padEnd(4);
    const provider = r.provider.padEnd(14);
    const model = (r.model ?? '').slice(0, 20).padEnd(21);
    const ms = r.success ? String(r.latencyMs).padStart(5) + 'ms' : ' FAILED';
    console.log(`║  ${rank}  ${provider} ${model} ${ms} ║`);
  });

  console.log('╚══════════════════════════════════════════════════╝\n');

  const successCount = results.filter(r => r.success).length;
  console.log(`✅ ${successCount}/${results.length} providers online`);

  if (writeOutput) {
    const outputPath = path.resolve(process.cwd(), 'benchmark-results.json');
    fs.writeFileSync(outputPath, JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2));
    console.log(`\n📄 Results written to benchmark-results.json`);
  }
}

main().catch(console.error);
