"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MessageInput } from "@/components/console/pages/chat/ui/message-input";

export default function ChatIdPage() {
  const params = useParams<{ chatId: string }>();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    if (!input.trim()) return;
    // TODO: integrate with Mikav API
    setInput("");
    setFiles(null);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Chat: {params.chatId}</h2>
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
            placeholder="Type a message..."
          />
        </form>
      </div>
    </div>
  );
}
