"use client";

import { ConsoleHeader } from "./console-header";
import { ConsoleSidebar } from "./console-sidebar";

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen">
      <ConsoleSidebar />
      <div className="flex flex-col flex-1">
        <ConsoleHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
