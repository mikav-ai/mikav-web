-- ============================================================
-- 02_database.sql
-- Application schema: chats, messages, groups, feedback, support
-- Depends on: 01_auth.sql (public.profiles, public.set_updated_at)
-- ============================================================

-- Chats
create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'New Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.chats is 'A chat conversation owned by a user.';

create index if not exists chats_user_id_idx on public.chats (user_id);
create index if not exists chats_updated_at_idx on public.chats (updated_at desc);

alter table public.chats enable row level security;

drop policy if exists "Users manage their own chats" on public.chats;
create policy "Users manage their own chats"
  on public.chats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists set_chats_updated_at on public.chats;
create trigger set_chats_updated_at
  before update on public.chats
  for each row execute function public.set_updated_at();

-- Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

comment on table public.messages is 'Individual messages within a chat.';

create index if not exists messages_chat_id_idx on public.messages (chat_id);
create index if not exists messages_created_at_idx on public.messages (created_at);

alter table public.messages enable row level security;

drop policy if exists "Users access messages in their chats" on public.messages;
create policy "Users access messages in their chats"
  on public.messages for all
  using (
    exists (
      select 1 from public.chats
      where chats.id = messages.chat_id
        and chats.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.chats
      where chats.id = messages.chat_id
        and chats.user_id = auth.uid()
    )
  );

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

-- Feedback
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  type text not null check (type in ('suggestion', 'bug', 'compliment', 'other')),
  rating smallint check (rating between 1 and 5),
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

comment on table public.feedback is 'User feedback submissions.';

alter table public.feedback enable row level security;

drop policy if exists "Users can submit feedback" on public.feedback;
create policy "Users can submit feedback"
  on public.feedback for insert
  with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Users can view their own feedback" on public.feedback;
create policy "Users can view their own feedback"
  on public.feedback for select
  using (auth.uid() = user_id);

-- Support requests
create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  email text not null,
  category text not null check (category in ('account', 'billing', 'technical', 'feature', 'other')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  subject text not null,
  description text not null,
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.support_requests is 'User support requests.';

alter table public.support_requests enable row level security;

drop trigger if exists set_support_requests_updated_at on public.support_requests;
create trigger set_support_requests_updated_at
  before update on public.support_requests
  for each row execute function public.set_updated_at();

drop policy if exists "Users can submit support requests" on public.support_requests;
create policy "Users can submit support requests"
  on public.support_requests for insert
  with check (auth.uid() = user_id or user_id is null);

drop policy if exists "Users can view their own support requests" on public.support_requests;
create policy "Users can view their own support requests"
  on public.support_requests for select
  using (auth.uid() = user_id);
