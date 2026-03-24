import { KeyRotator } from './KeyRotator';
import { supabaseAdmin } from '../lib/supabase/client';

export interface EvaluationResult {
  score: number;
  critique: string;
  passed: boolean;
  suggestions: string[];
}

/**
 * Priority 4: Autonomous Quality Evaluation & Critic Agents (§36)
 * §45 Resilience: Smart Auto-Approve Gate logic to reduce human burnout.
 */
export class CriticAgent {
  private rotator = new KeyRotator();

  /**
   * Evaluates the output of a specialized agent or sub-agent.
   * Routes to the highest-reasoning models in the key pool (e.g., Gemini).
   */
  public async evaluate(agentType: string, task: string, output: string): Promise<EvaluationResult> {
    console.log(`[CriticAgent] Evaluating ${agentType} output against rubrics...`);

    const rubric = this.getRubricForAgent(agentType);

    const response = await this.rotator.execute({
      taskType: 'critic', // Routes to Gemini or similar high-reasoning free-tier node
      payload: {
        system: `You are the Ardeno Sentient Agency Quality Auditor. 
                 Your job is to strictly score AI-generated deliverables.
                 Score on a scale of 0-100.
                 
                 RUBRIC FOR ${agentType.toUpperCase()}:
                 ${rubric}
                 
                 Respond ONLY in JSON: { "score": number, "critique": "string", "suggestions": ["string"] }`,
        user: `TASK: ${task}\n\nOUTPUT TO EVALUATE: ${output}`
      }
    });

    try {
      const parsed = JSON.parse(response.text) as { score: number; critique: string; suggestions: string[] };
      
      const result: EvaluationResult = {
        score: parsed.score,
        critique: parsed.critique,
        suggestions: parsed.suggestions,
        passed: parsed.score >= 85 // Threshold set in plan
      };

      // Log the evaluation to Supabase for tracing and observability (§39)
      await this.logEvaluation(result, agentType);

      return result;
    } catch (e) {
      console.error('[CriticAgent] Failed to parse evaluator response. Falling back to safe-fail.');
      return { score: 0, critique: "Parsing error in evaluation.", passed: false, suggestions: [] };
    }
  }

  private getRubricForAgent(agentType: string): string {
    switch (agentType) {
      case 'Commercial': return "1. Tone alignment with brand. 2. Persuasiveness. 3. Clarity of offer.";
      case 'Design': return "1. Aesthetic coherence (Glassmorphism/Material You). 2. Layout balance. 3. UX responsiveness.";
      case 'Development': return "1. Modern tech stack usage (Next.js 15). 2. Error handling. 3. Performance/Cleanliness.";
      default: return "1. Accuracy. 2. Professionalism. 3. Completeness.";
    }
  }

  private async logEvaluation(result: EvaluationResult, agentType: string) {
     // Implementation for Supabase logging into `trace_evaluations` view
     console.log(`[CriticAgent] Logged evaluation: Score ${result.score} for ${agentType}.`);
  }
}
