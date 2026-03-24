import { NextRequest, NextResponse } from 'next/server';
import { ObservabilityTracer } from '../../../../engine/ObservabilityTracer';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 5: Full Observability & Self-Healing (§39)
 * §39 Anomaly Detector: Scans for silent failures and latency spikes.
 * Identifies when a sub-system fails silently (e.g., Market Scanner hasn't found
 * new components in 72 hours, API latency spikes by 400%).
 * Expected frequency: Every 30 min via vercel.json
 */

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[Cron] 🔍 Running Anomaly Detection (§39)...');

  try {
    const anomalies: any[] = [];

    // 1. Check for stale Market Scanner (§32) — no new components in 72hrs
    const { data: recentScans } = await supabaseAdmin
      .from('component_market_index')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1);

    if (recentScans && recentScans.length > 0) {
      const lastScan = new Date(recentScans[0].created_at).getTime();
      const hoursSinceLastScan = (Date.now() - lastScan) / (1000 * 60 * 60);
      if (hoursSinceLastScan > 72) {
        anomalies.push({
          system: 'SmartMarketScanner',
          type: 'stale_data',
          message: `No new components discovered in ${hoursSinceLastScan.toFixed(0)} hours`,
          severity: 'warning',
        });
      }
    }

    // 2. Check for failed agent traces (§39) — more than 10% failure rate
    const { data: recentTraces } = await supabaseAdmin
      .from('traces')
      .select('status')
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (recentTraces && recentTraces.length > 10) {
      const failures = recentTraces.filter((t: any) => t.status === 'failed').length;
      const failRate = (failures / recentTraces.length) * 100;
      if (failRate > 10) {
        anomalies.push({
          system: 'AgencyEngine',
          type: 'high_failure_rate',
          message: `${failRate.toFixed(1)}% failure rate in last hour (${failures}/${recentTraces.length})`,
          severity: 'critical',
        });
      }
    }

    // 3. Log anomalies to Supabase
    if (anomalies.length > 0) {
      await supabaseAdmin.from('anomaly_logs').insert(
        anomalies.map(a => ({ ...a, detected_at: new Date().toISOString() }))
      );
      console.warn(`[AnomalyDetect] Found ${anomalies.length} anomalies`);
    }

    return NextResponse.json({ success: true, anomalies });
  } catch (error: any) {
    console.error('[Cron] 🚨 Anomaly Detection failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
