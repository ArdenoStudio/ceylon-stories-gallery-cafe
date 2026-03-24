-- Migration: Resilience & Approval Audit Logs

-- Approval Audit: Tracks §45 Resilience auto-approve events
-- Logic: Critic > 97 + Zero Compliance Flags = Bypasses Discord
create table if not exists public.approval_audits (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- References the generation trace
  tenant_id uuid,               -- Multi-tenant isolation
  critic_score int not null,    -- Final evaluation score
  compliance_flags int default 0, -- Number of auditor violations
  auto_approved boolean default false,
  auditor_comments text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for trace lookup
create index on public.approval_audits (trace_id);

-- Quota Logs: Used by ResilienceEngine for burn-rate prediction
create table if not exists public.quota_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  tokens_consumed int not null,
  request_type text,            -- 'reasoning', 'embedding'
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
