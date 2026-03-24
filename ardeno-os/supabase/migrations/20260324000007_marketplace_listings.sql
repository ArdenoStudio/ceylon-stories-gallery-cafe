-- Migration: Agent & Skill Marketplace

-- Marketplace Listings: Stores the B2B skill/graph offerings
-- Required for §41 Agent & Skill Marketplace
create table if not exists public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills_registry(id),
  tenant_id uuid references public.tenants(id),
  price_cent bigint default 0,
  rating float default 0.0,
  review_count int default 0,
  is_verified boolean default false,
  graph_json jsonb,             -- The serialized orchestration graph to install
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast marketplace discovery
create index on public.marketplace_listings (is_verified);
create index on public.marketplace_listings (price_cent);

-- View: Top Rated Skills for Dashboard
create or replace view public.top_rated_skills as
select 
  s.skill_name,
  s.department,
  m.price_cent,
  m.rating,
  m.is_verified
from marketplace_listings m
join skills_registry s on m.skill_id = s.id
where m.is_verified = true
order by m.rating desc
limit 10;
