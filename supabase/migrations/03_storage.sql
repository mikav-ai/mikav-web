-- ============================================================
-- 03_storage.sql
-- Storage buckets and access policies
-- ============================================================

-- Avatars bucket (public read)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Attachments bucket (private)
insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', false)
on conflict (id) do nothing;

-- User uploads bucket (private) — general-purpose user files
insert into storage.buckets (id, name, public)
values ('user-uploads', 'user-uploads', false)
on conflict (id) do nothing;

-- Avatars: anyone can view, users manage their own folder
drop policy if exists "Avatar images are publicly accessible" on storage.objects;
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Attachments: users can only access files in their own folder
drop policy if exists "Users can read their own attachments" on storage.objects;
create policy "Users can read their own attachments"
  on storage.objects for select
  using (
    bucket_id = 'attachments'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can upload their own attachments" on storage.objects;
create policy "Users can upload their own attachments"
  on storage.objects for insert
  with check (
    bucket_id = 'attachments'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete their own attachments" on storage.objects;
create policy "Users can delete their own attachments"
  on storage.objects for delete
  using (
    bucket_id = 'attachments'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- User uploads: users can only access files in their own folder
drop policy if exists "Users can read their own uploads" on storage.objects;
create policy "Users can read their own uploads"
  on storage.objects for select
  using (
    bucket_id = 'user-uploads'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can upload their own files" on storage.objects;
create policy "Users can upload their own files"
  on storage.objects for insert
  with check (
    bucket_id = 'user-uploads'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can update their own uploads" on storage.objects;
create policy "Users can update their own uploads"
  on storage.objects for update
  using (
    bucket_id = 'user-uploads'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete their own uploads" on storage.objects;
create policy "Users can delete their own uploads"
  on storage.objects for delete
  using (
    bucket_id = 'user-uploads'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
