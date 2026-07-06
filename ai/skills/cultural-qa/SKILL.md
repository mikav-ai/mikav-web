---
name: cultural-qa
description: Answer questions about Kerala's culture, history, arts, festivals, and traditions in Malayalam or English.
status: active
---

# Cultural Q&A

## Overview

Mikav's core skill for answering questions about Kerala — its art forms (Kathakali,
Mohiniyattam, Theyyam), festivals (Onam, temple festivals), literature, folk stories,
cuisine (Sadya), and history. This is the primary use case surfaced through the chat
console's welcome messages and prompt suggestions.

## Inputs

- A user question in Malayalam or English, optionally mixed (code-switching)
- Optional web search context (SerpApi) for grounding recent or factual claims

## Behavior

- Respond concisely by default (see system prompt in `app/api/chat/route.ts`)
- Prefer factual, well-sourced answers; use web search grounding when available
- Preserve Malayalam Unicode correctly in both input and output
- Avoid emoji in responses unless the user uses them first

## Related files

- `app/api/chat/route.ts` — chat completion route (Sarvam AI)
- `app/api/search/route.ts` — web search grounding (SerpApi)
- `app/console/chat/page.tsx`, `app/console/chat/[chatId]/page.tsx` — chat UI entry points
- `ai/prompts/` — system prompt content (planned)
- `ai/knowledge/` — curated cultural knowledge base (planned)

## Status

Active — implemented via the general chat completion pipeline. Dedicated retrieval
against `ai/knowledge/` content is planned (see `ROADMAP.md`).
