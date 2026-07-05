"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="rounded-lg bg-muted px-4 py-3">
        <div className="flex space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
