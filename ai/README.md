# ai/

This folder holds Mikav's model-facing content — knowledge base, system
prompts, and skill definitions. It's markdown, not code, so non-engineers
(cultural experts, writers, community contributors) can read and contribute
without needing to touch the app.

Nothing here is wired into the live chat pipeline automatically. Files are
merged into `app/api/chat/route.ts`'s system prompt, used as fine-tuning
source material, or read by future retrieval/skill-routing logic as that work
lands — see `AGENTS.md` in this folder for how each subfolder is meant to be
used.

## Structure

```
ai/
├── knowledge/    # Who Mikav is, what it can/can't do, its values
├── prompts/      # System prompt drafts, tone variants, UI copy, safety rules
└── skills/       # Individual capability definitions (SKILL.md per skill)
```

## `ai/knowledge/`

Mikav's identity, purpose, and operating principles.

| File | Description |
|------|-------------|
| [`identity.md`](knowledge/identity.md) | Who Mikav is: name, mission, one-line pitch, tone of voice when describing itself |
| [`origin.md`](knowledge/origin.md) | Why Mikav was built and its purpose for Kerala's creative and cultural ecosystem |
| [`model.md`](knowledge/model.md) | Technical overview: current model (Sarvam AI), and the planned open Malayalam base / fine-tuning direction |
| [`capabilities.md`](knowledge/capabilities.md) | What Mikav can and cannot do today, so it doesn't over-promise |
| [`boundaries.md`](knowledge/boundaries.md) | What Mikav should avoid claiming, and how to defer gracefully outside its scope |
| [`values.md`](knowledge/values.md) | Guiding principles: cultural accuracy, source-grounding, respect for tradition |

## `ai/prompts/`

System prompt drafts, UI copy, and safety/quality guidance.

| File | Description |
|------|-------------|
| [`direct-functional.md`](prompts/direct-functional.md) | System prompt variant — direct/functional tone |
| [`warm-conversational.md`](prompts/warm-conversational.md) | System prompt variant — warm/conversational tone |
| [`precise-scholarly.md`](prompts/precise-scholarly.md) | System prompt variant — precise/scholarly tone |
| [`creator-focused.md`](prompts/creator-focused.md) | System prompt variant — creator-focused tone |
| [`minimal-neutral.md`](prompts/minimal-neutral.md) | System prompt variant — minimal/neutral tone |
| [`welcome-prompts.md`](prompts/welcome-prompts.md) | Rotating welcome messages & suggestion chips shown in the chat UI (display strings, not model instructions) |
| [`refusal-prompts.md`](prompts/refusal-prompts.md) | Tone and phrasing for declining out-of-scope requests |
| [`citation-prompts.md`](prompts/citation-prompts.md) | How Mikav should format and attach source citations |
| [`translation-prompts.md`](prompts/translation-prompts.md) | Rules for the translation skill: idiom preservation, code-mixed input |
| [`error-fallback-prompts.md`](prompts/error-fallback-prompts.md) | What to say when uncertain or retrieval comes up empty, to avoid hallucination |
| [`security-guardrails.md`](prompts/security-guardrails.md) | Prompt injection resistance, PII protection, scope enforcement, source-of-truth priority, API abuse prevention |
| [`eval-prompts.md`](prompts/eval-prompts.md) | Internal test prompts for regression-checking model/prompt changes (not shown to users) |

## `ai/skills/`

One `SKILL.md` per capability, describing inputs, behavior, and current
implementation status.

| Skill | Status | Description |
|-------|--------|-------------|
| [`cultural-qa`](skills/cultural-qa/SKILL.md) | Active | Answer questions about Kerala's culture, history, arts, festivals, traditions |
| [`translate`](skills/translate/SKILL.md) | Planned | Translate between Malayalam and English, preserving idiom and tone |
| [`creator-assist`](skills/creator-assist/SKILL.md) | Planned | Help creators write, edit, and brainstorm content |
| [`voice-interact`](skills/voice-interact/SKILL.md) | Planned | Voice input/output in Malayalam and English |
| [`discover`](skills/discover/SKILL.md) | Planned | Guide users to relevant Mikav features and content |
| [`dataset-search`](skills/dataset-search/SKILL.md) | Planned | Search and browse open Malayalam/Kerala datasets |

## Contributing

This content is meant to be community-editable. If you know Kerala's culture,
history, or language well and see something inaccurate or missing, open a PR
against the relevant file. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).

## Related

- [`AGENTS.md`](AGENTS.md) — how this content should be used by AI agents and
  tooling (fine-tuning, retrieval, prompt assembly)
- [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) — where this fits in
  the overall project
- [`../app/api/chat/route.ts`](../app/api/chat/route.ts) — the live chat
  route this content is meant to eventually feed into
