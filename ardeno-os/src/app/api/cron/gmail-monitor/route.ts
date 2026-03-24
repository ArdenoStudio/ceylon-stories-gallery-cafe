import { NextRequest, NextResponse } from 'next/server';
import { GmailMonitor } from '../../../../engine/GmailMonitor';
import { supabaseAdmin } from '../../../../lib/supabase/client';

/**
 * Priority 11: Cross-Platform Notification Layer (§9)
 * §9 Gmail CRM: Autonomous inbox monitoring.
 * Periodically scans the agency inbox, drafts AI responses in brand voice,
 * and routes them to Discord for human approval.
 * Expected frequency: Hourly via vercel.json
 */

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('[Cron] 📧 Running Gmail Inbox Monitor (§9)...');

  try {
    const monitor = new GmailMonitor();
    const newEmails = await monitor.checkInbox();

    if (!newEmails || newEmails.length === 0) {
      return NextResponse.json({ success: true, processed: 0 });
    }

    // 1. For each new email, log to Supabase
    for (const email of newEmails) {
      await supabaseAdmin.from('inbox_items').insert({
        from: email.from,
        subject: email.subject,
        body_preview: email.bodyPreview,
        received_at: email.receivedAt,
        status: 'pending_review',
      });
    }

    // 2. Trigger AI draft generation (§9, §17)
    // In production, this would call the KeyRotator to draft responses

    console.log(`[Gmail] Processed ${newEmails.length} new emails.`);
    return NextResponse.json({ success: true, processed: newEmails.length });
  } catch (error: any) {
    console.error('[Cron] 🚨 Gmail Monitor failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
