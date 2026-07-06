-- ============================================================
-- 0004_groups.sql
-- Groups and group membership
-- ============================================================

-- Groups
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.groups is 'A group that users can create and join.';

create index if not exists groups_owner_id_idx on public.groups (owner_id);

alter table public.groups enable row level security;

drop trigger if exists set_groups_updated_at on public.groups;
create trigger set_groups_updated_at
  before update on public.groups
  for each row execute function public.set_updated_at();

-- Group members
create table if not exists public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

comment on table public.group_members is 'Membership of users in groups.';

create index if not exists group_members_user_id_idx on public.group_members (user_id);

alter table public.group_members enable row level security;

-- Policies: members can view groups they belong to
drop policy if exists "Members can view their groups" on public.groups;
create policy "Members can view their groups"
  on public.groups for select
  using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = groups.id
        and group_members.user_id = auth.uid()
    )
  );

drop policy if exists "Users can create groups" on public.groups;
create policy "Users can create groups"
  on public.groups for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Owners can update their groups" on public.groups;
create policy "Owners can update their groups"
  on public.groups for update
  using (auth.uid() = owner_id);

drop policy if exists "Owners can delete their groups" on public.groups;
create policy "Owners can delete their groups"
  on public.groups for delete
  using (auth.uid() = owner_id);

-- Policies: membership rows
drop policy if exists "Users can view their memberships" on public.group_members;
create policy "Users can view their memberships"
  on public.group_members for select
  using (auth.uid() = user_id);

drop policy if exists "Users can join groups" on public.group_members;
create policy "Users can join groups"
  on public.group_members for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can leave groups" on public.group_members;
create policy "Users can leave groups"
  on public.group_members for delete
  using (auth.uid() = user_id);
