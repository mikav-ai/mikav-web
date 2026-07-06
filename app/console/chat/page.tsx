"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { MessageInput } from "@/components/console/pages/chat/ui/message-input";
import { PromptSuggestions } from "@/components/console/pages/chat/ui/prompt-suggestions";
import { createChat, addMessage, updateChatTitle } from "@/lib/supabase/chats";

const suggestions = [
  "What is Mikav?",
  "Tell me about Kerala's culture",
  "Write a short poem in Malayalam",
  "Help me build an AI app",
];

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [webSearch, setWebSearch] = useState(false);

  const startChat = useCallback(
    async (content: string) => {
      if (isStarting) return;
      setIsStarting(true);
      try {
        const chat = await createChat(content.slice(0, 60));
        await addMessage(chat.id, "user", content);
        updateChatTitle(chat.id, content.slice(0, 60)).catch(() => {});
        router.push(
          `/console/chat/${chat.id}?pending=1${webSearch ? "&webSearch=1" : ""}`
        );
      } catch (error) {
        console.error("Failed to start chat:", error);
        setIsStarting(false);
      }
    },
    [isStarting, router, webSearch]
  );

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    if (!input.trim()) return;
    startChat(input.trim());
    setInput("");
    setFiles(null);
  };

  const append = useCallback(
    (message: { role: "user"; content: string }) => {
      startChat(message.content);
    },
    [startChat]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="mx-auto w-full max-w-3xl h-full py-4">
          <PromptSuggestions
            label="Welcome to Mikav ✨"
            append={append}
            suggestions={suggestions}
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4">
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={() => setWebSearch((v) => !v)}
            aria-pressed={webSearch}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              webSearch
                ? "border-primary bg-primary/10 text-primary"
                : "border-input text-muted-foreground hover:bg-muted"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            Search web
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <MessageInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            allowAttachments
            files={files}
            setFiles={setFiles}
            isGenerating={isStarting}
            stop={() => setIsStarting(false)}
            placeholder="Ask Mikav anything..."
          />
        </form>
      </div>
    </div>
  );
}
