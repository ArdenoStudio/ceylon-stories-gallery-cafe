-- Migration: Predictive Analytics & Simulation Sandbox

-- Predictions Table: Stores the output of agency performance regression models
-- Required for §38 Predictive Analytics & Simulation Sandbox
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id),
  prediction_type text not null, -- 'churn', 'profitability', 'demo_success'
  confidence_score float not null,
  predicted_value float not null,
  regression_inputs jsonb,       -- Factors contributing to the prediction
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast analytics retrieval
create index on public.predictions (prediction_type);
create index on public.predictions (tenant_id, created_at desc);

-- View: Agency Profitability Forecast
create or replace view public.profitability_forecast as
select 
  tenant_id,
  avg(predicted_value) as expected_profit,
  avg(confidence_score) as avg_confidence
from public.predictions
where prediction_type = 'profitability'
group by tenant_id;
