"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function ChatSearch({
  value = "",
  onChange,
  placeholder = "Search chats...",
}: ChatSearchProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
}
