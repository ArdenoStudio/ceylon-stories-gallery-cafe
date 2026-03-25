import * as cheerio from 'cheerio';
import { supabaseAdmin } from '../lib/supabase/client';
import { ComponentTrendScorer } from './ComponentTrendScorer';

/**
 * Priority 15: Smart Market-Aware UI Component Intelligence (§32)
 * Active scanner for discovering new UI components from registries.
 */
export class SmartMarketScanner {
  private scorer = new ComponentTrendScorer();

  public async startScan(): Promise<any[]> {
    console.log('[Scanner] Running live market scan across UI registries...');
    const discovered: Array<{
      component_name: string;
      source_library: string;
      description: string;
      preview_image_url: string;
      repo_url: string;
    }> = [];

    // 1. Scan Shadcn Blocks Demo (Simulated URL fetch for production)
    try {
      const response = await fetch('https://ui.shadcn.com/blocks');
      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);

        // Find block containers (simplified heuristic for shadcn blocks mapping)
        $('.border-border').each((_, el) => {
          const title = $(el).find('h3').text().trim() || 'Shadcn Block';
          if (title && title !== 'Shadcn Block') {
             discovered.push({
               component_name: title,
               source_library: 'shadcn/ui',
               description: `Extracted block from shadcn blocks registry`,
               preview_image_url: 'https://ui.shadcn.com/og.jpg',
               repo_url: 'https://github.com/shadcn-ui/ui'
             });
          }
        });
      }
    } catch (e) {
      console.warn('[Scanner] Failed to scan shadcn:', e);
    }

    // 2. Scan HyperUI
    try {
      const response = await fetch('https://www.hyperui.dev/');
      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);

        $('a[href^="/components/"]').each((_, el) => {
           const category = $(el).text().trim();
           if (category && category.length > 3) {
             discovered.push({
                component_name: `HyperUI ${category}`,
                source_library: 'HyperUI',
                description: `Tailwind CSS components for ${category}`,
                preview_image_url: 'https://www.hyperui.dev/og.jpg',
                repo_url: 'https://github.com/markmead/hyperui'
             });
           }
        });
      }
    } catch (e) {
       console.warn('[Scanner] Failed to scan HyperUI:', e);
    }

    // Deduplicate and Score
    const unique = Array.from(new Set(discovered.map(d => d.component_name)))
      .map(name => discovered.find(d => d.component_name === name)!);

    console.log(`[Scanner] Extracted ${unique.length} new components. Scoring them...`);

    const finalComponents = [];
    for (const comp of unique.slice(0, 10)) { // Limit to top 10 per scan to save API limits
       const score = await this.scorer.scoreComponent(comp.component_name, comp.repo_url);
       
       const record = {
         ...comp,
         trend_score: score.total_score,
         metadata: { metrics: score.metrics }
       };

       finalComponents.push(record);

       // Upsert to DB
       await supabaseAdmin.from('component_market_index').upsert({
         component_name: record.component_name,
         source_library: record.source_library,
         description: record.description,
         preview_image_url: record.preview_image_url,
         trend_score: record.trend_score
       }, { onConflict: 'component_name' });
    }

    return finalComponents;
  }
}
