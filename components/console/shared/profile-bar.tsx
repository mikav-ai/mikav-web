"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

interface ProfileBarProps {
  collapsed?: boolean;
}

export function ProfileBar({ collapsed = false }: ProfileBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "Profile",
      icon: User,
      onClick: () => {
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set("settings", "profile");
        router.push(`?${params.toString()}`, { scroll: false });
      },
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => {
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set("settings", "profile");
        router.push(`?${params.toString()}`, { scroll: false });
      },
    },
    {
      label: "Help",
      icon: HelpCircle,
      onClick: () => {
        setOpen(false);
        router.push("/console/help");
      },
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        setOpen(false);
        router.push("/auth/login");
      },
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center w-full rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors ${
          collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 shrink-0">
          <User size={16} />
        </div>
        {!collapsed && (
          <span className="flex-1 text-left truncate">User</span>
        )}
      </button>

      {open && (
        <div
          className={`absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[160px] ${
            collapsed
              ? "left-full bottom-0 ml-5"
              : "bottom-full left-0 mb-2 w-full"
          }`}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
