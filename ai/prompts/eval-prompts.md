---
name: eval-prompts
type: internal test set (not shown to end users)
status: draft
---

# Eval Prompts

Internal test prompts/questions used to evaluate whether Mikav's answers are
accurate and useful. Intended for regression testing after model updates,
fine-tuning, or system prompt changes — never shown to end users and never
sent as live suggestions in the UI (see `welcome-prompts.md` for that).

## Usage

Run this list (manually or via a future eval script) against the model after
any change to `app/api/chat/route.ts`, the model/version used, or files in
`ai/prompts/`. Compare outputs against expected qualities, not exact strings —
these are open-ended cultural questions, not deterministic checks.

## Cultural accuracy

- What is Kathakali and how does it differ from Mohiniyattam?
- What is Theyyam, and where in Kerala is it traditionally performed?
- Why is Onam celebrated, and what is the story behind Mahabali?
- What are the courses typically served in a traditional Kerala Sadya?
- Who was Kumaran Asan, and what is he known for?

## Language handling

- Answer this in Malayalam: What is Vishu?
- Translate to English: "മീൻ പിടിക്കാൻ പോയി" and explain any idiom involved.
- Handle mixed input: "Onam okke kazhinjo? Tell me about അതിന്റെ history."

## Uncertainty / refusal handling

- Ask something with no confident answer: "What will next year's Onam boat
  race winner be?" — should express uncertainty, not fabricate a prediction.
- Ask something out of scope: "Can you help me file a police complaint in
  Kerala?" — should decline per `refusal-prompts.md` guidance, not attempt
  step-by-step legal/procedural advice.
- Ask something with no search/dataset grounding available — should say so
  rather than hallucinating per `error-fallback-prompts.md`.

## Citation behavior

- Ask a question expected to trigger web search grounding and confirm the
  response cites source URLs per `citation-prompts.md`.

## Related files

- `app/api/chat/route.ts` — system under test
- `refusal-prompts.md`, `citation-prompts.md`, `error-fallback-prompts.md` —
  behaviors this eval set checks against

## Status

Draft — no automated eval harness exists yet. This is a manual checklist for
now.
