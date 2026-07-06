-- ============================================================
-- 0005_feedback_support.sql
-- Feedback and support request submissions
-- ============================================================

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
