# Supabase

Database schema and SQL migrations for Mikav.

## Structure

```
supabase/
├── migrations/
│   ├── 01_auth.sql       # Profiles, auto-create trigger, updated_at helper
│   ├── 02_database.sql   # Chats, messages, groups, feedback, support requests
│   └── 03_storage.sql    # Storage buckets + policies
└── README.md
```

## Applying migrations

Run the SQL files **in order** (01 → 03). Choose one method:

### Option A — Supabase SQL Editor

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor**
3. Paste and run each file in numeric order

### Option B — Supabase CLI

```bash
# Link to your project (once)
supabase link --project-ref <your-project-ref>

# Push all migrations
supabase db push
```

## Schema overview

| Table | Migration | Purpose |
|-------|-----------|---------|
| `profiles` | 01 | Public profile per auth user (auto-created on signup, with unique auto-assigned `user_id`) |
| `chats` | 02 | Chat conversations owned by a user |
| `messages` | 02 | Messages within a chat (user/assistant/system) |
| `groups` | 02 | Groups users can create and join |
| `group_members` | 02 | Group membership with roles |
| `feedback` | 02 | User feedback submissions |
| `support_requests` | 02 | User support tickets |

## Storage buckets

| Bucket | Migration | Access | Purpose |
|--------|-----------|--------|---------|
| `avatars` | 03 | Public read | User profile pictures |
| `attachments` | 03 | Private | Chat file attachments |
| `user-uploads` | 03 | Private | General-purpose user files |

## Notes

- All tables have **Row Level Security (RLS)** enabled.
- Policies scope data access to the authenticated user (`auth.uid()`).
- `profiles` rows are created automatically via the `on_auth_user_created` trigger.
- Every user gets a unique, auto-assigned public `user_id` (e.g. `MIKAV-100001`) generated from a sequence, separate from the internal `id` (UUID).
- The `set_updated_at()` function (defined in `01_auth.sql`) keeps `updated_at` columns current across all tables.
- `02_database.sql` and `03_storage.sql` depend on objects created in `01_auth.sql` — always run in order.
