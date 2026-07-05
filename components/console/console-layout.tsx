"use client";

import { Suspense } from "react";
import { ConsoleHeader } from "./console-header";
import { ConsoleSidebar } from "./console-sidebar";
import { SettingsDialog } from "./pages/settings";

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 flex overflow-hidden bg-white">
        <ConsoleSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <ConsoleHeader />
          <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
        </div>
        <SettingsDialog />
      </div>
    </Suspense>
  );
}
