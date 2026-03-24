-- Migration: Trace Evaluations & Quality Control

-- Trace Evaluations: Stores CriticAgent scores and feedback
-- Required for §39 Observability and §36 Quality Evaluation
create table if not exists public.trace_evaluations (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- References the parent graph trace
  agent_type text not null,     -- 'Commercial', 'Design', 'Development'
  score int not null,           -- 0-100
  critique text,                -- Detailed reasoning
  suggestions jsonb,            -- String array of improvements
  passed boolean not null,      -- score >= 85
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for trace lookup
create index on public.trace_evaluations (trace_id);

-- View: Average Quality Score by Agent Type (for §38 Predictive Analytics)
create or replace view public.agent_quality_stats as
select 
  agent_type,
  avg(score) as avg_score,
  count(*) as eval_count,
  sum(case when passed then 1 else 0 end)::float / count(*) as success_rate
from public.trace_evaluations
group by agent_type;
