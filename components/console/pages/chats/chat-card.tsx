"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatCardProps {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: string;
  loading?: boolean;
  onDelete?: (id: string) => Promise<void> | void;
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
  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    );
  }

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirming) {
      setConfirming(true);
      return;
    }

    setDeleting(true);
    try {
      await onDelete?.(id);
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="group relative block rounded-md border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <Link href={`/console/chat/${id}`} className="block pr-16">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        {lastMessage && (
          <p className="mt-1 text-xs text-gray-500 truncate">{lastMessage}</p>
        )}
        {timestamp && (
          <p className="mt-2 text-xs text-gray-400">{timestamp}</p>
        )}
      </Link>

      {onDelete && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {confirming && !deleting && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirming(false);
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={deleting}
            aria-label={confirming ? "Confirm delete" : "Delete chat"}
            title={confirming ? "Click again to confirm delete" : "Delete chat"}
            className={`rounded-md p-1.5 transition-colors ${
              confirming
                ? "bg-destructive text-destructive-foreground"
                : "text-gray-400 opacity-0 hover:bg-gray-100 hover:text-destructive group-hover:opacity-100"
            } disabled:opacity-60`}
          >
            {deleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
