import { supabaseAdmin } from '../lib/supabase/client';

export interface DynamicSkill {
  skill_name: string;
  department: string;
  description: string;
  system_prompt: string;
  performance_score: number;
  ab_test_active: boolean;
  alternative_prompt?: string;
  version: number;
}

export class SkillEvolutionEngine {
  
  /**
   * Fetches the best possible instruction prompt for an agent role.
   */
  public async getSkillPrompt(skillName: string): Promise<string> {
    const { data, error } = await supabaseAdmin
      .from('skills_registry')
      .select('*')
      .eq('skill_name', skillName)
      .single();

    if (error || !data) {
      throw new Error(`[SkillEngine] Skill '${skillName}' not found.`);
    }

    const skill = data as DynamicSkill;

    // If an A/B test is active, pseudo-route 50% traffic
    if (skill.ab_test_active && skill.alternative_prompt && Math.random() > 0.5) {
      console.log(`[SkillEngine] 🧪 Serving Variant B prompt for ${skillName}`);
      return skill.alternative_prompt;
    }

    return skill.system_prompt;
  }

  /**
   * Receives a score from the CriticAgent (§36) and auto-tunes the skill representation.
   */
  public async evaluateSkillPerformance(skillName: string, usedVariantB: boolean, criticScore: number): Promise<void> {
    // In full implementation, we log this to a "skill_evaluations" ledger table
    // Then every 10 runs, compare Average(VariantA) to Average(VariantB) 
    // For now, if VariantB scores > 95, immediately promote it.
    
    if (usedVariantB && criticScore >= 95) {
      console.log(`[SkillEngine] 🏆 Variant B achieved high critic score! Auto-promoting to v-next for ${skillName}`);
      
      const { data } = await supabaseAdmin
        .from('skills_registry')
        .select('alternative_prompt')
        .eq('skill_name', skillName)
        .single();

      if (data?.alternative_prompt) {
         await supabaseAdmin.rpc('swap_winning_skill', {
           p_skill_name: skillName,
           p_new_prompt: data.alternative_prompt,
           p_new_score: criticScore
         });
      }
    }
  }
}
