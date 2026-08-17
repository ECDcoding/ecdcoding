-- Allow posting a picture-only research entry (no video required)
alter table public.research_videos alter column video_path drop not null;
