import { KeyRotator } from './KeyRotator';
import { supabaseAdmin } from '../lib/supabase/client';

/**
 * Priority 16: Discord & Gmail (§8 + §9)
 * §9 Gmail Monitor: Serverless lead extraction.
 */
export class GmailMonitor {
  private rotator = new KeyRotator();

  /**
   * Scans the latest inbox messages for potential agency leads.
   * Called by /api/cron/inbox-monitor (§33).
   */
  public async scanInbox(): Promise<void> {
    console.log('[GmailMonitor] Scanning inbox for new sentient agency leads...');

    // 1. Fetch unread messages from Gmail API (Mock for now)
    const messages = [
      { from: 'client@example.com', subject: 'Project Proposal', body: 'I need a new SaaS for real estate.' }
    ];

    for (const msg of messages) {
       // 2. Use Reasoning LLM to classify if IT is a lead (§9)
       const classify = await this.rotator.execute({
         taskType: 'reasoning',
         payload: {
           system: "Classify this email as 'Lead' or 'Spam'.",
           user: msg.body
         }
       });

       if (classify.text.includes('Lead')) {
          console.log(`[GmailMonitor] 🎯 High-intent lead detected from ${msg.from}! Dispatching to Commercial Agent...`);
          
          // 3. Insert into Supabase leads table
          await supabaseAdmin.from('leads').insert({
            email: msg.from,
            original_query: msg.body,
            status: 'unverified'
          });
       }
    }
  }
}
