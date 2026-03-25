import nodemailer from 'nodemailer';

/**
 * Priority 16: Discord & Gmail (§8 + §9)
 * §9 Email Sender: SMTP/Gmail API sender.
 * Sends client project proposals, onboarding links, and interview invites.
 */
export class EmailSender {
  
  /**
   * Sends a structured proposal or invite email to a client.
   */
  public async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[EmailSender] Dispatching agency email to ${to}: ${subject}...`);

    if (!process.env.SMTP_HOST) {
       console.warn('[EmailSender] SMTP_HOST not configured. Mocking email send.');
       return true;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Ardeno Agency OS" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: `<html><body style="font-family: sans-serif; padding: 20px;">${body}</body></html>`,
      });
      console.log(`[EmailSender] Email sent successfully: ${info.messageId}`);
      return true;
    } catch (e: any) {
      console.error(`[EmailSender] Failed to send email: ${e.message}`);
      return false;
    }
  }
}
