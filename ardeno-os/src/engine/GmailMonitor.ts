import { KeyRotator } from './KeyRotator';
import { supabaseAdmin } from '../lib/supabase/client';
import { google } from 'googleapis';

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

    if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
      console.warn('[GmailMonitor] Missing Gmail OAuth credentials. Skipping live scan.');
      return;
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000'
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
      // 1. Fetch unread messages from Inbox
      const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread category:primary',
        maxResults: 5,
      });

      const messageIds = res.data.messages || [];
      if (messageIds.length === 0) {
        console.log('[GmailMonitor] No new unread primary emails.');
        return;
      }

      for (const msg of messageIds) {
         if (!msg.id) continue;
         
         const msgData = await gmail.users.messages.get({ userId: 'me', id: msg.id, format: 'full' });
         const headers = msgData.data.payload?.headers;
         const fromHeader = headers?.find(h => h.name === 'From')?.value || 'Unknown';
         const subjectHeader = headers?.find(h => h.name === 'Subject')?.value || 'No Subject';
         
         // Extract text body
         let bodyText = '';
         if (msgData.data.payload?.parts) {
            const textPart = msgData.data.payload.parts.find(p => p.mimeType === 'text/plain');
            if (textPart?.body?.data) {
               bodyText = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
            }
         } else if (msgData.data.payload?.body?.data) {
            bodyText = Buffer.from(msgData.data.payload.body.data, 'base64').toString('utf-8');
         }

         // 2. Use Reasoning LLM to classify if IT is a lead (§9)
         const classify = await this.rotator.execute({
           taskType: 'reasoning',
           payload: {
             system: "Classify this email as 'Lead', 'Inquiry', or 'Spam'. Respond with ONLY the exact word.",
             user: `Subject: ${subjectHeader}\nBody: ${bodyText.slice(0, 1000)}`
           }
         });

         const classification = classify.text.trim();

         if (classification === 'Lead' || classification === 'Inquiry') {
            console.log(`[GmailMonitor] 🎯 High-intent lead detected from ${fromHeader}! Dispatching to Commercial Agent...`);
            
            // 3. Insert into Supabase leads table
            await supabaseAdmin.from('leads').insert({
              email: fromHeader,
              original_query: `Subject: ${subjectHeader}\n\n${bodyText}`,
              status: 'unverified'
            });
         }

         // 4. Mark as read to avoid infinite loops
         await gmail.users.messages.modify({
           userId: 'me',
           id: msg.id,
           requestBody: { removeLabelIds: ['UNREAD'] }
         });
      }
    } catch (e: any) {
       console.error('[GmailMonitor] Gmail API Error:', e.message);
    }
  }
}
