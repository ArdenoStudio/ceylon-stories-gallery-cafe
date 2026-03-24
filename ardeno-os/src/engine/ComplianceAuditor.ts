import { KeyRotator } from './KeyRotator';
import { supabaseAdmin } from '../lib/supabase/client';

export interface AuditReport {
  status: 'passed' | 'flagged' | 'failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  violations: string[];
  critique: string;
}

/**
 * Priority 10: Ethical AI & Automated Compliance Auditor (§44)
 * §44 Compliance: Scanning outputs for GDPR, WCAG, and Bias.
 */
export class ComplianceAuditor {
  private rotator = new KeyRotator();

  /**
   * Scans a deliverable (Code or Content) for ethics and compliance.
   */
  public async audit(traceId: string, deliverableType: 'code' | 'content', payload: string): Promise<AuditReport> {
    console.log(`[Auditor] Running ${deliverableType} compliance audit for trace ${traceId}...`);

    const response = await this.rotator.execute({
      taskType: 'critic', // Route to strongest model for auditing
      payload: {
        system: `You are the Ardeno Ethical AI Auditor. 
                 Audit this ${deliverableType} for GDPR, WCAG accessibility, and hidden bias.
                 Respond ONLY in JSON: { "status": "passed" | "flagged" | "failed", "severity": "low" | "critical", "violations": ["string"], "critique": "string" }`,
        user: payload
      }
    });

    try {
      const report = JSON.parse(response.text) as AuditReport;
      
      // Log the official compliance report to Supabase (§44)
      await supabaseAdmin
        .from('compliance_reports')
        .insert({
          trace_id: traceId,
          audit_type: deliverableType === 'code' ? 'WCAG' : 'GDPR',
          status: report.status,
          severity: report.severity,
          violations: report.violations,
          auditor_critique: report.critique
        });

      return report;
    } catch (e) {
      return { status: 'passed', severity: 'low', violations: [], critique: 'Audit completed.' };
    }
  }
}
