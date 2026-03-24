import { NextRequest, NextResponse } from 'next/server';
import { StripeWebhook } from '../../../../engine/StripeWebhook';

/**
 * Priority 18: Client Lifecycle (§11)
 * §11 Stripe Webhook Listener: Automated billing & milestone events.
 * Receives payment events from Stripe and triggers next project phases.
 */

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  // 1. Verify Stripe Signature (§11 Security)
  // This ensures only authorized Stripe events can trigger project lifecycle.

  console.log('[Stripe] 💳 Received payment event signature...');

  try {
    const handler = new StripeWebhook();
    const result = await handler.processEvent(body, signature!);

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Stripe] 🚨 Webhook Processing Failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
