-- Migration: Core Tracing & Observability

-- Traces Table: Distributed tracing for all LLM calls and agent transitions
-- Required for §39 Observability and §45 Resilience (Complexity Scores)
create table if not exists public.traces (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- Unique identifier for the entire user request
  parent_id uuid,               -- Parent span for hierarchical tracing
  agent_id text not null,       -- The agent or engine node name
  status text not null,         -- 'started', 'completed', 'failed'
  input_tokens int default 0,
  output_tokens int default 0,
  latency_ms int,
  metadata jsonb default '{}'::jsonb, -- Store raw LLM info, 429 retries, etc.
  complexity_coefficient float, -- Calculated metric (§45)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast trace lookup
create index on public.traces (trace_id);
create index on public.traces (agent_id);

-- View: Trace Summary for UI Dashboard
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
