import { EmailSender } from './EmailSender';
import { ProspectAuditor, AuditHook } from './ProspectAuditor';

/**
 * Priority 25: Remaining Subsystems (§25)
 * §25 Outreach Agent: Hook-driven sales outreach.
 * Uses the ProspectAuditor's findings to send personalized outreach to high-intent leads.
 */
export class OutreachAgent {
  private email = new EmailSender();
  private auditor = new ProspectAuditor();

  /**
   * Performs an automated high-conversion outreach for a lead.
   */
  public async reachOut(leadEmail: string, url: string, rawScan: string): Promise<boolean> {
    console.log(`[Outreach] 🎯 Executing high-intent outreach for prospect ${url}...`);

    // 1. Generate the sales hook (§16)
    const hook = await this.auditor.generateHook(url, rawScan);

    // 2. Draft the personalized outreach message
    const body = `
      <h1>I noticed 3 major traffic leaks on your site: ${url}</h1>
      <ul>${hook.losing_points.map(p => `<li>${p}</li>`).join('')}</ul>
      <p>Ardeno OS can optimize these in 48 hours. ${hook.projected_roi}</p>
      <p>Let's talk? <a href="https://ardeno.os/book">Book a demo</a></p>
    `;

    // 3. Dispatch via serverless SMTP (§9)
    await this.email.sendEmail(leadEmail, `Important: ${url} Optimization Report`, body);

    console.log(`[Outreach] Successfully dispatched report to ${leadEmail}.`);
    
    return true;
  }

  /**
   * Tracks open and conversion rates for the outreach (§25).
   */
  public async logOutreachSuccess(leadEmail: string): Promise<void> {
     console.log(`[Outreach] ⚡ Tracking conversion success for ${leadEmail}...`);
  }
}
