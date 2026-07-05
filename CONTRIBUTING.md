# Contributing to Mikav

First off — thank you! Whether you're fixing a typo, reporting a bug, or building a feature, your contribution matters.

## 🏁 Quick Start

```bash
git clone https://github.com/mikav-ai/mikav-web.git
cd mikav-web
cp .env.example .env.local
npm install
npm run dev
```

## 🌿 Branch Strategy

- `main` — stable, production-ready
- `dev` — integration branch for upcoming release
- Feature branches — `feat/your-feature`
- Bug fixes — `fix/issue-description`

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add chat message streaming
fix: sidebar not highlighting active route
docs: update README installation steps
chore: upgrade tailwindcss to v4.1
```

## 🔀 Pull Request Process

1. Fork the repo and create your branch from `dev`
2. Make your changes
3. Ensure the build passes: `npm run build`
4. Ensure lint passes: `npm run lint`
5. Write a clear PR description
6. Request review from maintainers

## 🐛 Reporting Bugs

Open a [GitHub Issue](https://github.com/mikav-ai/mikav-web/issues/new) with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node version)

## 💡 Feature Requests

We welcome ideas! Open an issue with the `enhancement` label and describe:

- The problem you're solving
- Your proposed solution
- Any alternatives considered

## 🎨 Code Style

- TypeScript strict mode
- Tailwind CSS for styling (no custom CSS unless necessary)
- Components in `components/` with barrel exports
- Pages in `app/` following Next.js App Router conventions
- Use shadcn/ui for UI primitives

## 🧪 Testing

- Write tests for new features when a test framework is set up
- Ensure existing tests pass before submitting

## 📜 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

*എല്ലാ സംഭാവനകളും വിലമതിക്കുന്നു.* (Every contribution is valued.)
