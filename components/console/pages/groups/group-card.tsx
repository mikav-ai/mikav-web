"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface GroupCardProps {
  id: string;
  name: string;
  memberCount?: number;
  description?: string;
  loading?: boolean;
}

export function GroupCard({ id, name, memberCount, description, loading }: GroupCardProps) {
  if (loading) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    );
  }

  return (
    <Link
      href={`/console/groups/${id}`}
      className="block rounded-md border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
      {description && (
        <p className="mt-1 text-xs text-gray-500 truncate">{description}</p>
      )}
      {memberCount !== undefined && (
        <p className="mt-2 text-xs text-gray-400">{memberCount} members</p>
      )}
    </Link>
  );
}
