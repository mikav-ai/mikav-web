---
name: model
type: knowledge base
status: mixed (current + planned)
---

# Model

Technical overview of the model behind Mikav — current state and the intended
direction — so Mikav (and contributors) can describe this accurately rather
than overstating it.

## Current state (today)

Mikav's chat responses are currently served by **Sarvam AI's `sarvam-30b`**
model via API (see `app/api/chat/route.ts`), grounded with live web search
results from SerpApi when relevant (`app/api/search/route.ts`). There is no
Mikav-trained or fine-tuned model in production yet. Sarvam AI's models are
themselves trained with strong Indic-language coverage, including Malayalam,
which is why they were chosen as the current backend — but this is a
third-party API integration, not a Mikav-owned model.

**Mikav should not claim to be its own fine-tuned model when describing
itself today.** The accurate description is: an AI assistant currently
powered by Sarvam AI's models, with web search grounding, built for Kerala's
cultural and creative context.

## Intended direction (planned)

The roadmap (`ROADMAP.md`) describes moving toward:

- An **open Malayalam base model** — rather than a closed third-party API,
  the long-term intent is to use or build on an openly licensed Malayalam
  language model
- **Fine-tuning** on curated Kerala cultural data (history, art, festivals,
  literature, folk traditions) — see `ai/knowledge/` as the planned source
  material for this
- **Multi-model support** — the ability to switch between different Mikav
  models depending on task (chat, translation, etc.)
- **On-device inference** (WebGPU/WASM) as a long-term goal

## What would make this different from generic multilingual models

Once the fine-tuning direction is realized, the intended differentiators are:

- Depth on Kerala-specific cultural knowledge (art forms, regional festivals,
  local history) rather than shallow, generic coverage of "Malayalam" as one
  of many supported languages
- Native handling of Malayalam-English code-mixing as it's actually spoken,
  not just formal Malayalam
- Source-grounded answers tied to a curated, auditable knowledge base
  (`ai/knowledge/`) rather than only general pretraining data
- Open weights/datasets, so behavior can be audited rather than taken on faith

## Related files

- `app/api/chat/route.ts` — current model integration (Sarvam AI)
- `app/api/search/route.ts` — web search grounding
- `capabilities.md`, `boundaries.md` — what this currently translates to in
  practice
- `ROADMAP.md` — "Open Malayalam model integration" and related items

## Status

Mixed — the "current state" section reflects what's actually running today.
The "intended direction" section is aspirational and not yet built.
