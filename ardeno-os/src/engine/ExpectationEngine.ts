import { KeyRotator } from './KeyRotator';
import { RequirementProfile } from './RequirementAnalyzer';
import { BudgetTier } from './BudgetScopeMapper';

/**
 * Priority 14: Requirements & Budget Intelligence Layer (§31)
 * §31 Expectation Engine: Client-facing project narrative.
 * Explains ROI, Deliverables, and Success Metrics.
 */
export class ExpectationEngine {
  private rotator = new KeyRotator();

  /**
   * Generates a "What You Get" narrative for a project proposal.
   */
  public async generateNarrative(profile: RequirementProfile, tier: BudgetTier): Promise<string> {
    console.log(`[ExpectationEngine] Synthesizing narrative for ${profile.title} at ${tier.name} tier...`);

    const response = await this.rotator.execute({
      taskType: 'creative', // Route to Mistral or similar creative node
      payload: {
        system: `You are the Ardeno Project Lead. 
                 Explain to the client exactly what they get at the ${tier.name} level.
                 Focus on ROI, deliverables, and success metrics.
                 Maintain a professional, expert tone.`,
        user: `REQUIREMENTS: ${JSON.stringify(profile.functional)}\nBUDGET_TIER: ${tier.name}`
      }
    });

    return response.text;
  }
}
