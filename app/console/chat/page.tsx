"use client";

import { useState, useCallback } from "react";
import { Chat, type Message } from "@/components/console/pages/chat";

const suggestions = [
  "What is Mikav?",
  "Tell me about Kerala's culture",
  "Write a short poem in Malayalam",
  "Help me build an AI app",
];

export default function ChatPage() {
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

  const append = useCallback(
    (message: { role: "user"; content: string }) => {
      setInput(message.content);
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message.content,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
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
        setInput("");
      }, 1000);
    },
    []
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
        append={append}
        suggestions={suggestions}
        setMessages={setMessages}
      />
    </div>
  );
}
