# Learning the Basics — content table

Create one database table that stores the content shown on each "Learning the Basics" button, so the words, images and links can be edited without changing code.

## Buttons covered

Lesson of the Day, Numeracy, Literacy, Road Safety, Life Skills, Tech Skills, All Modes of Transport, Note of the Week, Science and Discovery.

## What each row holds

- Which button it belongs to (one of the nine above)
- Age group it targets: 04-07 or 08-12
- Title, short subtitle, longer description
- Optional image, optional video, optional external link
- Display order and an on/off switch
- A flexible extras field for anything specific to one button (e.g. gallery lists)

## Who can do what

- Anyone signed in can read active rows.
- Only admins can add, edit, or hide rows.

## Not included

- No UI changes yet — this plan only creates the table. Wiring pages to read from it, and an admin editor, would be a follow-up once you confirm the shape.

## Technical notes

- New table `public.learning_basics_content` with:
  - `id uuid pk`, `category text` (checked against the nine names), `age_group text` ('04-07' | '08-12'), `title text`, `subtitle text`, `description text`, `image_url text`, `video_url text`, `link_url text`, `display_order int default 0`, `is_active bool default true`, `extras jsonb default '{}'::jsonb`, `created_by uuid`, `created_at`, `updated_at`.
- Grants: `authenticated` select/insert/update/delete, `service_role` all. No anon.
- RLS: select where `is_active = true` for authenticated; insert/update/delete restricted to `has_role(auth.uid(),'admin')`.
- Trigger: `update_updated_at_column` on update.
- Index on `(category, age_group, display_order)`.
- Regenerate Supabase types.
