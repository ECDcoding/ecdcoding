create table if not exists public.research_videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  title text not null,
  description text,
  video_path text not null,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.research_videos to authenticated;
grant all on public.research_videos to service_role;

alter table public.research_videos enable row level security;

create policy "Authenticated users can view research videos"
  on public.research_videos for select to authenticated using (true);

create policy "Users can add their own research videos"
  on public.research_videos for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update their own research videos"
  on public.research_videos for update to authenticated using (auth.uid() = user_id);

create policy "Users can delete their own research videos"
  on public.research_videos for delete to authenticated using (auth.uid() = user_id);

create policy "Authenticated can read research video files"
  on storage.objects for select to authenticated using (bucket_id = 'research-videos');

create policy "Users can upload own research video files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'research-videos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own research video files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'research-videos' and auth.uid()::text = (storage.foldername(name))[1]);