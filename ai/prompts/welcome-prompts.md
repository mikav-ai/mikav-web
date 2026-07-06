---
name: welcome-prompts
type: UI content (not a model instruction)
status: active
---

# Welcome & Suggestion Prompts

These are **UI display strings**, not instructions sent to the model. They're
shown and randomly rotated client-side in the chat composer
(`components/console/pages/chat/ui/prompt-suggestions.tsx`) and referenced by
`app/console/chat/page.tsx` and `app/console/chat/[chatId]/page.tsx`.

Kept separate from `ai/prompts/*` system prompts since these never reach the
chat completion API — they're purely presentational.

## Welcome messages (rotate on new chat)

One is picked at random per new chat/session:

- Namaskaram! What would you like to know about Kerala?
- Namaskaram, curious about Kathakali today?
- Namaskaram! Ask me anything, Malayalam or English.
- Namaskaram — let's explore Kerala's culture together.
- Namaskaram! What's on your mind about Kerala?

## Suggestion chips (3 picked at random per session)

- What is Kathakali?
- Why do we celebrate Onam?
- Can you translate this to Malayalam?
- Tell me a Kerala folk story?
- What is Mohiniyattam?
- What festivals happen at Kerala temples?
- What is Theyyam?
- How is Kerala Sadya served?
- Who was Kumaran Asan?
- What is a Malayalam proverb?
- How did Kerala's backwaters shape its culture?

## Conventions

- No emoji
- Kerala/Malayalam culture themed
- Short — fits on a single chip/line
- Update both `app/console/chat/page.tsx` and
  `app/console/chat/[chatId]/page.tsx` together when changing these lists (they
  are currently duplicated, not shared from a single source)

## Status

Active — currently implemented and live in the chat UI.
