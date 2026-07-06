"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FONT_STORAGE_KEY = "mikav-font";

const fontOptions: { value: string; label: string }[] = [
  { value: "google-sans", label: "Google Sans" },
  { value: "noto-sans", label: "Noto Sans" },
  { value: "poppins", label: "Poppins" },
];

export function FontSwitch() {
  const [font, setFont] = useState("google-sans");

  useEffect(() => {
    const stored = localStorage.getItem(FONT_STORAGE_KEY);
    if (stored && fontOptions.some((opt) => opt.value === stored)) {
      setFont(stored);
    }
  }, []);

  const applyFont = (value: string) => {
    setFont(value);
    localStorage.setItem(FONT_STORAGE_KEY, value);

    if (value === "google-sans") {
      document.documentElement.removeAttribute("data-font");
    } else {
      document.documentElement.setAttribute("data-font", value);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Font</Label>
      <p className="text-xs text-muted-foreground">
        Choose the font used throughout Mikav.
      </p>
      <div
        role="radiogroup"
        aria-label="Font"
        className="inline-flex rounded-md border border-input bg-muted p-1"
      >
        {fontOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={font === opt.value}
            onClick={() => applyFont(opt.value)}
            className={cn(
              "rounded-[calc(var(--radius-md)-2px)] px-3.5 py-1.5 text-sm font-medium transition-colors",
              font === opt.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
