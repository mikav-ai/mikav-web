"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatCardProps {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: string;
  loading?: boolean;
}

export function ChatCard({ id, title, lastMessage, timestamp, loading }: ChatCardProps) {
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
    <Link
      href={`/console/chat/${id}`}
      className="block rounded-md border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
      {lastMessage && (
        <p className="mt-1 text-xs text-gray-500 truncate">{lastMessage}</p>
      )}
      {timestamp && (
        <p className="mt-2 text-xs text-gray-400">{timestamp}</p>
      )}
    </Link>
  );
}
