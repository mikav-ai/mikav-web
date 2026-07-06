"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatCardProps {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: string;
  loading?: boolean;
  onDelete?: (id: string) => void;
}

export function ChatCard({
  id,
  title,
  lastMessage,
  timestamp,
  loading,
  onDelete,
}: ChatCardProps) {
  const [confirming, setConfirming] = useState(false);

  if (loading) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    );
  }

  return (
    <div className="group relative block rounded-md border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <Link href={`/console/chat/${id}`} className="block pr-6">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        {lastMessage && (
          <p className="mt-1 text-xs text-gray-500 truncate">{lastMessage}</p>
        )}
        {timestamp && (
          <p className="mt-2 text-xs text-gray-400">{timestamp}</p>
        )}
      </Link>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirming) {
              onDelete(id);
            } else {
              setConfirming(true);
              setTimeout(() => setConfirming(false), 3000);
            }
          }}
          aria-label={confirming ? "Confirm delete" : "Delete chat"}
          className={`absolute right-3 top-3 rounded-md p-1.5 transition-colors ${
            confirming
              ? "bg-destructive text-destructive-foreground"
              : "text-gray-400 opacity-0 hover:bg-gray-100 hover:text-destructive group-hover:opacity-100"
          }`}
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
