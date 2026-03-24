-- Migration: Computer-Use Browser Sessions

-- Browser Sessions: Logs for autonomous web navigation tasks
-- Required for §43 Computer-Use Browser Agents
create table if not exists public.browser_sessions (
  id uuid primary key default gen_random_uuid(),
  trace_id text not null,       -- Tied to the parent graph trace
  target_url text not null,
  session_status text default 'initializing', -- 'navigating', 'capturing', 'interaction', 'completed'
  screenshot_url text,          -- Pointer to Vercel Blob or Supabase Storage
  dom_tree jsonb,               -- Full-page accessibility tree for context
  last_action text,             -- 'Click', 'Type', 'Scroll'
  action_result text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for trace lookup
create index on public.browser_sessions (trace_id);
create index on public.browser_sessions (session_status);

-- View: Active Browser Tasks for Dashboard
create or replace view public.active_browser_tasks as
select 
  trace_id,
  target_url,
  session_status,
  created_at
from public.browser_sessions
where session_status != 'completed';
