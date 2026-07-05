"use client";

import { Suspense } from "react";
import { ConsoleHeader } from "./console-header";
import { ConsoleSidebar } from "./console-sidebar";
import { SettingsDialog } from "./pages/settings";

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="flex h-full min-h-screen">
        <ConsoleSidebar />
        <div className="flex flex-col flex-1">
          <ConsoleHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
        <SettingsDialog />
      </div>
    </Suspense>
  );
}
