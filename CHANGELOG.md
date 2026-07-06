# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-07-06

### Added

- Sarvam AI chat completions integration (`sarvam-30b`) via server-side `app/api/chat/route.ts`, keeping the API key secret
- SerpApi live web search integration via `app/api/search/route.ts`; chat responses are automatically grounded with search results and cite sources
- Full multi-tenant chat persistence backed by Supabase: `lib/supabase/chats.ts` with `createChat`, `listChats`, `getChat`, `deleteChat`, `updateChatTitle`, `listMessages`, `addMessage`
- Real authentication: login and signup wired to `supabase.auth.signInWithPassword` / `signUp`; magic-link email confirmation flow
- `app/auth/callback/route.ts` exchanging the magic-link auth code for a session (`exchangeCodeForSession`)
- Forgot/reset password wired to `supabase.auth.resetPasswordForEmail` and `updateUser`
- `proxy.ts` (Next.js 16 middleware convention) protecting `/console/*` routes, redirecting unauthenticated users to `/auth/login`
- Chats list page (`/console/chats`) loads real chats from Supabase with search, list/grid views, and delete with inline confirm + visible error feedback
- New Chat button navigates to the chat composer; the chat row is only created in Supabase once the first message is sent
- Markdown rendering in chat via `react-markdown` + `remark-gfm` + `@tailwindcss/typography` (headings, lists, bold, code blocks now render properly instead of raw text)
- Concise-by-default system prompt for chat responses
- `getErrorMessage()` helper for readable Supabase/Postgrest error messages in the console
- `ai/prompts/` and `ai/knowledge/` folders (scaffolded, empty) for future system prompt and knowledge base content
- `docs/ARCHITECTURE.md` describing project structure, data flow, and conventions

### Changed

- "Search web" toggle removed from the chat UI — web search now runs automatically on every message
- Chat pages show a "Welcome to Mikav" message with prompt suggestions instead of the raw chat ID
- Chat ID is never rendered on the page — only present in the URL

### Fixed

- Sidebar "New Chat" no longer eagerly creates a database row before the user sends a message
- Chat/chats error handling now surfaces the actual Supabase error message instead of an empty object

## [0.1.7] - 2026-07-07

### Added

- Supabase integration (`@supabase/supabase-js`, `@supabase/ssr`)
- `lib/supabase/` with `client.ts` (browser), `server.ts` (server), `middleware.ts` (session refresh), barrel `index.ts`
- SQL migrations in `supabase/migrations/`: profiles (with auto-assigned unique `user_id`), updated_at trigger, chats/messages, groups/group_members, feedback/support_requests, storage buckets (avatars, attachments, user-uploads)
- `supabase/README.md` documenting schema, buckets, and how to apply migrations
- `MessageInput` component (shadcn-chatbot-kit) in `components/console/pages/chat/ui/` with `FilePreview`, `InterruptPrompt`, `AudioVisualizer`, `use-audio-recording`, `use-autosize-textarea` hooks, and `audio-utils` lib
- Wired `MessageInput` into `/console/chat` and `/console/chat/[chatId]` pages
- `.gitkeep` placeholders for empty `chat/ui`, `chat/lib`, `chat/hooks` folders

### Changed

- Auth layout (`AppLayout`) centers content vertically between header and footer
- Chat and Chat[chatId] pages simplified to heading + message input

### Removed

- Full chat UI kit (Chat, ChatMessage, MessageList, PromptSuggestions, MarkdownRenderer, TypingIndicator, CopyButton) — reverted to minimal heading-only pages with just MessageInput

## [0.1.6] - 2026-07-07

### Added

- Settings dialog popup triggered via `?settings=profile` query param
- Settings sidebar with primary color highlight on active tab
- All `/console/settings/*` URLs redirect to popup dialog
- Profile bar popup in sidebar bottom with Profile, Settings, Help, Logout
- Profile bar adapts to collapsed sidebar (popup opens to the right)
- Collapsible sidebar with open/close toggle icon
- New Chat button with solid primary color styling

### Changed

- Settings pages now open as popup dialog instead of standalone pages
- Console sidebar highlight uses primary color (`bg-primary/10 text-primary`)
- New Chat button uses `bg-primary text-primary-foreground`

## [0.1.5] - 2026-07-07

### Added

- Chats and Groups pages with search, list, grid, and card components
- `ChatSearch`, `ChatList`, `ChatGrid`, `ChatCard` in `components/console/pages/chats/`
- `GroupSearch`, `GroupList`, `GroupGrid`, `GroupCard` in `components/console/pages/groups/`
- List/Grid view toggle with Lucide icons
- shadcn Skeleton component for loading states
- Chats and Groups navigation items in sidebar with icons

### Changed

- Chats and Groups pages centered with `max-w-4xl mx-auto`
- Search input left-aligned, view toggle right-aligned with `justify-between`

## [0.1.4] - 2026-07-07

### Added

- Auth pages: login, signup, forgot, reset, verify with shadcn/ui components
- App layout components: `app-layout`, `app-header`, `app-footer` in `components/app/`
- shadcn/ui input, label, card components
- `/auth` and `/` redirect to `/auth/login`

### Changed

- Profile bar logout navigates to `/auth/login`
- Removed Sign in, Sign up, GitHub links from app footer

## [0.1.3] - 2026-07-07

### Added

- Custom 404 not-found page
- `llm.txt` and `skill.md` for AI crawler and agent discoverability
- Dynamic `robots.ts` with AI bot rules (GPTBot, Claude-Web, ChatGPT-User)
- Dynamic `sitemap.ts` for auto-generated sitemap.xml
- Full SEO metadata (Open Graph, Twitter Cards, keywords, authors)
- JSON-LD structured data for Answer Engine Optimization (WebApplication, SpeakableSpecification)

## [0.1.2] - 2026-07-07

### Added

- Project documentation: README, LICENSE (MIT), SECURITY, CODE_OF_CONDUCT, CONTRIBUTING, ROADMAP, CHANGELOG
- `.env.example` and `.env.local` environment variable templates
- GitHub Actions workflows: CI, CodeQL, dependency review, labeler, stale, greetings, issue summary
- `.github/labeler.yml` for automatic PR labeling by file path

## [0.1.1] - 2026-07-07

### Added

- Console layout with sidebar, header, and main content area
- Console pages: chat, settings, help
- Dynamic chat route (`/console/chat/[chatId]`)
- shadcn/ui initialization, lucide-react
- Light-only theme with primary brand color `#c8242b`
- Google Sans font, title template `%s | Mikav AI`

## [0.1.0] - 2026-07-07

### Added

- Initial Next.js 16 project scaffold
- React 19, TypeScript 5, Tailwind CSS 4

[Unreleased]: https://github.com/mikav-ai/mikav-web/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/mikav-ai/mikav-web/compare/v0.1.7...v0.2.0
[0.1.7]: https://github.com/mikav-ai/mikav-web/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/mikav-ai/mikav-web/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/mikav-ai/mikav-web/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/mikav-ai/mikav-web/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mikav-ai/mikav-web/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/mikav-ai/mikav-web/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mikav-ai/mikav-web/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mikav-ai/mikav-web/releases/tag/v0.1.0
