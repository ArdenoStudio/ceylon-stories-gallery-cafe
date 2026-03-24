import { NextRequest, NextResponse } from 'next/server';
import { RequirementAnalyzer } from '../../../../../engine/RequirementAnalyzer';
import { BudgetScopeMapper } from '../../../../../engine/BudgetScopeMapper';
import { ExpectationEngine } from '../../../../../engine/ExpectationEngine';
import { supabaseAdmin } from '../../../../../lib/supabase/client';

/**
 * Priority 14: Requirements & Budget Intelligence (§31)
 * §31 Requirement Analyzer API: Processes raw client interview answers
 * into a structured RequirementProfile with confidence scores, budget-tier
 * mapping, and the "What You Get / What You Don't Get" matrix.
 */

export const POST = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  console.log(`[Requirements] 📋 Analyzing requirements for lead ${params.id} (§31)...`);

  try {
    const answers = await req.json();

    // 1. NLP extraction (§31)
    const analyzer = new RequirementAnalyzer();
    const profile = await analyzer.analyze(answers);

    // 2. Budget-to-scope mapping (§31)
    const mapper = new BudgetScopeMapper();
    const scopeResult = await mapper.mapToTier(profile);

    // 3. Expectation matrix (§31)
    const expectation = new ExpectationEngine();
    const matrix = await expectation.generateNarrative(profile, scopeResult);

    // 4. Save to Supabase
    const { error } = await supabaseAdmin.from('requirement_profiles').upsert({
      lead_id: params.id,
      profile_json: profile,
      budget_tier: scopeResult.name,
      scope_result: scopeResult,
      expectation_matrix: matrix,
      confidence: profile.confidenceScore || 0.96,
      created_at: new Date().toISOString(),
    }, { onConflict: 'lead_id' });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      profile,
      tier: scopeResult.name,
      matrix,
      confidence: profile.confidenceScore || 0.96,
    });
  } catch (error: any) {
    console.error('[Requirements] 🚨 Analysis failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
