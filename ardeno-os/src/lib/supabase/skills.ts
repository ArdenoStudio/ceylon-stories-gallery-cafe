import { supabaseAdmin } from './client';

/**
 * Priority 2: Agent Memory & Dynamic Skills (§34)
 * §34 Skills Registry Helpers: CRUD operations for the dynamic skills system.
 */

export interface Skill {
  id?: string;
  skill_name: string;
  department: string;
  description: string;
  system_prompt_snippet: string;
  performance_score: number;
  source: 'manual' | 'evolved' | 'marketplace';
  last_updated?: string;
}

/**
 * Get all skills for a specific department.
 */
export async function getSkillsByDepartment(department: string): Promise<Skill[]> {
  const { data, error } = await supabaseAdmin
    .from('skills_registry')
    .select('*')
    .eq('department', department)
    .order('performance_score', { ascending: false });

  if (error) throw new Error(`Skills fetch failed: ${error.message}`);
  return (data || []) as Skill[];
}

/**
 * Get the top-performing skill for a specific task type.
 */
export async function getBestSkill(department: string, skillName?: string): Promise<Skill | null> {
  let query = supabaseAdmin
    .from('skills_registry')
    .select('*')
    .eq('department', department)
    .order('performance_score', { ascending: false })
    .limit(1);

  if (skillName) {
    query = query.eq('skill_name', skillName);
  }

  const { data, error } = await query.single();
  if (error) return null;
  return data as Skill;
}

/**
 * Upsert a skill (create or update).
 */
export async function upsertSkill(skill: Skill): Promise<Skill> {
  const { data, error } = await supabaseAdmin
    .from('skills_registry')
    .upsert({
      ...skill,
      last_updated: new Date().toISOString(),
    }, { onConflict: 'skill_name' })
    .select()
    .single();

  if (error) throw new Error(`Skill upsert failed: ${error.message}`);
  return data as Skill;
}

/**
 * Update a skill's performance score after evaluation.
 */
export async function updateSkillScore(skillName: string, newScore: number): Promise<void> {
  const { error } = await supabaseAdmin
    .from('skills_registry')
    .update({
      performance_score: newScore,
      last_updated: new Date().toISOString(),
    })
    .eq('skill_name', skillName);

  if (error) throw new Error(`Skill score update failed: ${error.message}`);
}

/**
 * Get all skills available in the marketplace (§41).
 */
export async function getMarketplaceSkills(): Promise<Skill[]> {
  const { data, error } = await supabaseAdmin
    .from('skills_registry')
    .select('*')
    .eq('source', 'marketplace')
    .gte('performance_score', 80)
    .order('performance_score', { ascending: false });

  if (error) throw new Error(`Marketplace skills fetch failed: ${error.message}`);
  return (data || []) as Skill[];
}
