"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface SessionInfo {
  lastSignInAt: string | null;
  createdAt: string | null;
  emailConfirmedAt: string | null;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

export function Sessions() {
  const router = useRouter();
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (!active) return;

      setSession({
        lastSignInAt: data.user?.last_sign_in_at ?? null,
        createdAt: data.user?.created_at ?? null,
        emailConfirmedAt: data.user?.email_confirmed_at ?? null,
      });
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const handleSignOutEverywhere = async () => {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut({ scope: "global" });
      router.push("/auth/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-200 p-4">
        <p className="text-sm font-medium text-gray-900">Current session</p>
        <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <dt>Signed in</dt>
            <dd>{formatDate(session?.lastSignInAt ?? null)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Account created</dt>
            <dd>{formatDate(session?.createdAt ?? null)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Email verified</dt>
            <dd>{session?.emailConfirmedAt ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </div>

      <div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleSignOutEverywhere}
          disabled={signingOut}
        >
          {signingOut ? "Signing out..." : "Sign out of all sessions"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          This signs you out on this and any other device.
        </p>
      </div>
    </div>
  );
}
