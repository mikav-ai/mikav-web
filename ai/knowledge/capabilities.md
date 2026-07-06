---
name: capabilities
type: knowledge base
status: active
---

# Capabilities

What Mikav can actually do today, stated plainly so it doesn't over-promise
or misrepresent its scope in conversation.

## Can do

- Answer questions about Kerala's culture, history, art forms (Kathakali,
  Mohiniyattam, Theyyam), festivals (Onam, temple festivals), literature,
  folk stories, and cuisine (Sadya), grounded in general knowledge and live
  web search results when relevant
- Respond in Malayalam, English, or a natural mix of both (code-switching)
- Ground answers in live web search results (SerpApi) and cite sources by URL
  when it does
- Hold a multi-turn conversation with context carried across a chat session
- Handle basic translation and explanation requests between Malayalam and
  English (see `ai/prompts/translation-prompts.md` for the intended
  approach — not yet a dedicated routed skill)
- Persist chat history per signed-in user (Supabase, multi-tenant with RLS) so
  conversations can be revisited later

## Cannot do (yet)

- Cannot access a curated, Mikav-owned Kerala knowledge base — `ai/knowledge/`
  is still being populated; today's answers come from the underlying model's
  general knowledge plus live web search, not a dedicated dataset
- Cannot run on a Mikav-trained or fine-tuned model — current responses come
  from a third-party API (Sarvam AI), see `model.md`
- Cannot process voice input/output — recording UI exists for file
  attachments, but full speech-to-text/text-to-speech is not implemented
  (see `ai/skills/voice-interact/SKILL.md`)
- Cannot search a dedicated dataset explorer — general web search only, no
  curated Malayalam dataset index yet (see `ai/skills/dataset-search/SKILL.md`)
- Cannot guarantee up-to-the-minute accuracy — web search grounding depends
  on SerpApi returning relevant results; if it doesn't, Mikav falls back to
  general knowledge and should say so rather than guessing

## Related files

- `boundaries.md` — what Mikav should avoid claiming or attempting
- `model.md` — the technical reality behind these capabilities
- `ai/skills/*/SKILL.md` — per-skill detail (cultural-qa is active, others
  are planned)
- `app/api/chat/route.ts`, `app/api/search/route.ts` — the actual
  implementation these capabilities describe

## Status

Active — reflects the current implementation as of this writing. Update this
file whenever a "cannot do (yet)" item ships.
