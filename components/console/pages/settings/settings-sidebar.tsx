"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsTabs = [
  { id: "profile", label: "Profile", href: "/console/settings/profile" },
  { id: "account", label: "Account", href: "/console/settings/account" },
  { id: "api", label: "API", href: "/console/settings/api" },
  { id: "preferences", label: "Preferences", href: "/console/settings/preferences" },
  { id: "billing", label: "Billing", href: "/console/settings/billing" },
];

interface SettingsSidebarProps {
  /** When used inside the dialog, pass the active tab id */
  activeTab?: string;
  /** When used inside the dialog, callback to switch tabs */
  onNavigate?: (id: string) => void;
}

export function SettingsSidebar({ activeTab, onNavigate }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-2">
      {settingsTabs.map((tab) => {
        const isActive = onNavigate
          ? activeTab === tab.id
          : pathname.startsWith(tab.href);

        if (onNavigate) {
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        }

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-200 text-gray-900"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
