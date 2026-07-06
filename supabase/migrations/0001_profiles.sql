-- ============================================================
-- 0001_profiles.sql
-- User profiles linked to Supabase auth.users
-- ============================================================

-- Sequence backing the human-readable unique user id
create sequence if not exists public.user_id_seq start with 100000;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  -- Auto-assigned, unique, human-readable public identifier e.g. "MIKAV-100001"
  user_id text unique not null default ('MIKAV-' || nextval('public.user_id_seq')),
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Public profile for each authenticated user.';
comment on column public.profiles.id is 'Internal UUID from auth.users.';
comment on column public.profiles.user_id is 'Auto-assigned unique public user id (MIKAV-XXXXXX).';

create index if not exists profiles_user_id_idx on public.profiles (user_id);

-- Row Level Security
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by the owner" on public.profiles;
create policy "Profiles are viewable by the owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
