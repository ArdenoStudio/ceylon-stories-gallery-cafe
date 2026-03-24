-- Migration: Ethical AI & Compliance Auditor

-- Compliance Reports: Stores the results of automated legal and brand audits
-- Required for §44 Ethical AI & Automated Compliance Auditor
create table if not exists public.compliance_reports (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- Tied to the generation trace
  tenant_id uuid references public.tenants(id),
  audit_type text not null,      -- 'GDPR', 'WCAG', 'BrandTone', 'Bias'
  status text not null,         -- 'passed', 'flagged', 'failed'
  severity text not null,       -- 'low', 'medium', 'high', 'critical'
  violations jsonb default '[]'::jsonb, -- List of specific issues
  auditor_critique text,        -- Detailed reasoning
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast compliance auditing
create index on public.compliance_reports (audit_type);
create index on public.compliance_reports (status);

-- View: Compliance Risk Heatmap
create or replace view public.compliance_risk_heatmap as
select 
  audit_type,
  count(*) as total_audits,
  sum(case when status = 'failed' then 1 else 0 end) as failure_count,
  sum(case when severity = 'critical' then 1 else 0 end) as critical_risks
from public.compliance_reports
group by audit_type;
