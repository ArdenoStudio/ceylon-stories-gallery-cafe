import { supabaseAdmin } from '../lib/supabase/client';

export interface PromptVersion {
  id: string;
  prompt_key: string;
  version: number;
  content: string;
  is_active: boolean;
  metadata: any;
}

/**
 * Priority 13: AI & Prompt Infrastructure (§17)
 * §17 Prompt Version Control: Atomic instruction management.
 * Provides on-demand context injection for agents.
 */
export class PromptManager {
  
  /**
   * Retrieves the currently active version of a specific prompt.
   */
  public async getActivePrompt(key: string): Promise<string> {
    console.log(`[PromptManager] Fetching active prompt for key: ${key}`);

    const { data, error } = await supabaseAdmin
      .from('prompt_versions')
      .select('content')
      .eq('prompt_key', key)
      .eq('is_active', true)
      .single();

    if (error || !data) {
       console.warn(`[PromptManager] Active prompt not found for ${key}. Falling back to default.`);
       return "You are a specialized Ardeno agent.";
    }

    return data.content;
  }

  /**
   * Archives a specific prompt key/version.
   */
  public async toggleActiveStatus(key: string, version: number, active: boolean): Promise<void> {
    const { error } = await supabaseAdmin
      .rpc('rollback_prompt', { p_key: key, p_version: version });

    if (error) throw new Error(`[PromptManager] Failed to toggle state: ${error.message}`);
  }

  /**
   * Injects dynamic context (RequirementProfile) into a system prompt.
   */
  public injectContext(basePrompt: string, context: Record<string, string>): string {
     let injected = basePrompt;
     for (const [key, value] of Object.entries(context)) {
        injected = injected.replace(`{{${key}}}`, value);
     }
     return injected;
  }
}
