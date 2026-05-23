"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function UrlCodeCleanup() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (!code) return;

    // Hit the callback route which exchanges the code, then strip the param.
    fetch(`/auth/callback?code=${encodeURIComponent(code)}`, { redirect: "manual" })
      .catch(() => undefined)
      .finally(() => {
        url.searchParams.delete("code");
        url.searchParams.delete("auth_error");
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
        router.refresh();
      });
  }, [router]);

  return null;
}
