"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Plus, MessageSquare } from "lucide-react";
import { ProfileBar } from "./shared";

const navItems = [
  { label: "Chats", href: "/console/chats", icon: MessageSquare },
];

export function ConsoleSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleNewChat = () => {
    // Navigate to the empty chat composer. The chat row itself is only
    // created in Supabase once the user sends their first message.
    router.push("/console/chat");
  };

  return (
    <aside
      className={`flex flex-col shrink-0 border-r border-gray-200 bg-gray-50 transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center h-14 shrink-0 px-3 ${collapsed ? "justify-center" : ""}`}>
        {!collapsed && (
          <>
            <Image
              src="/icons/app/icon-dark.png"
              alt="Mikav"
              width={28}
              height={28}
              priority
            />
            <span className="ml-2 text-base font-semibold text-gray-900 flex-1">
              Mikav
            </span>
          </>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-2 pt-4">
        <button
          onClick={handleNewChat}
          title="New Chat"
          className={`flex items-center w-full rounded-md border border-primary bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors ${
            collapsed ? "justify-center px-2 py-2" : "gap-2 px-3 py-2"
          }`}
        >
          <Plus size={16} />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-2 pt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-md text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-2 py-2" : "gap-2 px-3 py-2"
              } ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon size={16} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Chat list area (future) */}
      <div className="flex-1 px-2 pt-2 overflow-y-auto">
        {/* Chat history items will go here */}
      </div>

      {/* Profile Bar */}
      <div className="px-2 py-3">
        <div className="rounded-md border border-gray-200 bg-white">
          <ProfileBar collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
