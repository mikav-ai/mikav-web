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

- Interactive chat console with conversation management
- Dynamic chat sessions with unique IDs
- Responsive sidebar navigation with active route highlighting
- Light-only branded UI with Mikav primary color (#c8242b)
- SEO optimized with Open Graph, Twitter Cards, and JSON-LD structured data
- Answer Engine Optimization (AEO) with llm.txt and skill.md for AI crawlers
- Dynamic sitemap and robots.txt generation
- Custom 404 error page
- shadcn/ui component library integration
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
| Fonts | Geist Sans & Geist Mono |
| Package Manager | npm |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/mikav-ai/mikav-web.git
cd mikav-web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the console chat.

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Public app URL (default: http://localhost:3000) |
| `NEXT_PUBLIC_APP_NAME` | App display name |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `API_SECRET_KEY` | Server-side API secret |
| `AUTH_SECRET` | Authentication secret |
| `AUTH_URL` | Auth callback URL |
| `DATABASE_URL` | Database connection string |
| `MIKAV_MODEL_API_URL` | Mikav model inference endpoint |
| `MIKAV_MODEL_API_KEY` | Mikav model API key |

## Project Structure

```
mikav-web/
├── app/                          # Next.js App Router
│   ├── console/                  # Console routes
│   │   ├── chat/                 # Chat page
│   │   │   └── [chatId]/        # Dynamic chat session
│   │   ├── settings/            # Settings page
│   │   └── help/                # Help page
│   ├── layout.tsx               # Root layout (SEO, fonts, structured data)
│   ├── not-found.tsx            # Custom 404 page
│   ├── page.tsx                 # Root redirect → /console
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic sitemap.xml
├── components/
│   ├── console/                 # Console shell components
│   │   ├── console-layout.tsx   # Full console layout wrapper
│   │   ├── console-sidebar.tsx  # Sidebar navigation
│   │   ├── console-header.tsx   # Top header bar
│   │   └── index.ts            # Barrel exports
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   └── utils.ts                # Shared utilities (cn helper)
├── public/
│   ├── icons/app/              # App icons (favicon, logo)
│   ├── llm.txt                 # LLM-readable site description
│   └── skill.md                # Agent instructions for AI systems
├── .github/
│   ├── workflows/              # CI, CodeQL, dependency review, etc.
│   └── labeler.yml             # PR auto-labeling config
├── .env.example                # Environment variable template
├── AGENTS.md                   # AI agent coding instructions
├── CLAUDE.md                   # Claude-specific instructions
├── CHANGELOG.md                # Release changelog
├── CODE_OF_CONDUCT.md          # Community standards
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
├── ROADMAP.md                  # Project roadmap
└── SECURITY.md                 # Security policy
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
| `/` | Redirects to `/console` |
| `/console` | Redirects to `/console/chat` |
| `/console/chat` | Main chat interface |
| `/console/chat/[chatId]` | Individual chat session |
| `/console/settings` | User settings |
| `/console/help` | Help & documentation |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Dynamic robots.txt |
| `/llm.txt` | LLM-readable site info |
| `/skill.md` | AI agent instructions |

## CI/CD & Automation

The project includes GitHub Actions workflows:

- **CI** — Lint and build on every push/PR to main
- **CodeQL** — Security analysis for JavaScript/TypeScript
- **Dependency Review** — Flags vulnerable dependencies on PRs
- **Labeler** — Auto-labels PRs based on changed file paths
- **Stale** — Marks inactive issues/PRs after 30 days
- **Greetings** — Welcomes first-time contributors
- **Issue Summary** — AI-generated summary on new issues

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
