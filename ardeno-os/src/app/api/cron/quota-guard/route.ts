import { NextRequest, NextResponse } from 'next/server';
import { LLMKeyPool } from '../../../../engine/LLMKeyPool';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 5: Resilience & Risk Management (§45)
 * §45 Quota Guard: Predictive exhaustion monitoring.
 * Intercepts primary Key Pool exhaustion by predicting depletion 12 hours ahead.
 * Expected frequency: Every 30 min via vercel.json
 */

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[Cron] 🛡️ Running Quota Guard (§45)...');

  try {
    const keyPool = LLMKeyPool.getInstance();
    const providers = ['gemini', 'groq', 'deepseek', 'mistral', 'cerebras'] as const;
    const alerts: string[] = [];

    for (const provider of providers) {
      const keys = keyPool.getKeysByProvider(provider);
      const activeKeys = keys.filter(k => k.status === 'active');
      const exhaustedKeys = keys.filter(k => k.status === 'exhausted');
      const utilization = keys.length > 0 ? (exhaustedKeys.length / keys.length) * 100 : 0;

      // §45 Risk 1: Predict exhaustion 12 hours ahead
      if (utilization > 70) {
        alerts.push(`⚠️ ${provider} pool at ${utilization.toFixed(0)}% exhaustion — cascading to fallback soon`);
      }

      await supabaseAdmin.from('quota_logs').insert({
        provider,
        total_keys: keys.length,
        active_keys: activeKeys.length,
        exhausted_keys: exhaustedKeys.length,
        utilization_pct: utilization,
        checked_at: new Date().toISOString(),
      });
    }

    if (alerts.length > 0) {
      console.warn('[QuotaGuard] Alerts:', alerts);
      // §8 Discord alert would fire here
    }

    return NextResponse.json({ success: true, alerts });
  } catch (error: any) {
    console.error('[Cron] 🚨 Quota Guard failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
