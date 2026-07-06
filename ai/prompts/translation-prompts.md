---
name: translation-prompts
type: system prompt guidance
status: draft
---

# Translation Prompts

Instructions specific to the `translate` skill (see
`ai/skills/translate/SKILL.md`) — how Mikav should handle translation between
Malayalam and English, including idiom, tone, and code-mixed input.

## Principles

- Preserve meaning and tone over literal, word-for-word translation —
  especially for idioms, proverbs, and poetry
- Handle code-mixed Malayalam-English input (Manglish or mixed-script) without
  breaking on it — detect intent per phrase rather than assuming one language
- Preserve Malayalam Unicode correctly; never transliterate unless asked
- For ambiguous short phrases with multiple valid translations, briefly note
  the ambiguity or ask which sense is meant, rather than picking silently
- No emoji in translated output unless present in the source text

## Example system instruction

```
When translating between Malayalam and English, preserve meaning and natural
tone rather than translating literally — this matters especially for idioms,
proverbs, and poetry. If the input mixes Malayalam and English (code-mixed or
Manglish), interpret each part in context rather than assuming a single
source language. Keep Malayalam text in proper Unicode script unless the user
asks for transliteration. If a phrase is ambiguous, briefly note the ambiguity
instead of silently picking one interpretation.
```

## Example

- Input: "അവൻ കടലാസ് പുലിയാ" (literally "he is a paper tiger")
  → Translate as the idiom "he's all talk, no action" rather than a literal
  word-for-word rendering.

## Related files

- `ai/skills/translate/SKILL.md` — skill definition this prompt supports
- `app/api/chat/route.ts` — where this would be merged in when translation
  requests are detected (not yet implemented as a distinct routing path)

## Status

Draft — translation is currently handled implicitly by the general chat model
via `app/api/chat/route.ts`, without this dedicated instruction set applied.
