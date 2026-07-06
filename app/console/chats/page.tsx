"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ChatSearch, ChatList, ChatGrid } from "@/components/console/pages/chats";
import { LayoutList, LayoutGrid } from "lucide-react";
import { listChats, deleteChat, getErrorMessage, type ChatRow } from "@/lib/supabase/chats";

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChatsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listChats()
      .then((rows) => {
        if (active) setChats(rows);
      })
      .catch((error) => {
        console.error("Failed to load chats:", getErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = useCallback(async (id: string) => {
    setDeleteError(null);
    try {
      await deleteChat(id);
      setChats((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("Failed to delete chat:", message);
      setDeleteError(message);
    }
  }, []);

  const filteredChats = useMemo(() => {
    const mapped = chats.map((chat) => ({
      id: chat.id,
      title: chat.title,
      timestamp: formatTimestamp(chat.updated_at),
    }));

    if (!search.trim()) return mapped;
    const query = search.toLowerCase();
    return mapped.filter((chat) => chat.title.toLowerCase().includes(query));
  }, [chats, search]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Chats</h2>
        {deleteError && (
          <p className="text-sm text-destructive">
            Failed to delete chat: {deleteError}
          </p>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <ChatSearch value={search} onChange={setSearch} />
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
        {view === "list" ? (
          <ChatList chats={filteredChats} loading={loading} onDelete={handleDelete} />
        ) : (
          <ChatGrid chats={filteredChats} loading={loading} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
