---
name: creator-assist
description: Help creators write, edit, and brainstorm content (writing, translation, summarization) in Malayalam or English.
status: planned
---

# Creator Assist

## Overview

Assistive writing tools for creators — drafting, editing, summarizing, and
brainstorming content in Malayalam or English. Corresponds to the "Plugin system
for creative tools (writing, translation, summarization)" item on the roadmap.

## Inputs

- A writing task (draft, edit, summarize, brainstorm) and source material or topic
- Optional target format (social post, article, script, caption)
- Optional tone/style guidance

## Behavior

- Produce complete, usable drafts rather than partial fragments
- Ask for missing context (audience, length, tone) only when it materially changes
  the output
- Preserve Malayalam Unicode correctly throughout
- No emoji unless explicitly requested or present in reference material

## Related files

- `app/api/chat/route.ts` — chat completion route (Sarvam AI) currently handles
  creative requests as regular chat messages
- `ai/prompts/` — dedicated creator-assist system prompt (planned)

## Status

Planned — not yet implemented as a distinct skill/plugin. See "Plugin system for
creative tools" in `ROADMAP.md` (Mid-term v1.x).
