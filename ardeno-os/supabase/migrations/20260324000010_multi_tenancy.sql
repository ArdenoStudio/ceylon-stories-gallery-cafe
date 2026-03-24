-- Migration: White-Label SaaS & Multi-Tenancy

-- Tenants Table: Core registration for agency clients
-- Required for §37 White-Label SaaS & Multi-Tenant Mode
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,           -- Agency Client Name
  slug text unique not null,    -- Subdomain or URL path
  logo_url text,
  primary_color text default '#000000',
  secondary_color text default '#ffffff',
  plan_tier text default 'free', -- 'free', 'pro', 'enterprise'
  quota_limit_monthly bigint default 100000, -- Token limit
  is_active boolean default true,
  metadata jsonb default '{}'::jsonb, -- Custom personas, specific logic flags
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast tenant lookup
create index on public.tenants (slug);

-- Enable RLS on core tables to enforce tenant isolation (§37)
alter table public.agent_memories enable row level security;
alter table public.agent_checkpoints enable row level security;
alter table public.traces enable row level security;

-- Example RLS Policy for Agent Memories
-- Each tenant can only see their own memories
create policy "Tenants can only access their own memories"
on public.agent_memories
for all
using (tenant_id = (select auth.uid())); -- Or using a custom claim/header mapping
