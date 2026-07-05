"use client";

import { useState, useCallback } from "react";
import { Chat, type Message } from "@/components/console/pages/chat";

export default function ChatIdPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event?: { preventDefault?: () => void }) => {
      event?.preventDefault?.();
      if (!input.trim()) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: input.trim(),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsGenerating(true);

      // TODO: integrate with Mikav API
      setTimeout(() => {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "This is a placeholder response. Connect to the Mikav API to get real responses.",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsGenerating(false);
      }, 1000);
    },
    [input]
  );

  return (
    <div className="h-full max-w-3xl mx-auto px-4 pb-4">
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        stop={() => setIsGenerating(false)}
        setMessages={setMessages}
      />
    </div>
  );
}
