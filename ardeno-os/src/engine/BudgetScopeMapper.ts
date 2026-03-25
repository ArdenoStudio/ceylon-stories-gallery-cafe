import { RequirementProfile } from './RequirementAnalyzer';
import { KeyRotator } from './KeyRotator';

export interface BudgetTier {
  name: 'Standard' | 'Premium' | 'Enterprise';
  priceRange: string;
  includedFeatures: string[];
  excludedFeatures: string[];
  tradeOffs: string[];
}

/**
 * Priority 14: Requirements & Budget Intelligence Layer (§31)
 * §31 Budget Scope Mapper: Feature-tier alignment.
 * Maps extracted requirements to realistic project budgets and feature tiers.
 */
export class BudgetScopeMapper {
  private rotator = new KeyRotator();
  
  /**
   * Maps a requirement profile to the ideal budget tier.
   */
  public async mapToTier(profile: RequirementProfile): Promise<BudgetTier> {
    console.log(`[BudgetMapper] Aligning ${profile.title} to market budget tiers...`);

    const result = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Commercial Scope Assessor. 
                 Analyze the requirements and determine the appropriate budget tier (Standard, Premium, Enterprise).
                 Standard: $2,500 - $5,000 for simple MVPs.
                 Premium: $5,000 - $15,000 for advanced SaaS logic.
                 Enterprise: $15,000+ for massive scope/compliance.
                 Respond ONLY in valid JSON matching this interface: { name: '...', priceRange: '...', includedFeatures: string[], excludedFeatures: string[], tradeOffs: string[] }`,
        user: JSON.stringify(profile.functional)
      }
    });

    try {
      return JSON.parse(result.text) as BudgetTier;
    } catch {
      console.warn('[BudgetMapper] JSON parse failed, defaulting to Standard tier.');
      return { 
        name: 'Standard', 
        priceRange: '$2,500 - $5,000', 
        includedFeatures: profile.functional.slice(0, 3) || ['Core MVP'], 
        excludedFeatures: ['Custom Design System', 'High Scalability Backend'],
        tradeOffs: ['Fast delivery', 'Limited scalability in MVP phase']
      };
    }
  }
}
