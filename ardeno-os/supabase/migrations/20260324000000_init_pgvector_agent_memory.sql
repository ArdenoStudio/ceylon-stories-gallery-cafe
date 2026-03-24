-- Migration: Initialize pgvector and Agent Memories Table

-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Agent Memories Table: Stores long-term semantic knowledge
create table if not exists public.agent_memories (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null,       -- e.g., 'commercial_agent', 'dev_agent'
  content text not null,        -- Text summary of the memory
  embedding vector(1536),       -- Embedding for text-embedding-3-small or equivalent
  metadata jsonb default '{}'::jsonb, -- Store links to traces, clients, or specific repos
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_accessed timestamp with time zone default timezone('utc'::text, now()) not null,
  relevance_score float default 1.0     -- Used by Intelligent Forgetting cron jobs
);

-- Optimize for fast similarity search using HNSW index
create index on public.agent_memories using hnsw (embedding vector_cosine_ops);

-- Similarity Search RPC (Remote Procedure Call)
-- Finds top-k most relevant memories for an agent's context window
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default 5,
  filter_agent_id text default null
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    agent_memories.id,
    agent_memories.content,
    agent_memories.metadata,
    1 - (agent_memories.embedding <=> query_embedding) as similarity
  from agent_memories
  where 
    (filter_agent_id is null or agent_memories.agent_id = filter_agent_id)
  order by agent_memories.embedding <=> query_embedding
  limit match_count;
end;
$$;
