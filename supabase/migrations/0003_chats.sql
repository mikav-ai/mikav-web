-- ============================================================
-- 0003_chats.sql
-- Chat conversations and messages
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
