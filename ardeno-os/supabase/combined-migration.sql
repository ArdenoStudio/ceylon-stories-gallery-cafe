-- ═══════════════════════════════════════════════════════════════
-- ARDENO OS — COMPLETE DATABASE MIGRATION
-- Run this in Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- 1. Enable pgvector extension
create extension if not exists vector;

-- ═══ TENANTS (§37) — Must be first due to foreign key refs ═══
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  primary_color text default '#000000',
  secondary_color text default '#ffffff',
  plan_tier text default 'free',
  quota_limit_monthly bigint default 100000,
  is_active boolean default true,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_tenants_slug on public.tenants (slug);

-- ═══ AGENT MEMORIES (§34) ═══
create table if not exists public.agent_memories (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null,
  tenant_id uuid references public.tenants(id),
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_accessed timestamp with time zone default timezone('utc'::text, now()) not null,
  relevance_score float default 1.0
);
create index if not exists idx_memories_hnsw on public.agent_memories using hnsw (embedding vector_cosine_ops);

-- Similarity Search RPC
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.7,
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
    and 1 - (agent_memories.embedding <=> query_embedding) > match_threshold
  order by agent_memories.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- ═══ SKILLS REGISTRY (§34) ═══
create table if not exists public.skills_registry (
  id uuid primary key default gen_random_uuid(),
  skill_name text unique not null,
  department text not null,
  description text not null,
  system_prompt text not null,
  performance_score float default 50.0,
  version int default 1 not null,
  ab_test_active boolean default false,
  alternative_prompt text,
  source text default 'manual',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_skills_dept on public.skills_registry (department);

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

-- ═══ AGENT CHECKPOINTS (§35, §45) ═══
create table if not exists public.agent_checkpoints (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,
  tenant_id uuid references public.tenants(id),
  agent_id text not null,
  state_json jsonb not null,
  checkpoint_type text not null,
  node_name text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_checkpoints_trace on public.agent_checkpoints (trace_id);

create or replace function purge_old_checkpoints(days_to_keep int default 7) returns void
language plpgsql
as $$
begin
  delete from public.agent_checkpoints
  where created_at < now() - (days_to_keep || ' days')::interval;
end;
$$;

-- ═══ TRACE EVALUATIONS (§36, §39) ═══
create table if not exists public.trace_evaluations (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,
  agent_id text,
  agent_type text not null,
  critic_score int not null,
  passed boolean not null,
  critique text,
  suggestions jsonb,
  retry_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_evals_trace on public.trace_evaluations (trace_id);

create or replace view public.agent_quality_stats as
select 
  agent_type,
  avg(critic_score) as avg_score,
  count(*) as eval_count,
  sum(case when passed then 1 else 0 end)::float / count(*) as success_rate
from public.trace_evaluations
group by agent_type;

-- ═══ CORE TRACES (§39) ═══
create table if not exists public.traces (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,
  parent_id uuid,
  agent_id text not null,
  status text not null,
  input_tokens int default 0,
  output_tokens int default 0,
  latency_ms int,
  metadata jsonb default '{}'::jsonb,
  complexity_coefficient float,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_traces_trace on public.traces (trace_id);
create index if not exists idx_traces_agent on public.traces (agent_id);

create or replace view public.trace_summary as
select 
  trace_id,
  min(created_at) as started_at,
  max(created_at) as last_activity,
  sum(input_tokens + output_tokens) as total_tokens,
  count(*) as component_count,
  sum(latency_ms) as total_latency
from public.traces
group by trace_id;

-- ═══ APPROVAL AUDITS & QUOTA LOGS (§45) ═══
create table if not exists public.approval_audits (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,
  tenant_id uuid references public.tenants(id),
  critic_score int not null,
  compliance_flags int default 0,
  auto_approved boolean default false,
  auditor_comments text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_approvals_trace on public.approval_audits (trace_id);

create table if not exists public.quota_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  total_keys int,
  active_keys int,
  exhausted_keys int,
  utilization_pct float,
  tokens_consumed int default 0,
  request_type text,
  checked_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══ ATTACK LOGS (§40) ═══
create table if not exists public.attack_logs (
  id uuid primary key default gen_random_uuid(),
  trace_id text,
  attack_type text not null,
  target_agent text not null,
  payload text not null,
  result text default 'blocked',
  mitigation_generated text,
  tested_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_attacks_type on public.attack_logs (attack_type);

create or replace view public.security_health_index as
select 
  target_agent,
  count(*) as total_attacks,
  sum(case when result = 'success' then 1 else 0 end) as successful_breaches,
  1.0 - (sum(case when result = 'success' then 1 else 0 end)::float / greatest(count(*), 1)) as hardening_score
from public.attack_logs
group by target_agent;

-- ═══ MARKETPLACE LISTINGS (§41) ═══
create table if not exists public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  skill_name text,
  publisher_tenant_id text,
  description text,
  price_cents bigint default 0,
  rating float default 0.0,
  downloads int default 0,
  status text default 'draft',
  graph_json jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_marketplace_status on public.marketplace_listings (status);

-- ═══ BROWSER SESSIONS (§43) ═══
create table if not exists public.browser_sessions (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,
  url text not null,
  screenshot_url text,
  action_taken text,
  status text default 'initializing',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_browser_trace on public.browser_sessions (trace_id);

-- ═══ COMPLIANCE REPORTS (§44) ═══
create table if not exists public.compliance_reports (
  id uuid primary key default gen_random_uuid(),
  tenant_id text,
  target_url text,
  gdpr_pass boolean,
  wcag_score float,
  bias_flags jsonb default '[]'::jsonb,
  ai_disclaimer_present boolean,
  overall_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══ PROMPT VERSIONS (§17) ═══
create table if not exists public.prompt_versions (
  id uuid primary key default gen_random_uuid(),
  prompt_key text not null,
  version int not null,
  content text not null,
  is_active boolean default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_prompts_key on public.prompt_versions (prompt_key, version);

create or replace view public.active_prompts as
select prompt_key, version, content
from public.prompt_versions
where is_active = true;

create or replace function rollback_prompt(p_key text, p_version int) returns void
language plpgsql
as $$
begin
  update prompt_versions set is_active = false where prompt_key = p_key;
  update prompt_versions set is_active = true where prompt_key = p_key and version = p_version;
end;
$$;

-- ═══ COMPONENT MARKET INDEX (§32) ═══
create table if not exists public.component_market_index (
  id uuid primary key default gen_random_uuid(),
  component_name text not null,
  source_library text not null,
  description text,
  preview_image_url text,
  repo_url text,
  trend_score float default 0.0,
  dimensions_json jsonb default '{}'::jsonb,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_components_score on public.component_market_index (trend_score desc);
create index if not exists idx_components_source on public.component_market_index (source_library);

-- ═══ PREDICTIONS (§38) ═══
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id),
  prediction_type text not null,
  confidence_score float not null,
  predicted_value float not null,
  regression_inputs jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_predictions_type on public.predictions (prediction_type);

create or replace view public.profitability_forecast as
select 
  tenant_id,
  avg(predicted_value) as expected_profit,
  avg(confidence_score) as avg_confidence
from public.predictions
where prediction_type = 'profitability'
group by tenant_id;

-- ═══ AGENT ACTIVITIES — for Sentient Stream (§3) ═══
create table if not exists public.agent_activities (
  id uuid primary key default gen_random_uuid(),
  trace_id text,
  tenant_id text,
  agent_type text not null,
  status text not null,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_activities_created on public.agent_activities (created_at desc);

-- ═══ RLS AUDIT LOGS (§45) ═══
create table if not exists public.rls_audit_logs (
  id uuid primary key default gen_random_uuid(),
  checked_at timestamp with time zone,
  tables_checked text[],
  tenants_checked int,
  violations_found int,
  status text
);

-- ═══ ANOMALY LOGS (§39) ═══
create table if not exists public.anomaly_logs (
  id uuid primary key default gen_random_uuid(),
  system text not null,
  type text not null,
  message text not null,
  severity text default 'warning',
  detected_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══ INBOX ITEMS (§9) ═══
create table if not exists public.inbox_items (
  id uuid primary key default gen_random_uuid(),
  "from" text,
  subject text,
  body_preview text,
  received_at text,
  status text default 'pending_review',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══ REQUIREMENT PROFILES (§31) ═══
create table if not exists public.requirement_profiles (
  id uuid primary key default gen_random_uuid(),
  lead_id text unique not null,
  profile_json jsonb,
  budget_tier text,
  scope_result jsonb,
  expectation_matrix jsonb,
  confidence float,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══ ENABLE RLS ON SENSITIVE TABLES (§37) ═══
alter table public.agent_memories enable row level security;
alter table public.agent_checkpoints enable row level security;
alter table public.traces enable row level security;

-- ═══ DONE ═══
-- All 14 migrations + supplementary tables applied successfully.
