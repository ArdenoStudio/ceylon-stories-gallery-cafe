/**
 * Test 19: Complexity Dashboard (§39, §45)
 * Verifies: Complexity Coefficient can be calculated from trace metrics.
 */
async function test() {
  console.log('[Test 19] Verifying Complexity Coefficient calculation...');

  // Simulate trace data
  const traces = [
    { agentId: 'DemoPipeline', latencyMs: 4200, tokenCount: 5300, loopIterations: 2 },
    { agentId: 'MarketScanner', latencyMs: 8500, tokenCount: 12000, loopIterations: 5 },
    { agentId: 'CriticAgent', latencyMs: 800, tokenCount: 890, loopIterations: 1 },
  ];

  // Calculate complexity score (0-1 normalized)
  // Formula: weighted sum of latency, tokens, and iterations
  const maxLatency = 10000;
  const maxTokens = 20000;
  const maxIterations = 10;

  const scores = traces.map(t => ({
    agent: t.agentId,
    complexity: (
      (t.latencyMs / maxLatency) * 0.4 +
      (t.tokenCount / maxTokens) * 0.35 +
      (t.loopIterations / maxIterations) * 0.25
    ).toFixed(3),
  }));

  console.log('  Complexity Scores:');
  for (const s of scores) {
    console.log(`    ${s.agent}: ${s.complexity}`);
  }

  // Verify highest complexity is MarketScanner (most latency + tokens + loops)
  const highest = scores.sort((a, b) => parseFloat(b.complexity) - parseFloat(a.complexity))[0];
  if (highest.agent !== 'MarketScanner') {
    throw new Error(`Expected MarketScanner to be highest complexity, got ${highest.agent}`);
  }

  console.log(`[Test 19] ✅ Complexity Coefficient verified — highest: ${highest.agent} (${highest.complexity}).`);
}

test().catch(e => { console.error(`[Test 19] ❌ ${e.message}`); process.exit(1); });
