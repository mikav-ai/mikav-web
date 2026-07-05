# Mikav Web — Agent Instructions

## Project

- **Name**: Mikav
- **Repo**: https://github.com/mikav-ai/mikav-web
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Package manager**: npm
- **Domain**: mikav.info

## Architecture

- Next.js App Router (`app/` directory)
- Components in `components/` with barrel exports (`index.ts`)
- UI primitives via shadcn/ui in `components/ui/`
- Utilities in `lib/`
- Light-only theme — no dark mode. Primary brand color: `#c8242b`
- Fonts: Geist Sans / Geist Mono (via `next/font/google`)

## Conventions

- Use TypeScript strict mode
- Use Tailwind utility classes — avoid custom CSS
- Component files: kebab-case (`console-sidebar.tsx`)
- Page files: `page.tsx` inside route folders
- Barrel exports for component directories
- Prefer server components; add `"use client"` only when needed
- Use `@/` path alias for imports

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

## Rules

<!-- BEGIN:nextjs-agent-rules -->
This version of Next.js (16) has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

- Do NOT add dark mode styles
- Use shadcn/ui components where possible
- Keep accessibility in mind (semantic HTML, ARIA labels)
- Never commit `.env.local` or secrets
- Malayalam language support is a priority — handle Unicode/RTL correctly
