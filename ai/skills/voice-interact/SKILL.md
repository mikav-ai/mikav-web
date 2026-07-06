---
name: voice-interact
description: Voice input/output in Malayalam and English for hands-free chat interaction.
status: planned
---

# Voice Interact

## Overview

Voice-based interaction with Mikav — speech-to-text for input and text-to-speech
for output, in Malayalam and English. Corresponds to "Voice input/output in
Malayalam" on the long-term roadmap.

## Inputs

- Recorded audio (microphone capture) or an audio file
- Optional language hint (Malayalam, English, or auto-detect)

## Behavior

- Transcribe speech accurately, handling Malayalam phonetics and code-switching
- Synthesize responses with natural pacing and pronunciation
- Fall back to text chat gracefully if voice fails (no silent failures)

## Related files

- `components/console/pages/chat/hooks/use-audio-recording.ts` — existing audio
  recording hook (currently used for attachments, not full voice interaction)
- `components/console/pages/chat/lib/audio-utils.ts` — audio helper utilities
- `components/console/pages/chat/ui/message-input.tsx` — message input with
  attachment/recording UI

## Status

Planned — audio recording plumbing exists for file attachments, but full
speech-to-text/text-to-speech voice interaction is not yet implemented. See
"Voice input/output in Malayalam" in `ROADMAP.md` (Long-term Vision).
