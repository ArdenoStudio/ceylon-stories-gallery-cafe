import { supabaseAdmin } from '../lib/supabase/client';
import { ComponentTrendScorer } from './ComponentTrendScorer';

/**
 * Priority 15: Smart Market-Aware UI Component Intelligence (§32)
 * §32 Intelligent Component Selector: Rank and select from marketplace.
 * Uses the ComponentMarketIndex (Supabase) to find components that match a given prompt.
 */
export class IntelligentComponentSelector {
  private scorer = new ComponentTrendScorer();

  /**
   * Finds the top-K best components matching a specific requirement.
   */
  public async selectTopMatch(requirement: string, limit: number = 3): Promise<any[]> {
    console.log(`[Selector] Searching market index for components matching: ${requirement}...`);

    const { data, error } = await supabaseAdmin
      .from('component_market_index')
      .select('*')
      .textSearch('tags', requirement) // Using GIN indexed text search
      .order('trend_score', { ascending: false })
      .limit(limit);

    if (error || !data) {
       console.warn('[Selector] No high-trend matches found. Falling back to base shadcn components.');
       return [];
    }

    return data;
  }
}
