create table if not exists menu_items (
  id                uuid primary key default gen_random_uuid(),
  category          text not null,
  name              text not null,
  description       text not null default '',
  tag               text not null default '',
  image_url         text not null default '',
  is_vegetarian     boolean not null default false,
  price             integer not null check (price > 0),
  original_price    integer check (original_price > 0),
  quantity          text not null default '',
  prep_time_minutes integer not null default 0 check (prep_time_minutes >= 0),
  is_available      boolean not null default true,
  display_order     integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger menu_items_updated_at
  before update on menu_items
  for each row execute function set_updated_at();
