"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types/database";
import { signOut as signOutAction } from "@/app/actions/auth";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Single supabase client instance for this provider.
  const supabase = React.useMemo(() => createClient(), []);

  const loadProfile = React.useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) {
        console.error("loadProfile error", error);
        return null;
      }
      return (data as Profile | null) ?? null;
    },
    [supabase],
  );

  const refresh = React.useCallback(async () => {
    const {
      data: { user: u },
    } = await supabase.auth.getUser();
    setUser(u);
    if (u) {
      const p = await loadProfile(u.id);
      setProfile(p);
    } else {
      setProfile(null);
    }
    setLoading(false);
  }, [supabase, loadProfile]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      await refresh();
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const p = await loadProfile(u.id);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [supabase, refresh, loadProfile]);

  const signOut = React.useCallback(async () => {
    // Server action handles cookie clearing + revalidation.
    await signOutAction();
    // Also clear local supabase session in case the user has stale tokens.
    await supabase.auth.signOut().catch(() => undefined);
    setUser(null);
    setProfile(null);
    // Force Next.js to re-fetch server components so any cached auth state
    // (e.g. the navbar pre-rendered with the previous user) is invalidated.
    router.refresh();
  }, [supabase, router]);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, profile, loading, signOut, refresh }),
    [user, profile, loading, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
