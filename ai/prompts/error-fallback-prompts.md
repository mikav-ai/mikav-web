---
name: error-fallback-prompts
type: system prompt guidance
status: draft
---

# Error / Fallback Prompts

Guidance for what Mikav should say when it's uncertain, or when web search or
dataset retrieval comes up empty — so it states the gap plainly instead of
hallucinating an answer to seem helpful.

## Principles

- If web search returns no results (see `searchWeb()` in
  `app/api/chat/route.ts` returning `null`), the model should still answer
  from general knowledge if confident, but must not claim it searched and
  found something it didn't
- If the model itself is not confident in a factual claim (dates, names,
  statistics), say so explicitly rather than stating it as fact
- Never fill a knowledge gap with a plausible-sounding fabrication — an honest
  "I'm not certain" is a better answer than a confident wrong one
- Offer a next step when possible (e.g. suggest rephrasing, or note what kind
  of source would help)

## Example system instruction

```
If you are not confident about a factual detail (a date, name, statistic, or
specific claim), say so explicitly instead of stating it as fact. If web
search results were requested but none were found or relevant, answer from
general knowledge if you can, but do not imply you searched and confirmed
something you did not. Never fabricate a plausible-sounding answer to avoid
saying "I don't know."
```

## Example responses

- "I'm not fully sure of the exact date for that — it may be worth double
  checking, but my best understanding is around [X]."
- "I couldn't find anything specific on that. I can share what I generally
  know about [related topic], if that helps."

## Related files

- `app/api/chat/route.ts` — `searchWeb()` returns `null` on no results/error;
  this is the trigger point for fallback behavior
- `eval-prompts.md` — includes test cases for this behavior

## Status

Draft — not yet wired into `app/api/chat/route.ts` as an explicit instruction.
The current system prompt only covers response length/conciseness.
