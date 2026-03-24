-- Migration: Agent Checkpoints & State Machines

-- Agent Checkpoints: Stores the serialized state of active agent graphs
-- Required for §45 Resilience: Bypassing 10s-50s Serverless timeouts
create table if not exists public.agent_checkpoints (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- Tied to the ObservabilityTracer
  tenant_id uuid,               -- RLS isolation
  agent_id text not null,       -- Current node in the graph
  state_json jsonb not null,    -- Serialized graph state
  checkpoint_type text not null, -- 'snapshot', 'sub-task', 'handoff'
  node_name text not null,      -- Current active node name
  status text default 'pending', -- 'pending', 'active', 'completed', 'error'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for trace lookup
create index on public.agent_checkpoints (trace_id);

-- Cleanup function for old checkpoints
create or replace function purge_old_checkpoints(days_to_keep int default 7) returns void
language plpgsql
as $$
begin
  delete from public.agent_checkpoints
  where created_at < now() - (days_to_keep || ' days')::interval;
end;
$$;
