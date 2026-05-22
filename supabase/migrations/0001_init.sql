-- MDW Wellness initial schema
-- Run this in Supabase Dashboard -> SQL Editor -> New Query, then click Run.

----------------------------------------------------------------
-- Profiles table (mirrors auth.users with public-facing info)
----------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null,
  phone       text not null,
  email       text not null,
  created_at  timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "profiles: read own"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "profiles: insert own"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "profiles: update own"
  on public.profiles for update
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

----------------------------------------------------------------
-- Bookings table (guest OR authenticated)
----------------------------------------------------------------
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users (id) on delete set null,
  name            text not null,
  phone           text not null,
  service         text not null check (service in ('online_consultation', 'home_therapy', 'vitals_check')),
  preferred_time  text,
  message         text,
  status          text default 'new' not null,
  created_at      timestamptz default now() not null
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;

-- Anyone (anon or signed-in) can create a booking
create policy "bookings: anyone can insert"
  on public.bookings for insert
  to anon, authenticated
  with check ( true );

-- Authenticated users can read their own bookings
create policy "bookings: read own"
  on public.bookings for select
  to authenticated
  using ( auth.uid() = user_id );

----------------------------------------------------------------
-- Auto-create a profile row on signup using the metadata we set
----------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
