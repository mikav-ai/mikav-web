"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"

interface PromptSuggestionsProps {
  labels?: string[]
  label?: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
  count?: number
}

function pickRandom(items: string[], count: number) {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function pickOne(items: string[]) {
  return items[Math.floor(Math.random() * items.length)]
}

export function PromptSuggestions({
  labels,
  label,
  append,
  suggestions,
  count = 4,
}: PromptSuggestionsProps) {
  const welcomeLabel = useMemo(() => {
    if (labels && labels.length > 0) return pickOne(labels)
    return label ?? "Welcome to Mikav"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visibleSuggestions = useMemo(
    () => pickRandom(suggestions, count),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-4">
      <p className="text-2xl font-semibold text-foreground">{welcomeLabel}</p>
      <div className="flex max-w-2xl flex-wrap justify-center gap-3">
        {visibleSuggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            className="h-auto whitespace-normal rounded-full px-5 py-2.5 text-left text-sm"
            onClick={() => append({ role: "user", content: suggestion })}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}
