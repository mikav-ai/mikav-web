"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

export function ProfileBar() {
  const router = useRouter();
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
        router.push("/console/settings/profile");
        setOpen(false);
      },
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => {
        router.push("/console/settings");
        setOpen(false);
      },
    },
    {
      label: "Help",
      icon: HelpCircle,
      onClick: () => {
        router.push("/console/help");
        setOpen(false);
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
        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
          <User size={16} />
        </div>
        <span className="flex-1 text-left truncate">User</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
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
