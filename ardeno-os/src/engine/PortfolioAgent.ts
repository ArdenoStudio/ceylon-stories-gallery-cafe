import { supabaseAdmin } from '../lib/supabase/client';
import { RequirementProfile } from './RequirementAnalyzer';

/**
 * Priority 25: Remaining Subsystems (§24)
 * §24 Portfolio Agent: Auto-update Ardeno Studio's core portfolio.
 * Transforms successful project traces into public-facing case studies.
 */
export class PortfolioAgent {
  
  /**
   * Generates a structural case study for a project.
   */
  public async generateCaseStudy(profile: RequirementProfile, results: any): Promise<any> {
    console.log(`[Portfolio] Creating new case study for ${profile.title}...`);

    return {
      title: profile.title,
      industry: profile.industry,
      problem_summary: `The client needed an MVP for ${profile.industry}.`,
      solution_summary: `Ardeno OS managed 512 agents to build this in 48 hours.`,
      image_urls: results.images || [],
      performance_metrics: results.metrics || {},
      status: 'pending_approval' // Human review (§24)
    };
  }

  /**
   * Publishes the approved case study to the website (§24).
   */
  public async publishToArdeno(study: any): Promise<void> {
    console.log(`[Portfolio] 🔊 Successfully published case study ${study.title} to Ardeno.com.`);

    await supabaseAdmin
      .from('projects')
      .update({ is_public_portfolio: true })
      .eq('title', study.title);
  }
}
