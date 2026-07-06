# Supabase

Database schema and SQL migrations for Mikav.

## Structure

```
supabase/
├── migrations/
│   ├── 0001_profiles.sql          # User profiles + auto-create trigger
│   ├── 0002_updated_at.sql        # Shared updated_at trigger function
│   ├── 0003_chats.sql             # Chats + messages
│   ├── 0004_groups.sql            # Groups + group members
│   ├── 0005_feedback_support.sql  # Feedback + support requests
│   └── 0006_storage.sql           # Storage buckets + policies
└── README.md
```

## Applying migrations

Run the SQL files **in order** (0001 → 0006). Choose one method:

### Option A — Supabase SQL Editor

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor**
3. Paste and run each file in numeric order

### Option B — Supabase CLI

```bash
# Link to your project (once)
supabase link --project-ref hjjjlyphgvwfwytfrlrc

# Push all migrations
supabase db push
```

## Schema overview

| Table | Purpose |
|-------|---------|
| `profiles` | Public profile per auth user (auto-created on signup, with unique auto-assigned `user_id`) |
| `chats` | Chat conversations owned by a user |
| `messages` | Messages within a chat (user/assistant/system) |
| `groups` | Groups users can create and join |
| `group_members` | Group membership with roles |
| `feedback` | User feedback submissions |
| `support_requests` | User support tickets |

## Storage buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `avatars` | Public read | User profile pictures |
| `attachments` | Private | Chat file attachments |
| `user-uploads` | Private | General-purpose user files |

## Notes

- All tables have **Row Level Security (RLS)** enabled.
- Policies scope data access to the authenticated user (`auth.uid()`).
- `profiles` rows are created automatically via the `on_auth_user_created` trigger.
- Every user gets a unique, auto-assigned public `user_id` (e.g. `MIKAV-100001`) generated from a sequence, separate from the internal `id` (UUID).
- The `set_updated_at()` function keeps `updated_at` columns current.
- Migration `0002` must run before `0003`–`0005` (they depend on `set_updated_at`).
