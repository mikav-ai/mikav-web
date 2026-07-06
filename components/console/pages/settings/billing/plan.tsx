"use client";

export function Plan() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Free</p>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Current plan
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Full access to Mikav&apos;s chat, web search grounding, and chat
          history — at no cost.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Mikav is free to use. Paid plans aren&apos;t available yet.
      </p>
    </div>
  );
}
