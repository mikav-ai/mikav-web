# ai/ — Agent Instructions

Instructions for how AI agents and tooling should use the content in this
folder. This is the model-facing side of the project — knowledge base, system
prompts, and skill definitions — distinct from the app code instructions in
the root [`AGENTS.md`](../AGENTS.md).

## How this content should be used

### 1. System prompt assembly (`ai/prompts/`)

`app/api/chat/route.ts` currently has one inline system prompt (concise
responses, cite web search sources by URL). Files in `ai/prompts/` are drafts
meant to be merged into that system prompt over time:

- Pick **one** tone variant (`direct-functional.md`, `warm-conversational.md`,
  `precise-scholarly.md`, `creator-focused.md`, or `minimal-neutral.md`) as
  the base persona — do not concatenate multiple tone variants together
- Layer in behavioral guidance as needed: `refusal-prompts.md`,
  `citation-prompts.md`, `error-fallback-prompts.md`,
  `security-guardrails.md`
- `welcome-prompts.md` is **not** a system prompt — it's UI display content
  already implemented in `components/console/pages/chat/ui/prompt-suggestions.tsx`.
  Do not merge it into the API system prompt
- `eval-prompts.md` is **not** a system prompt — it's a test checklist. Run it
  against the model after any system prompt or model change; do not send it
  to end users

When merging prompt files into `app/api/chat/route.ts`, update the `status`
frontmatter field in the merged file from `draft` to `active`, and note the
change in `CHANGELOG.md`.

### 2. Knowledge base for fine-tuning and retrieval (`ai/knowledge/`)

`ai/knowledge/` describes Mikav's identity, purpose, capabilities, boundaries,
and values. This is intended to be used two ways as the project matures:

- **Retrieval-augmented context**: surfaced to the model at request time
  (e.g. injected as system/context messages) once retrieval is built —
  similar to how `app/api/chat/route.ts` already injects web search results
- **Fine-tuning source material**: `model.md` describes the planned move to
  an open Malayalam base model with fine-tuning on curated Kerala cultural
  data. Content in `ai/knowledge/` (and future community-contributed cultural
  data) is the intended source for that fine-tuning corpus

Agents should treat `ai/knowledge/*.md` as ground truth for how Mikav
describes itself, and should flag inconsistencies between these files and
Mikav's actual runtime behavior (e.g. if `capabilities.md` says something
"cannot do yet" that has since shipped, update the file).

**`model.md` and `capabilities.md` intentionally distinguish "current state"
from "planned/intended direction."** Do not blur this distinction when using
this content — agents should not present planned capabilities as already
live.

### 3. Skill definitions (`ai/skills/`)

Each `ai/skills/<name>/SKILL.md` describes one capability: inputs, expected
behavior, related implementation files, and status (`active` or `planned`).

- Only `cultural-qa` is `active` today — implemented via the general chat
  pipeline in `app/api/chat/route.ts`
- The other five (`translate`, `creator-assist`, `voice-interact`,
  `discover`, `dataset-search`) are `planned` — do not imply they are
  implemented when answering questions about Mikav's features
- When implementing a planned skill, update its `status` frontmatter to
  `active` and add its "Related files" section to point at the real
  implementation

## Conventions

- All files use YAML frontmatter (`name`, `type`/`tone`, `status`) — keep this
  consistent when adding new files
- Cross-reference related files under a `## Related files` or `## Related`
  section rather than duplicating content
- No emoji in any user-facing prompt or knowledge content (project-wide
  convention, see root `AGENTS.md`)
- Malayalam Unicode must be preserved correctly wherever it appears — never
  transliterate silently

## Related

- [`README.md`](README.md) — human-readable index of this folder
- [`../AGENTS.md`](../AGENTS.md) — root project agent instructions (app code,
  conventions, commands)
- [`../app/api/chat/route.ts`](../app/api/chat/route.ts) — where
  `ai/prompts/` content gets merged in practice
