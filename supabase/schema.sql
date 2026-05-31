-- Запусти этот SQL в Supabase: Dashboard → SQL Editor → New Query

create table if not exists users (
  id bigint primary key,
  first_name text,
  username text,
  points integer default 0,
  level integer default 1,
  mode text default 'family',
  created_at timestamptz default now()
);

create table if not exists discoveries (
  id uuid primary key default gen_random_uuid(),
  user_id bigint references users(id) on delete cascade,
  species_id text not null,
  location_name text,
  discovered_at timestamptz default now()
);

create unique index if not exists discoveries_user_species on discoveries(user_id, species_id);

-- Разрешить чтение/запись через anon key (для демо)
alter table users enable row level security;
alter table discoveries enable row level security;

create policy "allow all" on users for all using (true) with check (true);
create policy "allow all" on discoveries for all using (true) with check (true);
