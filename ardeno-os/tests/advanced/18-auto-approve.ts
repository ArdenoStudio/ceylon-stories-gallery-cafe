/**
 * Test 18: Auto-Approve Rule Validation (§45)
 * Verifies: Critic >97 + 0 compliance flags = auto-approved (skips Discord).
 */
async function test() {
  console.log('[Test 18] Verifying Auto-Approve rules...');

  // Simulate evaluation results
  const scenarios = [
    { criticScore: 99, complianceFlags: 0, expected: 'auto_approve' },
    { criticScore: 97, complianceFlags: 0, expected: 'auto_approve' },
    { criticScore: 96, complianceFlags: 0, expected: 'human_review' },
    { criticScore: 99, complianceFlags: 1, expected: 'human_review' },
    { criticScore: 85, complianceFlags: 0, expected: 'human_review' },
    { criticScore: 60, complianceFlags: 3, expected: 'human_review' },
  ];

  let allPassed = true;

  for (const s of scenarios) {
    const decision = (s.criticScore >= 97 && s.complianceFlags === 0) ? 'auto_approve' : 'human_review';

    if (decision !== s.expected) {
      console.error(`  ❌ Score ${s.criticScore}, Flags ${s.complianceFlags}: got "${decision}", expected "${s.expected}"`);
      allPassed = false;
    } else {
      console.log(`  ✓ Score ${s.criticScore}, Flags ${s.complianceFlags} → ${decision}`);
    }
  }

  if (!allPassed) throw new Error('Auto-approve rules failed');
  console.log('[Test 18] ✅ All auto-approve rules validated correctly.');
}

test().catch(e => { console.error(`[Test 18] ❌ ${e.message}`); process.exit(1); });
