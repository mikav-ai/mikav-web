"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import { MessageInput } from "@/components/console/pages/chat/ui/message-input";
import { MessageList } from "@/components/console/pages/chat/ui/message-list";
import { PromptSuggestions } from "@/components/console/pages/chat/ui/prompt-suggestions";
import type { Message } from "@/components/console/pages/chat/ui/chat-message";
import {
  getChat,
  listMessages,
  addMessage,
  updateChatTitle,
} from "@/lib/supabase/chats";

const suggestions = [
  "What is Mikav?",
  "Tell me about Kerala's culture",
  "Write a short poem in Malayalam",
  "Help me build an AI app",
];

export default function ChatIdPage() {
  const params = useParams<{ chatId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = params.chatId;

  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [webSearch, setWebSearch] = useState(
    () => searchParams.get("webSearch") === "1"
  );

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      try {
        const chat = await getChat(chatId);
        if (!chat) {
          if (active) setNotFound(true);
          return;
        }

        const rows = await listMessages(chatId);
        if (!active) return;

        const loaded: Message[] = rows.map((row) => ({
          id: row.id,
          role: row.role,
          content: row.content,
          createdAt: new Date(row.created_at),
        }));

        setMessages(loaded);
        setLoading(false);

        // If the chat was just created with a pending first user message
        // (no assistant reply yet), generate the response now.
        const last = loaded.at(-1);
        if (last?.role === "user") {
          setIsGenerating(true);
          try {
            const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messages: loaded.map((m) => ({
                  role: m.role,
                  content: m.content,
                })),
                webSearch,
              }),
            });
            const data = await res.json();
            const assistantContent = res.ok
              ? data.content || "No response received."
              : `Error: ${data.error || "Something went wrong."}`;

            if (!active) return;
            setMessages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: assistantContent,
                createdAt: new Date(),
              },
            ]);

            if (res.ok) {
              await addMessage(chatId, "assistant", assistantContent);
            }
          } catch {
            if (active) {
              setMessages((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: "Failed to reach Mikav. Please try again.",
                  createdAt: new Date(),
                },
              ]);
            }
          } finally {
            if (active) setIsGenerating(false);
          }
        }
        return;
      } catch (error) {
        console.error("Failed to load chat:", error);
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [chatId]);

  const respond = useCallback(
    async (content: string) => {
      const isFirstMessage = messages.length === 0;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: new Date(),
      };

      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsGenerating(true);

      try {
        await addMessage(chatId, "user", content);

        if (isFirstMessage) {
          const title = content.slice(0, 60);
          updateChatTitle(chatId, title).catch(() => {});
        }

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            webSearch,
          }),
        });

        const data = await res.json();
        const assistantContent = res.ok
          ? data.content || "No response received."
          : `Error: ${data.error || "Something went wrong."}`;

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: assistantContent,
            createdAt: new Date(),
          },
        ]);

        if (res.ok) {
          await addMessage(chatId, "assistant", assistantContent);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Failed to reach Mikav. Please try again.",
            createdAt: new Date(),
          },
        ]);
      } finally {
        setIsGenerating(false);
      }
    },
    [chatId, messages]
  );

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    if (!input.trim()) return;
    respond(input.trim());
    setInput("");
    setFiles(null);
  };

  const append = useCallback(
    (message: { role: "user"; content: string }) => {
      respond(message.content);
    },
    [respond]
  );

  if (loading) {
    return <div className="flex h-full items-center justify-center" />;
  }

  if (notFound) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Chat not found</h2>
        <p className="text-sm text-gray-500">
          This chat doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <button
          onClick={() => router.push("/console/chats")}
          className="text-sm text-primary hover:underline"
        >
          Back to Chats
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="mx-auto w-full max-w-3xl h-full py-4">
          {messages.length === 0 ? (
            <PromptSuggestions
              label="Welcome to Mikav ✨"
              append={append}
              suggestions={suggestions}
            />
          ) : (
            <MessageList messages={messages} isTyping={isGenerating} />
          )}
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
            isGenerating={isGenerating}
            stop={() => setIsGenerating(false)}
            placeholder="Type a message..."
          />
        </form>
      </div>
    </div>
  );
}
