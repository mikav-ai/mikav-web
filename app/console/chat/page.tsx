"use client";

import { useState, useCallback } from "react";
import { MessageInput } from "@/components/console/pages/chat/ui/message-input";
import { MessageList } from "@/components/console/pages/chat/ui/message-list";
import { PromptSuggestions } from "@/components/console/pages/chat/ui/prompt-suggestions";
import type { Message } from "@/components/console/pages/chat/ui/chat-message";

const suggestions = [
  "What is Mikav?",
  "Tell me about Kerala's culture",
  "Write a short poem in Malayalam",
  "Help me build an AI app",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const respond = useCallback((content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    // TODO: integrate with Mikav API
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "This is a placeholder response. Connect to the Mikav API to get real responses.",
          createdAt: new Date(),
        },
      ]);
      setIsGenerating(false);
    }, 1000);
  }, []);

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
        <form onSubmit={handleSubmit}>
          <MessageInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            allowAttachments
            files={files}
            setFiles={setFiles}
            isGenerating={isGenerating}
            stop={() => setIsGenerating(false)}
            placeholder="Ask Mikav anything..."
          />
        </form>
      </div>
    </div>
  );
}
