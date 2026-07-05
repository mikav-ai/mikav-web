# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/mikav-ai/mikav-web/compare/v0.1.6...HEAD
[0.1.6]: https://github.com/mikav-ai/mikav-web/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/mikav-ai/mikav-web/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/mikav-ai/mikav-web/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/mikav-ai/mikav-web/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/mikav-ai/mikav-web/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mikav-ai/mikav-web/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mikav-ai/mikav-web/releases/tag/v0.1.0
