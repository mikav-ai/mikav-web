# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.3] - 2026-07-07

### Added

- Custom 404 not-found page
- `llm.txt` and `skill.md` for AI crawler and agent discoverability
- Dynamic `robots.ts` with AI bot rules (GPTBot, Claude-Web, ChatGPT-User)
- Dynamic `sitemap.ts` for auto-generated sitemap.xml
- Full SEO metadata (Open Graph, Twitter Cards, keywords, authors)
- JSON-LD structured data for Answer Engine Optimization (WebApplication, SpeakableSpecification)
- `metadataBase` and canonical URL configuration

## [0.1.2] - 2026-07-07

### Added

- Project documentation: README, LICENSE (MIT), SECURITY, CODE_OF_CONDUCT, CONTRIBUTING, ROADMAP, CHANGELOG
- `.env.example` and `.env.local` environment variable templates
- GitHub Actions workflows: CI, CodeQL, dependency review, labeler, stale, greetings, issue summary
- `.github/labeler.yml` for automatic PR labeling by file path
- Updated AGENTS.md and CLAUDE.md with full project context

### Removed

- Placeholder `manual.yml` GitHub workflow

## [0.1.1] - 2026-07-07

### Added

- Console layout with sidebar, header, and main content area
- Console pages: chat, settings, help (heading only)
- Dynamic chat route (`/console/chat/[chatId]`)
- Root redirect `/` → `/console` → `/console/chat`
- `console-layout`, `console-sidebar`, `console-header` components with barrel exports
- App logo in sidebar using `/icons/app/icon-dark.png`
- shadcn/ui initialization (button component, utils)
- lucide-react icon library
- Light-only theme with primary brand color `#c8242b`
- Title template: `%s | Mikav AI`
- Favicon configured to `/icons/app/favicon.png`

### Removed

- Dark mode variant and `.dark` CSS class
- Default Next.js boilerplate homepage

## [0.1.0] - 2026-07-07

### Added

- Initial Next.js 16 project scaffold
- React 19, TypeScript 5, Tailwind CSS 4
- Geist Sans and Geist Mono fonts
- ESLint configuration
- PostCSS with Tailwind plugin

[Unreleased]: https://github.com/mikav-ai/mikav-web/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/mikav-ai/mikav-web/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/mikav-ai/mikav-web/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/mikav-ai/mikav-web/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mikav-ai/mikav-web/releases/tag/v0.1.0
