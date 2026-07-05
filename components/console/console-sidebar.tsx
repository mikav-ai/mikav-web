"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileBar } from "./shared";

const navItems = [
  { label: "Chat", href: "/console/chat" },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 border-r border-gray-200 bg-gray-50">
      <div className="flex items-center h-14 px-4 border-b border-gray-200">
        <Image
          src="/icons/app/icon-dark.png"
          alt="Mikav"
          width={28}
          height={28}
          priority
        />
        <span className="ml-2 text-base font-semibold text-gray-900">Mikav</span>
      </div>
      <nav className="flex-1 px-2 pt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-3 border-t border-gray-200">
        <ProfileBar />
      </div>
    </aside>
  );
}
