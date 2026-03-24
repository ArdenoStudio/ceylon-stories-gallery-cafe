import { supabaseAdmin } from '../lib/supabase/client';

export interface TraceSpan {
  trace_id: string;
  agent_id: string;
  status: 'started' | 'completed' | 'failed';
  input_tokens?: number;
  output_tokens?: number;
  latency_ms?: number;
  metadata?: any;
}

/**
 * Priority 5: Full Observability, Tracing & Self-Healing (§39)
 * §45 Resilience: Complexity Coefficient calculation for AI operations.
 */
export class ObservabilityTracer {
  
  /**
   * Logs a new trace span to Supabase.
   */
  public async logSpan(span: TraceSpan): Promise<string | null> {
    console.log(`[Tracer] Logging ${span.status} for agent ${span.agent_id} (Trace: ${span.trace_id})`);

    // Calculate Complexity Coefficient (§45)
    const complexity = this.calculateComplexity(span);

    const { data, error } = await supabaseAdmin
      .from('traces')
      .insert({
        trace_id: span.trace_id,
        agent_id: span.agent_id,
        status: span.status,
        input_tokens: span.input_tokens || 0,
        output_tokens: span.output_tokens || 0,
        latency_ms: span.latency_ms || 0,
        metadata: span.metadata || {},
        complexity_coefficient: complexity
      })
      .select('id')
      .single();

    if (error) {
       console.error('[Tracer] Failed to log trace span:', error);
       return null;
    }

    return data.id;
  }

  /**
   * §45 Resilience: Algorithmic Complexity Dashboards for AI.
   * Synthesizes tokens, latency, and agent loops into a single metric.
   */
  private calculateComplexity(span: TraceSpan): number {
    const tokenFactor = ((span.input_tokens || 0) + (span.output_tokens || 0)) / 1000;
    const latencyFactor = (span.latency_ms || 0) / 10000; // 10s base
    
    // Normalised complexity score from 0.0 to 1.0+
    return (tokenFactor * 0.4) + (latencyFactor * 0.6);
  }
}
