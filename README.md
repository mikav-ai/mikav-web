<p align="center">
  <img src="public/icons/app/icon-dark.png" alt="Mikav" height="60" />
</p>

<h1 align="center">Mikav</h1>

<p align="center">
  <strong>Open-source AI copilot & open Malayalam language model for Kerala's creative and cultural ecosystem</strong>
</p>

<p align="center">
  <a href="https://github.com/mikav-ai/mikav-web/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://github.com/mikav-ai/mikav-web/issues">
    <img src="https://img.shields.io/github/issues/mikav-ai/mikav-web" alt="Issues" />
  </a>
  <a href="https://github.com/mikav-ai/mikav-web/stargazers">
    <img src="https://img.shields.io/github/stars/mikav-ai/mikav-web" alt="Stars" />
  </a>
</p>

---

## What is Mikav?

Mikav is an open-source AI copilot and open Malayalam model built for Kerala's creative and cultural ecosystem — with open datasets and models that individuals can explore and businesses and developers can build on.

- **Malayalam-first** — native understanding of Kerala's language, dialects, and cultural context
- **Open models & datasets** — community-driven, transparent, and auditable
- **Developer-friendly** — APIs, SDKs, and integrations for builders
- **Creative ecosystem** — tools for writers, educators, filmmakers, and artists

## Features

- Chat console with real-time AI responses (Sarvam AI, `sarvam-30b`)
- Automatic web search grounding for up-to-date, cited answers (SerpApi)
- Multi-tenant chat persistence — every chat and message is stored in Supabase, scoped to the signed-in user via Row Level Security
- Chats list with search, list/grid views, and delete
- Markdown rendering in chat (headings, lists, code blocks, bold/italic)
- Real authentication: email/password login & signup, magic-link email confirmation, forgot/reset password
- Collapsible sidebar with New Chat, Chats, and Groups navigation
- Settings as a popup dialog (triggered via URL query param)
- Profile bar with user menu (Profile, Settings, Help, Logout)
- Light-only branded UI with primary color `#c8242b`
- SEO optimized with Open Graph, Twitter Cards, and JSON-LD structured data
- Answer Engine Optimization (AEO) with `llm.txt` and `skill.md`
- Dynamic sitemap and robots.txt generation
- Custom 404 error page
- shadcn/ui component library with skeleton loading states
- Rich message input with file attachments, drag-and-drop, and voice recording
- Feedback and support request forms, stored in Supabase
- Tailwind CSS 4 utility-first styling
- TypeScript strict mode throughout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| Fonts | Google Sans |
| Backend | Supabase (Postgres, Auth, Storage) |
| AI Chat | Sarvam AI (chat completions) |
| Web Search | SerpApi |
| Markdown | react-markdown + remark-gfm |
| Package Manager | npm |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A [Supabase](https://supabase.com) project
- A [Sarvam AI](https://dashboard.sarvam.ai) API key
- A [SerpApi](https://serpapi.com) API key (optional — enables web search grounding)

### Installation

```bash
git clone https://github.com/mikav-ai/mikav-web.git
cd mikav-web
cp .env.example .env.local
npm install
npm run dev
```

Fill in `.env.local` with your Supabase project URL/key, Sarvam API key, and SerpApi key.

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the auth login page.

### Database setup (Supabase)

Apply the SQL migrations in `supabase/migrations/` **in order** (`01` → `03`) via the Supabase SQL Editor or CLI. See [supabase/README.md](supabase/README.md) for details, including the schema overview and storage buckets.

### Supabase dashboard configuration

- **Authentication → URL Configuration**: set Site URL and add your app origin(s) to Redirect URLs (e.g. `http://localhost:3000/**`, `https://your-domain/**`)
- **Authentication → Providers → Email**: enable "Confirm email" if you want new signups to verify via magic link before signing in

## Project Structure

```
mikav-web/
├── ai/
│   ├── prompts/                  # System prompts (scaffolded, empty)
│   └── knowledge/                # Knowledge base content (scaffolded, empty)
├── app/
│   ├── api/
│   │   ├── chat/                 # Sarvam AI chat completions endpoint
│   │   └── search/                # SerpApi web search endpoint
│   ├── auth/                     # Login, signup, forgot, reset, callback
│   ├── console/                   # Console routes
│   │   ├── chat/                 # Chat composer
│   │   │   └── [chatId]/        # Individual chat session
│   │   ├── chats/                # Chats list page
│   │   ├── groups/               # Groups list page
│   │   ├── help/                 # Help page (support form)
│   │   └── settings/              # Settings (redirects to popup)
│   ├── legal/                     # Terms, privacy, cookies
│   ├── layout.tsx                # Root layout (SEO, fonts, structured data)
│   ├── not-found.tsx              # Custom 404 page
│   ├── page.tsx                   # Root redirect → /auth/login
│   ├── robots.ts                  # Dynamic robots.txt
│   └── sitemap.ts                 # Dynamic sitemap.xml
├── components/
│   ├── app/                       # Public app shell (header, footer, layout)
│   ├── console/
│   │   ├── console-layout.tsx    # Console layout wrapper
│   │   ├── console-sidebar.tsx   # Collapsible sidebar with nav
│   │   ├── console-header.tsx    # Top header bar
│   │   ├── pages/
│   │   │   ├── chat/             # MessageInput + hooks/lib (audio, autosize)
│   │   │   ├── chats/            # Chat components (search, list, grid, card)
│   │   │   ├── groups/           # Group components (search, list, grid, card)
│   │   │   └── settings/          # Settings dialog & sidebar
│   │   └── shared/                # Shared components (profile bar, feedback, forms)
│   └── ui/                        # shadcn/ui primitives
├── docs/
│   └── ARCHITECTURE.md            # Project architecture reference
├── lib/
│   ├── supabase/                  # Supabase client/server/middleware/chats
│   └── utils.ts                   # Shared utilities (cn helper)
├── public/
│   ├── icons/app/                 # App icons (favicon, logo)
│   ├── llm.txt                    # LLM-readable site description
│   └── skill.md                   # Agent instructions for AI systems
├── supabase/
│   ├── migrations/                # SQL migrations (auth, database, storage)
│   └── README.md                  # Schema & migration guide
├── .github/
│   ├── workflows/                 # CI, CodeQL, dependency review, etc.
│   └── labeler.yml                # PR auto-labeling config
├── .env.example                   # Environment variable template
├── proxy.ts                       # Middleware: Supabase session + route protection
├── AGENTS.md                       # AI agent coding instructions
├── CLAUDE.md                       # Claude-specific instructions
├── CHANGELOG.md                    # Release changelog
├── CODE_OF_CONDUCT.md              # Community standards
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
├── ROADMAP.md                      # Project roadmap
└── SECURITY.md                     # Security policy
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Routing

| Path | Description |
|------|-------------|
| `/` | Redirects to `/auth/login` |
| `/auth/login` | Sign in page |
| `/auth/signup` | Sign up page |
| `/auth/forgot` | Forgot password page |
| `/auth/reset` | Reset password page |
| `/auth/callback` | Exchanges magic-link code for a session |
| `/console` | Redirects to `/console/chat` |
| `/console/chat` | Chat composer (creates a chat on first message) |
| `/console/chat/[chatId]` | Individual chat session |
| `/console/chats` | All chats — search, list/grid, delete |
| `/console/groups` | All groups list/grid |
| `/console/help` | Support request form |
| `/console/settings/*` | Redirects to popup dialog |
| `?settings=profile` | Opens settings popup (any console page) |
| `/api/chat` | POST — Sarvam AI chat completions (server-side) |
| `/api/search` | POST — SerpApi web search (server-side) |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Dynamic robots.txt |

## CI/CD & Automation

- **CI** — Lint and build on every push/PR to main
- **CodeQL** — Security analysis for JavaScript/TypeScript
- **Dependency Review** — Flags vulnerable dependencies on PRs
- **Labeler** — Auto-labels PRs based on changed file paths
- **Stale** — Marks inactive issues/PRs after 30 days
- **Greetings** — Welcomes first-time contributors
- **Issue Summary** — AI-generated summary on new issues

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — project structure, data flow, conventions
- [supabase/README.md](supabase/README.md) — database schema and migrations

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

## Security

If you discover a vulnerability, please see our [Security Policy](SECURITY.md). Do not open a public issue — email security@mikav.info instead.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for current priorities and long-term vision.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Email: hello@mikav.info
- GitHub: [github.com/mikav-ai](https://github.com/mikav-ai)
- Issues: [github.com/mikav-ai/mikav-web/issues](https://github.com/mikav-ai/mikav-web/issues)

---

<p align="center">Made with ❤️ in Kerala</p>
