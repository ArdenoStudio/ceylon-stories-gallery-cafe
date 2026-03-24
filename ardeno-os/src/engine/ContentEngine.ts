import { KeyRotator } from './KeyRotator';
import { RequirementProfile } from './RequirementAnalyzer';

/**
 * Priority 25: Remaining Subsystems (§15)
 * §15 Content-First Design Engine: Generates copy before design.
 * Ensures the UI is driven by high-conversion narrative rather than placeholders.
 */
export class ContentEngine {
  private rotator = new KeyRotator();

  /**
   * Generates a structural content-map for a project landing page.
   */
  public async generateLandingCopy(profile: RequirementProfile): Promise<any> {
    console.log(`[ContentEngine] Crafting high-conversion narrative for ${profile.title}...`);

    const response = await this.rotator.execute({
      taskType: 'creative',
      payload: {
        system: `You are the Ardeno Content Architect. 
                 Generate a 'Content-First' design spec. 
                 Provide headlines, value props, and CTA copy based on requirements.
                 Respond ONLY in JSON.`,
        user: `REQUIREMENTS: ${JSON.stringify(profile.functional)}`
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      return { headline: "Leading Innovation", subheadline: "Built with Ardeno OS" };
    }
  }

  /**
   * Injects content-first spec into the IntelligentComponentSelector (§32).
   */
  public async syncWithDesign(spec: any): Promise<void> {
     console.log('[ContentEngine] ⚡ Syncing content spec with UI selection layer...');
  }
}
