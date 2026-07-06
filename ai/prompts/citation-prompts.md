---
name: citation-prompts
type: system prompt guidance
status: draft
---

# Citation Prompts

Instructions for how Mikav should format and attach source citations when an
answer is grounded in web search results or curated dataset content. Isolated
from the main system prompt so citation formatting can be tested and iterated
on independently.

## Principles

- Only cite when a claim is actually grounded in retrieved content (search
  results or dataset), not for general knowledge already known confidently
- Cite by URL for web search results, and by dataset/source name for curated
  knowledge base content
- Keep citations inline and unobtrusive — don't break the flow of a short
  answer with a wall of footnotes
- Never invent a source. If no source is available, say the answer is based on
  general knowledge instead of fabricating a citation

## Example system instruction

```
When you use information from the provided web search results or knowledge
base entries, cite the source inline using its URL (for web results) or its
title (for knowledge base entries), e.g. "(Source: example.com)". Only cite
when a specific claim actually comes from that source. Do not cite sources
you were not given. If you're answering from general knowledge without a
provided source, don't fabricate one.
```

## Current implementation note

`app/api/chat/route.ts` already instructs the model to "cite sources by URL"
when web search context is injected. This file exists to formalize and expand
that instruction as citation needs grow (e.g. multiple sources, dataset
citations, footnote-style formatting).

## Related files

- `app/api/chat/route.ts` — existing inline web search citation instruction
- `ai/knowledge/` — planned curated knowledge base that would need its own
  citation format

## Status

Draft — partially implemented (web search citation only) in
`app/api/chat/route.ts`. Dataset/knowledge-base citation format not yet built.
