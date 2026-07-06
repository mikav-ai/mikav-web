"use client";

import { FeedbackButton } from "./shared";

export function ConsoleHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-end border-b border-gray-200 bg-white px-6">
      <FeedbackButton />
    </header>
  );
}
