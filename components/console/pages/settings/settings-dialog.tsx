"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SettingsSidebar } from "./settings-sidebar";

const settingsPages: Record<string, { title: string }> = {
  profile: { title: "Profile" },
  account: { title: "Account" },
  api: { title: "API" },
  preferences: { title: "Preferences" },
  billing: { title: "Billing" },
};

export function SettingsDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const settingsParam = searchParams.get("settings");

  useEffect(() => {
    setOpen(!!settingsParam);
  }, [settingsParam]);

  const handleClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("settings");
    const query = params.toString();
    router.push(window.location.pathname + (query ? `?${query}` : ""), {
      scroll: false,
    });
  }, [router, searchParams]);

  const handleNavigate = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("settings", id);
      const query = params.toString();
      router.push(window.location.pathname + `?${query}`, { scroll: false });
    },
    [router, searchParams]
  );

  if (!open) return null;

  const activeTab = settingsParam || "profile";
  const pageTitle = settingsPages[activeTab]?.title || "Settings";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-3xl h-[80vh] bg-white rounded-lg shadow-xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 bg-gray-50 py-4">
          <SettingsSidebar
            activeTab={activeTab}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {pageTitle}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-base font-medium text-gray-900">{pageTitle}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
