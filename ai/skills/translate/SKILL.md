---
name: translate
description: Translate text between Malayalam and English (and other languages), preserving meaning, tone, and Unicode correctness.
status: planned
---

# Translate

## Overview

Translation between Malayalam and English, with an emphasis on natural, idiomatic
output rather than literal word-for-word conversion. Intended to handle proverbs,
poetry, and colloquial speech, not just plain text.

## Inputs

- Source text (Malayalam or English, or mixed)
- Optional target language (defaults to the "other" language: Malayalam <-> English)
- Optional tone/register hint (formal, casual, literary)

## Behavior

- Preserve Malayalam Unicode correctly on input and output
- Retain meaning and tone over literal accuracy for idioms and proverbs
- For ambiguous short phrases, ask a clarifying question rather than guessing
- No emoji in output unless present in the source text

## Related files

- `app/api/chat/route.ts` — chat completion route (Sarvam AI) currently handles
  translation requests as regular chat messages
- `ai/prompts/` — dedicated translation system prompt (planned)

## Status

Planned — currently handled implicitly by the general chat model via
`app/api/chat/route.ts`. A dedicated prompt/skill routing layer is not yet built.
