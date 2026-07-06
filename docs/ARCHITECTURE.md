# Architecture

This document describes how Mikav is structured, so contributors can navigate and extend the codebase confidently.

## Overview

Mikav is a Next.js 16 (App Router) application with:

- **Frontend & API routes** — Next.js, React 19, TypeScript, Tailwind CSS 4
- **Auth & database** — Supabase (Postgres, Auth, Storage), with Row Level Security enforcing per-user data isolation
- **AI** — Sarvam AI (chat completions) and SerpApi (live web search grounding)

## Top-level structure

```
mikav-web/
├── ai/                     # AI system prompts and knowledge base (see below)
├── app/                    # Next.js App Router — pages, layouts, API routes
├── components/             # React components
├── lib/                    # Shared utilities and Supabase clients
├── public/                 # Static assets, llm.txt, skill.md
├── supabase/               # SQL migrations and database docs
├── docs/                   # Project documentation (this file, etc.)
└── proxy.ts                # Next.js middleware (Supabase session handling)
```

## `app/` — routes

| Path | Purpose |
|------|---------|
| `app/auth/` | Login, signup, forgot/reset password, OAuth callback |
| `app/console/` | Authenticated app shell — chat, chats list, groups, settings, help |
| `app/legal/` | Terms, privacy, cookies |
| `app/api/chat/` | Server route calling Sarvam AI chat completions |
| `app/api/search/` | Server route calling SerpApi for live web search |
| `app/robots.ts`, `app/sitemap.ts` | Dynamic SEO metadata |

Auth is enforced by `proxy.ts`, which runs Supabase's session refresh/redirect logic on every request via `lib/supabase/middleware.ts`.

## `components/` — UI

| Folder | Purpose |
|--------|---------|
| `components/ui/` | shadcn/ui primitives (Button, Input, Select, etc.) |
| `components/app/` | Public app shell (header, footer, layout) used on auth/legal pages |
| `components/console/` | Authenticated console shell (sidebar, header) and feature UIs, organized under `pages/<feature>/` |
| `components/console/shared/` | Cross-feature pieces (profile bar, feedback button, forms) |

## `lib/` — shared code

| Path | Purpose |
|------|---------|
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client (Server Components, Route Handlers) |
| `lib/supabase/middleware.ts` | Session refresh logic used by `proxy.ts` |
| `lib/supabase/chats.ts` | Data-access functions for chats/messages (create, list, delete, etc.) |
| `lib/utils.ts` | Generic helpers (`cn` class merging, etc.) |

## `ai/` — prompts & knowledge base

Kept separate from application code so non-engineers can contribute without touching TypeScript.

```
ai/
├── prompts/     # System prompts and behavior instructions (markdown)
└── knowledge/   # Domain knowledge base content (markdown)
```

Currently empty (`.gitkeep` placeholders) — the chat API route (`app/api/chat/route.ts`) has an inline system prompt as a starting point. As prompts grow, they should move into `ai/prompts/*.md` and be loaded by a small loader in `lib/` or `ai/`.

## `supabase/` — database

```
supabase/
├── migrations/
│   ├── 01_auth.sql       # profiles table, auto-create trigger, updated_at helper
│   ├── 02_database.sql   # chats, messages, groups, feedback, support_requests
│   └── 03_storage.sql    # storage buckets and policies
└── README.md              # How to apply migrations
```

All tables use Row Level Security (RLS) scoped to `auth.uid()`, providing multi-tenant isolation at the database layer — one user cannot read or write another user's data even if application code has a bug.

## Data flow: sending a chat message

1. User submits a message in `app/console/chat/[chatId]/page.tsx`
2. The message is persisted via `lib/supabase/chats.ts` → `addMessage()` (insert into `messages`, RLS-checked)
3. The full conversation is POSTed to `app/api/chat/route.ts`
4. The route optionally calls SerpApi (`app/api/search` logic inlined) for live search context, then calls Sarvam AI's chat completions endpoint
5. The assistant's reply is returned to the client, rendered via `MarkdownRenderer`, and persisted back to `messages`

## Authentication flow

1. User signs up/logs in via `app/auth/*` pages using the Supabase browser client
2. Email confirmation uses Supabase's magic-link flow, redirecting to `app/auth/callback/route.ts`
3. The callback exchanges the auth code for a session (`exchangeCodeForSession`)
4. `proxy.ts` (via `lib/supabase/middleware.ts`) refreshes the session on every request and redirects unauthenticated users to `/auth/login`

## Conventions

- Components are grouped by feature under `components/console/pages/<feature>/`, each with its own `index.ts` barrel export
- Server-only secrets (API keys) are read from environment variables and never exposed to the client — see `.env.example`
- SQL migrations are additive and idempotent (`create table if not exists`, `create or replace function`) so they can be safely re-run
