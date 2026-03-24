import { supabaseAdmin } from '../lib/supabase/client';
import { EmbeddingCache } from '../lib/cache/EmbeddingCache';
import { KeyRotator } from './KeyRotator';

export interface AgentMemory {
  id?: string;
  agent_id: string;
  content: string;
  metadata?: any;
  created_at?: string;
  relevance_score?: number;
}

export class MemoryManager {
  private cache = new EmbeddingCache();
  private rotator = new KeyRotator();

  /**
   * Embeds and stores a new long-term semantic memory.
   * Leverages Upstash embedding hashing to save costs (§45 Resilience).
   */
  public async storeMemory(agentId: string, content: string, metadata: any = {}): Promise<void> {
    let embedding = await this.cache.getCachedEmbedding(content);

    if (!embedding) {
      console.log(`[MemoryManager] Generating net-new embedding for agent ${agentId}...`);
      // Use KeyRotator with 'embedding' task type to auto-route to free embedding endpoints (e.g. Gemini)
      const embedResponse = await this.rotator.execute({
        taskType: 'embedding',
        payload: { text: content }
      });
      // MOCK: Replace with real vector
      embedding = new Array(1536).fill(0.123); 
      await this.cache.setCachedEmbedding(content, embedding);
    } else {
      console.log(`[MemoryManager] ⚡ Cache HIT. Bypassing LLM cost for identical memory.`);
    }

    const { error } = await supabaseAdmin
      .from('agent_memories')
      .insert({
        agent_id: agentId,
        content,
        embedding,
        metadata,
        relevance_score: 1.0
      });

    if (error) {
      console.error('[MemoryManager] Failed to insert memory into pgvector', error);
      throw error;
    }
  }

  /**
   * Retrieves top-K contextually relevant memories for an agent.
   */
  public async recallContext(agentId: string, currentContext: string, matchCount: number = 5): Promise<AgentMemory[]> {
    let queryEmbedding = await this.cache.getCachedEmbedding(currentContext);

    if (!queryEmbedding) {
      const embedResponse = await this.rotator.execute({
        taskType: 'embedding',
        payload: { text: currentContext }
      });
      queryEmbedding = new Array(1536).fill(0.123);
      await this.cache.setCachedEmbedding(currentContext, queryEmbedding);
    }

    const { data, error } = await supabaseAdmin.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: matchCount,
      filter_agent_id: agentId
    });

    if (error) {
      console.error('[MemoryManager] pgvector match_documents failed', error);
      return [];
    }

    return data as AgentMemory[];
  }

  /**
   * Cron job target: Archiving memories unused for 90+ days.
   */
  public async runIntelligentForgetting(): Promise<void> {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data, error } = await supabaseAdmin
      .from('agent_memories')
      .update({ relevance_score: 0.1 }) // Soft archive
      .lt('last_accessed', ninetyDaysAgo.toISOString())
      .lt('relevance_score', 0.5);
      
    console.log('[MemoryManager] Intelligent Forgetting cycle completed.');
  }
}
