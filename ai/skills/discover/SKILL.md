---
name: discover
description: Help users discover Mikav features, Malayalam AI models, and Kerala-related content and platforms.
status: planned
---

# Discover

## Overview

A guided discovery skill — helping users find relevant Mikav features, available
models, and Kerala cultural/educational content, rather than answering a specific
factual question. Supports onboarding and cross-linking to other skills
(`cultural-qa`, `dataset-search`, `translate`).

## Inputs

- A vague or exploratory user query ("what can Mikav do?", "what's here about
  Onam?", "show me something about Kerala history")
- Optional user context (recent chat topics, preferences)

## Behavior

- Surface relevant prompt suggestions or skills rather than a single flat answer
- Point to `cultural-qa` for factual questions, `dataset-search` for datasets,
  `translate` for language conversion
- Keep responses short; this skill routes, it doesn't deep-dive

## Related files

- `components/console/pages/chat/ui/prompt-suggestions.tsx` — rotating welcome
  messages and suggestion pills used for discovery today
- `app/console/chat/page.tsx`, `app/console/chat/[chatId]/page.tsx` — suggestion
  lists

## Status

Planned — today, discovery is limited to static rotating prompt suggestions in
the chat UI. No dedicated routing/recommendation logic exists yet.
