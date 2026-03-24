import { NextRequest, NextResponse } from 'next/server';
import { SmartMarketScanner } from '../../../../engine/SmartMarketScanner';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 15: Smart Market-Aware UI Component Intelligence (§32)
 * §32 Market Scan: Vercel Cron endpoint for global component research.
 * Periodically visits 21st.dev, shadcn, HyperUI, and Reddit via Playwright.
 * Expected frequency: 0 0 * * * (Daily via vercel.json)
 */

export const GET = async (req: NextRequest) => {
  // 1. Verify Vercel Cron Secret (§33)
  const authHeader = req.headers.get('Authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
     return NextResponse.json({ error: 'Unauthorized: Missing Cron Secret' }, { status: 401 });
  }

  console.log('[Cron] 🌐 Starting Global UI Component Market Scan (§32)...');

  try {
    const scanner = new SmartMarketScanner();
    const results = await scanner.startScan();

    // 2. Perform score analysis per component (§32 Dimension Scoring)
    // 3. Update the component_market_index in Supabase
    const { error: dbErr } = await supabaseAdmin
      .from('component_market_index')
      .upsert(results);

    if (dbErr) throw new Error(dbErr.message);

    console.log(`[Cron] Global scan complete. ${results.length} new components discovered.`);
    
    return NextResponse.json({ success: true, count: results.length });
  } catch (error: any) {
    console.error('[Cron] 🚨 Global Scan Failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
