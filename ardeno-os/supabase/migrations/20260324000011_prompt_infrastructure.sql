-- Migration: Prompt Infrastructure & Versioning

-- Prompt Versions: Stores the evolution of system instructions
-- Required for §17 AI & Prompt Infrastructure
create table if not exists public.prompt_versions (
  id uuid primary key default gen_random_uuid(),
  prompt_key text not null,     -- e.g., 'commercial_agent_v1'
  version int not null,
  content text not null,        -- The actual system instruction
  is_active boolean default false,
  metadata jsonb default '{}'::jsonb, -- Model compatibility, cost factors
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast prompt retrieval
create index on public.prompt_versions (prompt_key, version);
create index on public.prompt_versions (is_active) where is_active = true;

-- View: Active Prompt Registry
create or replace view public.active_prompts as
select 
  prompt_key,
  version,
  content
from public.prompt_versions
where is_active = true;

-- Function to roll back a prompt
create or replace function rollback_prompt(p_key text, p_version int) returns void
language plpgsql
as $$
begin
  update prompt_versions set is_active = false where prompt_key = p_key;
  update prompt_versions set is_active = true where prompt_key = p_key and version = p_version;
end;
$$;
