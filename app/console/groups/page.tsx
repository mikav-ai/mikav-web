"use client";

import { useState } from "react";
import { GroupSearch, GroupList, GroupGrid } from "@/components/console/pages/groups";
import { LayoutList, LayoutGrid } from "lucide-react";

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Groups</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <GroupSearch value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${
                view === "list" ? "bg-gray-200 text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="List view"
            >
              <LayoutList size={18} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-colors ${
                view === "grid" ? "bg-gray-200 text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
        {view === "list" ? <GroupList loading={false} /> : <GroupGrid loading={false} />}
      </div>
    </div>
  );
}
