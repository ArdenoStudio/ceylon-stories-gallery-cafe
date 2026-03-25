import { chromium } from 'playwright-core';
import chromium_sparticuz from '@sparticuz/chromium';
import { supabaseAdmin } from '../lib/supabase/client';

/**
 * Priority 19: Carousel Engine (§5)
 * §5 Headless Exporter: Automated visual export of generated slides.
 * Uses Sparticuz Chromium in Vercel Serverless environments.
 */
export class HeadlessExporter {
  private vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  /**
   * Captures a high-resolution screenshot of a React slide component.
   */
  public async exportSlide(slideId: string): Promise<string> {
    const url = `${this.vercelUrl}/render/slide/${slideId}`;
    console.log(`[Headless] Navigating to ${url} for high-res export...`);

    let browser;
    try {
      // In production, use @sparticuz/chromium + playwright-core
      browser = await chromium.launch({
        args: chromium_sparticuz.args,
        executablePath: await chromium_sparticuz.executablePath(),
        headless: true,
      });

      const context = await browser.newContext({
        viewport: { width: 1080, height: 1350 }, // Instagram portrait ratio
        deviceScaleFactor: 2,
      });

      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const buffer = await page.screenshot({ type: 'png', fullPage: true });

      const fileName = `exports/${slideId}-${Date.now()}.png`;

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin
         .storage
         .from('carousel-exports')
         .upload(fileName, buffer, { contentType: 'image/png' });

      if (error) throw new Error(`Storage upload failed: ${error.message}`);

      const { data: publicData } = supabaseAdmin
        .storage
        .from('carousel-exports')
        .getPublicUrl(fileName);

      return publicData.publicUrl;
    } catch (error: any) {
      console.error(`[HeadlessExporer] 🚨 Export failed:`, error.message);
      throw error;
    } finally {
      if (browser) await browser.close();
    }
  }

  /**
   * Finalizes a carousel by merging multiple slide exports.
   */
  public async exportFullCarousel(slideIds: string[]): Promise<string[]> {
     console.log(`[Headless] Processing batch export for ${slideIds.length} slides...`);
     
     const results = await Promise.all(slideIds.map(id => this.exportSlide(id)));
     return results;
  }
}
