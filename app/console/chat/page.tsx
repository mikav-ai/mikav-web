"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageInput } from "@/components/console/pages/chat/ui/message-input";
import { PromptSuggestions } from "@/components/console/pages/chat/ui/prompt-suggestions";
import {
  createChat,
  addMessage,
  updateChatTitle,
  getErrorMessage,
} from "@/lib/supabase/chats";

const suggestions = [
  "Curious about Kathakali?",
  "Ask about Onam.",
  "Know any Kerala folk tales?",
  "Malayalam or English — your call.",
  "What's on your mind about Kerala?",
  "Ask about Mohiniyattam.",
  "Know Kerala's temple festivals?",
  "Curious about backwater traditions?",
  "Ask about a Malayalam poet.",
  "What's a Kerala tale you love?",
];

const welcomeLabels = [
  "Welcome to Mikav",
  "Namaskaram, what's on your mind?",
  "Hey there, let's talk Kerala",
  "Good to see you",
  "What are you exploring today?",
];

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const startChat = useCallback(
    async (content: string) => {
      if (isStarting) return;
      setIsStarting(true);
      try {
        const chat = await createChat(content.slice(0, 60));
        await addMessage(chat.id, "user", content);
        updateChatTitle(chat.id, content.slice(0, 60)).catch(() => {});
        router.push(`/console/chat/${chat.id}?pending=1`);
      } catch (error) {
        console.error("Failed to start chat:", getErrorMessage(error));
        setIsStarting(false);
      }
    },
    [isStarting, router]
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
            labels={welcomeLabels}
            append={append}
            suggestions={suggestions}
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4">
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
