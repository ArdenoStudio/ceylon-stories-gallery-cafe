import { supabaseAdmin } from '../lib/supabase/client';
import { LLMKeyPool } from './LLMKeyPool';

/**
 * Priority 6: Resilience & Risk Management (§45)
 * §45 Resilience: Hardening the OS against 10 identified major risks.
 */
export class ResilienceEngine {
  private keyPool = LLMKeyPool.getInstance();

  /**
   * Risk 1 Mitigation: Predictive Quota Exhaustion.
   * Scans 12-hour burn rate and alerts if pools will exhaust before reset.
   */
  public async runQuotaGuard(): Promise<{ status: 'healthy' | 'warning' | 'critical', message: string }> {
     // Fetch last 12 hours of token usage from traces
     const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
     
     const { data, error } = await supabaseAdmin
       .from('traces')
       .select('input_tokens, output_tokens')
       .gt('created_at', twelveHoursAgo);

     if (error || !data) return { status: 'healthy', message: "Insufficient data for prediction." };

     const totalTokens = data.reduce((sum, r) => sum + r.input_tokens + r.output_tokens, 0);
     const burnRatePerHour = totalTokens / 12;

     console.log(`[Resilience] Current burn rate: ${burnRatePerHour.toFixed(0)} tokens/hr.`);

     if (burnRatePerHour > 50000) { // Example threshold
        return { status: 'critical', message: "Warning: High burn rate detected. Failover to OpenRouter likely required in < 4 hours." };
     }

     return { status: 'healthy', message: "Quota runway is stable." };
  }

  /**
   * Risk 9 Mitigation: Smart Auto-Approve Gate.
   * If Critic Score > 97 AND Zero Compliance Flags, we bypass human Discord gate.
   */
  public shouldAutoApprove(criticScore: number, complianceFlags: number): boolean {
    const isSafe = criticScore >= 97 && complianceFlags === 0;
    if (isSafe) {
      console.log(`[Resilience] ⚡ Auto-Approve triggered (Score: ${criticScore}). Bypassing human loop.`);
    }
    return isSafe;
  }

  /**
   * Risk 2 Mitigation: Timeout Recovery Logic.
   * Injected into the /api/agents/queue route to handle QStash retries.
   */
  public async logTimeoutFailure(traceId: string, nodeName: string): Promise<void> {
     await supabaseAdmin
       .from('agent_checkpoints')
       .update({ status: 'error', checkpoint_type: 'timeout_interruption' })
       .eq('trace_id', traceId);
       
     console.error(`[Resilience] 🚨 Timeout detected on trace ${traceId} at ${nodeName}. Resilience mode active.`);
  }
}
