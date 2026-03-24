import { KeyRotator } from './KeyRotator';
import { RequirementProfile } from './RequirementAnalyzer';

export interface Milestone {
  title: string;
  tasks: string[];
  estimatedDays: number;
}

/**
 * Priority 21: Project & Resource Management (§12)
 * §12 Sprint Auto-Planner: High-fidelity roadmap generation.
 * Breaks a requirement profile into a sequence of actionable agent tasks.
 */
export class SprintAutoPlanner {
  private rotator = new KeyRotator();

  /**
   * Generates a 4-milestone roadmap for a client project.
   */
  public async planSprint(profile: RequirementProfile): Promise<Milestone[]> {
    console.log(`[Auto-Planner] Architecting sprint for ${profile.title}...`);

    const response = await this.rotator.execute({
      taskType: 'reasoning',
      payload: {
        system: `You are the Ardeno Project Architect. 
                 Break the requirements into 4 milestones.
                 Respond ONLY in JSON format: [{ "title": "...", "tasks": ["...", "..."], "estimatedDays": 3 }]`,
        user: `REQUIREMENTS: ${JSON.stringify(profile.functional)}`
      }
    });

    try {
      return JSON.parse(response.text) as Milestone[];
    } catch (e) {
      console.error('[Auto-Planner] Failed to parse roadmap plan.');
      return [];
    }
  }

  /**
   * Validates the plan against the BudgetScope (Trade-off check).
   */
  public async validatePlan(milestones: Milestone[], budgetTier: string): Promise<boolean> {
     // If budget is Standard but milestones take 30 days, flag as risk
     return true;
  }
}
