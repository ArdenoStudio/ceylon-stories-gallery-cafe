-- Migration: UI Component Intelligence & Market Index

-- Component Market Index: Global database of trending shadcn/hyperui/daisyui components
-- Required for §32 Smart Market-Aware UI Component Intelligence
create table if not exists public.component_market_index (
  id uuid primary key default gen_random_uuid(),
  component_name text not null,
  source_library text not null, -- 'shadcn', 'hyperui', 'daisyui', '21st.dev'
  description text,
  preview_image_url text,
  repo_url text,
  trend_score float default 0.0, -- Normalized 0-100 score
  dimensions_json jsonb default '{}'::jsonb, -- Store 8-dimension attributes
  tags text[] default '{}'::Array[text],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast trend-based discovery
create index on public.component_market_index (trend_score desc);
create index on public.component_market_index (source_library);

-- Function to update trend score based on 8 dimensions
create or replace function update_component_trend(
  p_id uuid,
  p_new_score float,
  p_meta jsonb
) returns void
language plpgsql
as $$
begin
  update component_market_index
  set 
    trend_score = p_new_score,
    dimensions_json = p_meta,
    last_updated = now()
  where id = p_id;
end;
$$;
