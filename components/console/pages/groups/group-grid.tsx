"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GroupCard } from "./group-card";

interface Group {
  id: string;
  name: string;
  memberCount?: number;
  description?: string;
}

interface GroupGridProps {
  groups?: Group[];
  loading?: boolean;
}

export function GroupGrid({ groups = [], loading = false }: GroupGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-gray-500">
        No groups yet. Create or join a group.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </div>
  );
}
