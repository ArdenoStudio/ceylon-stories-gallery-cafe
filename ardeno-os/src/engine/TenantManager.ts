import { supabaseAdmin } from '../lib/supabase/client';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  plan_tier: string;
  quota_limit_monthly: number;
  metadata: any;
}

/**
 * Priority 12: White-Label SaaS & Multi-Tenant Mode (§37)
 * §37 Tenant Isolation: Automated onboarding and limit enforcement.
 */
export class TenantManager {
  
  /**
   * Registers a new agency client (tenant) into the ecosystem.
   */
  public async createTenant(name: string, slug: string, theme: { primary: string, secondary: string }): Promise<string> {
    console.log(`[TenantManager] Creating new white-label tenant: ${name} (${slug})`);

    const { data, error } = await supabaseAdmin
      .from('tenants')
      .insert({
        name,
        slug,
        primary_color: theme.primary,
        secondary_color: theme.secondary,
        plan_tier: 'free', // Defaults to free tier
        quota_limit_monthly: 100000 // Tokens
      })
      .select('id')
      .single();

    if (error || !data) throw new Error(`[TenantManager] Failed to create tenant: ${error.message}`);

    return data.id;
  }

  /**
   * Fetches the specific branding configuration for a tenant.
   * Used for dynamic theme generation in the frontend.
   */
  public async getTenantTheme(tenantId: string): Promise<{ primary: string, secondary: string }> {
     const { data, error } = await supabaseAdmin
       .from('tenants')
       .select('primary_color, secondary_color')
       .eq('id', tenantId)
       .single();

     if (error || !data) return { primary: '#000000', secondary: '#ffffff' };

     return {
       primary: data.primary_color,
       secondary: data.secondary_color
     };
  }

  /**
   * Checks if a tenant has exceeded their monthly quota (§37 rule).
   */
  public async checkQuota(tenantId: string): Promise<boolean> {
     // In production, sum usage from `quota_logs` for current month
     return true; 
  }
}
