---
name: dataset-search
description: Search and browse open Malayalam and Kerala-related datasets for research and model training.
status: planned
---

# Dataset Search

## Overview

Helps users find open Malayalam-language and Kerala-related datasets (text,
speech, image) for research, fine-tuning, or model training. Corresponds to
"Dataset explorer — browse open Malayalam datasets" on the roadmap.

## Inputs

- A topic, language, or modality (text, speech, image) the user wants dataset
  coverage for
- Optional filters (license, size, source)

## Behavior

- Return dataset names, sources/links, license, and a short description
- Prefer openly licensed datasets; flag licensing restrictions clearly
- Do not fabricate dataset details — if uncertain, say so rather than guessing

## Related files

- `app/api/search/route.ts` — general web search (SerpApi), could back initial
  dataset discovery until a curated index exists
- `ai/knowledge/` — planned location for a curated dataset index

## Status

Planned — not yet implemented. See "Dataset explorer — browse open Malayalam
datasets" in `ROADMAP.md` (Mid-term v1.x).
