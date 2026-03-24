/**
 * Priority 16: Discord & Gmail (§8 + §9)
 * §9 Email Sender: Serverless SMTP/Gmail API sender.
 * Sends client project proposals, onboarding links, and interview invites.
 */
export class EmailSender {
  
  /**
   * Sends a structured proposal or invite email to a client.
   */
  public async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[EmailSender] Dispatching agency email to ${to}: ${subject}...`);

    // In production, use @sendgrid/mail or nodemailer (on Vercel Edge/Serverless)
    const payload = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'agency@ardeno.os' },
      subject: subject,
      content: [{ type: 'text/html', value: `<html><body>${body}</body></html>` }]
    };

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return res.status === 202;
  }
}
