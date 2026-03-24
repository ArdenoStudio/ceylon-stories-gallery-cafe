-- Migration: Dynamic Skills Registry

-- Skills Registry Table: Stores the evolving prompts and logic nodes for agents
create table if not exists public.skills_registry (
  id uuid primary key default gen_random_uuid(),
  skill_name text unique not null,      -- e.g., 'commercial_pitch_generator'
  department text not null,             -- e.g., 'Commercial'
  description text not null,            -- What this skill accomplishes
  system_prompt text not null,          -- The core LLM instruction block
  performance_score float default 50.0, -- Out of 100
  version int default 1 not null,
  ab_test_active boolean default false, -- Flag for active A/B testing
  alternative_prompt text,              -- Prompt B for A/B testing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Optimize queries by department
create index on public.skills_registry (department);

-- RPC for the Skill Evolution Engine to conditionally trigger A/B swaps
create or replace function swap_winning_skill (
  p_skill_name text,
  p_new_prompt text,
  p_new_score float
) returns void
language plpgsql
as $$
begin
  update skills_registry
  set 
    system_prompt = p_new_prompt,
    performance_score = p_new_score,
    version = version + 1,
    ab_test_active = false,
    alternative_prompt = null,
    last_updated = now()
  where skill_name = p_skill_name;
end;
$$;
