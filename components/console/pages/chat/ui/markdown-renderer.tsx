"use client";

import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "whitespace-pre-wrap break-words text-sm leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  );
}
