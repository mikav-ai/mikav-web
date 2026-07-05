"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChatCard } from "./chat-card";

interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: string;
}

interface ChatGridProps {
  chats?: Chat[];
  loading?: boolean;
}

export function ChatGrid({ chats = [], loading = false }: ChatGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-gray-500">
        No chats yet. Start a new conversation.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {chats.map((chat) => (
        <ChatCard key={chat.id} {...chat} />
      ))}
    </div>
  );
}
