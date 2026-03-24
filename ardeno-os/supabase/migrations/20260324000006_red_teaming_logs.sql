-- Migration: Autonomous Red-Teaming & Attack Logs

-- Attack Logs: Stores attempts by adversarial agents to compromise the OS
-- Required for §40 Red-Teaming and §45 Security Resilience
create table if not exists public.attack_logs (
  id uuid primary key default gen_random_uuid(),
  trace_id text,                -- Reference to the targeted graph
  attacker_agent_id text not null, -- The adversarial agent ID
  target_agent_id text not null,   -- The agent being attacked
  attack_type text not null,      -- 'prompt_injection', 'logic_loop', 'key_leak_attempt'
  payload text not null,          -- The malicious prompt used
  success boolean default false,  -- Did the guardrails fail?
  mitigation_applied text,        -- What rule caught it?
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast security auditing
create index on public.attack_logs (attack_type);
create index on public.attack_logs (target_agent_id);

-- View: Security Health Dashboard
create or replace view public.security_health_index as
select 
  target_agent_id,
  count(*) as total_attacks,
  sum(case when success then 1 else 0 end) as successful_breaches,
  1.0 - (sum(case when success then 1 else 0 end)::float / count(*)) as hardening_score
from public.attack_logs
group by target_agent_id;
