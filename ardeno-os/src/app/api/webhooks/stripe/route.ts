import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * Priority 18: Client Lifecycle (§11)
 * §11 Stripe Webhook: Autonomous payment processing and plan upgrades.
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    console.log(`[Stripe] Processing event: ${type}...`);

    if (type === 'checkout.session.completed') {
       const { client_reference_id, amount_total } = data.object;
       const tenantId = client_reference_id;

       console.log(`[Stripe] 💸 Payment confirmed for Tenant ${tenantId}. Upgrading to Pro...`);

       // Upgrade the tenant plan in Supabase (§37)
       await supabaseAdmin
         .from('tenants')
         .update({ plan_tier: 'pro', quota_limit_monthly: 1000000 })
         .eq('id', tenantId);

       // Log the transaction in the financial ledger (§14)
       // await supabaseAdmin.from('financial_logs').insert({ tenant_id: tenantId, amount_cent: amount_total });
    }

    return NextResponse.json({ success: true, type });
  } catch (error: any) {
    console.error('[Stripe] Error handling webhook:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
