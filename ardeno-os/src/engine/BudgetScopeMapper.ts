import { RequirementProfile } from './RequirementAnalyzer';

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
  
  /**
   * Maps a requirement profile to the ideal budget tier.
   */
  public async mapToTier(profile: RequirementProfile): Promise<BudgetTier> {
    console.log(`[BudgetMapper] Aligning ${profile.title} to market budget tiers...`);

    // In production, fetch current feature tiers from a JSON config
    if (profile.functional.length > 5) {
       return { 
         name: 'Enterprise', 
         priceRange: '$15,000+', 
         includedFeatures: profile.functional, 
         excludedFeatures: [],
         tradeOffs: ['Higher complexity', 'Longer delivery timeline']
       };
    }

    return { 
      name: 'Standard', 
      priceRange: '$2,500 - $5,000', 
      includedFeatures: profile.functional.slice(0, 3), 
      excludedFeatures: profile.functional.slice(3),
      tradeOffs: ['Fast delivery', 'Limited scalability in MVP phase']
    };
  }
}
