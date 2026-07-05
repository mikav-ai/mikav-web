"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Chat", href: "/console/chat" },
  { label: "Settings", href: "/console/settings" },
  { label: "Help", href: "/console/help" },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 border-r border-gray-200 bg-gray-50">
      <div className="px-4 py-5">
        <Image
          src="/icons/app/icon-dark.png"
          alt="Mikav"
          width={120}
          height={32}
          priority
        />
      </div>
      <nav className="flex-1 px-2 space-y-1">
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
    </aside>
  );
}
