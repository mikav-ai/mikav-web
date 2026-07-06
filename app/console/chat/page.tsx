import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">Chat</h2>
    </div>
  );
}
