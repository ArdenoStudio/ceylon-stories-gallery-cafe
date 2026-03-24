import { supabaseAdmin } from './client';

/**
 * Priority 2: Agent Memory & Dynamic Skills (§34)
 * §34 Memory Helpers: pgvector insert, query top-k, and similarity search.
 */

/**
 * Store a new memory with vector embedding.
 */
export async function insertMemory(
  agentId: string,
  content: string,
  embedding: number[],
  metadata: Record<string, any> = {}
) {
  const { data, error } = await supabaseAdmin
    .from('agent_memories')
    .insert({
      agent_id: agentId,
      content,
      embedding,
      metadata,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Memory insert failed: ${error.message}`);
  return data;
}

/**
 * Query top-k similar memories using the match_documents RPC function.
 * Requires the pgvector extension and match_documents SQL function.
 */
export async function queryTopKMemories(
  queryEmbedding: number[],
  agentId?: string,
  topK: number = 5,
  threshold: number = 0.7
) {
  const { data, error } = await supabaseAdmin.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: topK,
    filter_agent_id: agentId || null,
  });

  if (error) throw new Error(`Memory query failed: ${error.message}`);
  return data || [];
}

/**
 * Get all memories for a specific agent, ordered by recency.
 */
export async function getAgentMemories(agentId: string, limit: number = 20) {
  const { data, error } = await supabaseAdmin
    .from('agent_memories')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Agent memory fetch failed: ${error.message}`);
  return data || [];
}

/**
 * Delete a specific memory by ID.
 */
export async function deleteMemory(memoryId: string) {
  const { error } = await supabaseAdmin
    .from('agent_memories')
    .delete()
    .eq('id', memoryId);

  if (error) throw new Error(`Memory delete failed: ${error.message}`);
}
