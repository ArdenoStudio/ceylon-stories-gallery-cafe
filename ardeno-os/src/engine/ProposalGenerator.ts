import { RequirementProfile } from './RequirementAnalyzer';
import { BudgetTier } from './BudgetScopeMapper';
import { ExpectationEngine } from './ExpectationEngine';

/**
 * Priority 18: Client Lifecycle (§11)
 * §11 Proposal Generator: High-conversion project proposals.
 * Synthesizes requirements and pricing into a professional proposal.
 */
export class ProposalGenerator {
  private expectations = new ExpectationEngine();

  /**
   * Generates a rich project proposal as a JSON object for the frontend.
   */
  public async generateProposal(profile: RequirementProfile, tier: BudgetTier): Promise<any> {
    console.log(`[ProposalGen] Creating finalized proposal for ${profile.title}...`);

    const narrative = await this.expectations.generateNarrative(profile, tier);

    return {
      title: profile.title,
      client_industry: profile.industry,
      selected_tier: tier.name,
      pricing: tier.priceRange,
      features: tier.includedFeatures,
      trade_offs: tier.tradeOffs,
      executive_summary: narrative,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7-day validity
    };
  }
}
