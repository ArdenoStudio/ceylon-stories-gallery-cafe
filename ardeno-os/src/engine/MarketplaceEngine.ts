import { supabaseAdmin } from '../lib/supabase/client';

export interface MarketplaceListing {
  id: string;
  skill_name: string;
  price_cent: number;
  rating: number;
  graph_json: any;
}

/**
 * Priority 8: Agent & Skill Marketplace (§41)
 * §41 Marketplace: B2B skill trading platform with human quality gating.
 */
export class MarketplaceEngine {
  
  /**
   * Publishes a validated agent skill / orchestration graph to the marketplace.
   */
  public async publishSkill(tenantId: string, skillId: string, priceCent: number, graphJson: any): Promise<void> {
    console.log(`[Marketplace] Publishing skill ${skillId} for tenant ${tenantId}...`);

    const { error } = await supabaseAdmin
      .from('marketplace_listings')
      .insert({
        tenant_id: tenantId,
        skill_id: skillId,
        price_cent: priceCent,
        graph_json: graphJson,
        is_verified: false // Requires human auditor review (§41 rule)
      });

    if (error) throw new Error(`[Marketplace] Failed to publish listing: ${error.message}`);
  }

  /**
   * Installs a marketplace skill into a local tenant's orchestration vault.
   */
  public async procureSkill(buyerTenantId: string, listingId: string): Promise<void> {
    console.log(`[Marketplace] Procuring listing ${listingId} for tenant ${buyerTenantId}...`);

    // 1. Fetch listing details
    const { data: listing, error: fetchErr } = await supabaseAdmin
      .from('marketplace_listings')
      .select('*, skills_registry(skill_name, system_prompt)')
      .eq('id', listingId)
      .single();

    if (fetchErr || !listing) throw new Error('Listing not found.');

    // 2. Clone the skill into the buyer's registry
    const { error: installErr } = await supabaseAdmin
      .from('skills_registry')
      .insert({
        skill_name: `${listing.skills_registry.skill_name}_procured_${Date.now()}`,
        department: 'Marketplace',
        description: `Imported from Marketplace (Listing: ${listingId})`,
        system_prompt: listing.skills_registry.system_prompt
      });

    if (installErr) throw new Error(`Installation failed: ${installErr.message}`);

    console.log('[Marketplace] ⚡ Skill successfully installed in local vault.');
  }
}
