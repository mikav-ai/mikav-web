"use client"

import { Button } from "@/components/ui/button"

interface PromptSuggestionsProps {
  label?: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label = "Try these prompts",
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4">
      <p className="text-base font-medium text-muted-foreground">{label}</p>
      <div className="flex max-w-2xl flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            className="h-auto whitespace-normal rounded-full px-4 py-2 text-left text-sm"
            onClick={() => append({ role: "user", content: suggestion })}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}
