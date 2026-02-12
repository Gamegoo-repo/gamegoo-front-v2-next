"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { runRefreshOnce } from "@/shared/api/runRefreshOnce";

import { useAuthStore } from "@/features/auth";

export function InitAuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRiotCallback = pathname.includes("/riot/callback");

  const accessToken = useAuthStore((s) => s.accessToken);
  const authStatus = useAuthStore((s) => s.authStatus);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setAuthStatus = useAuthStore((s) => s.setAuthStatus);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (isRiotCallback) return;
    if (accessToken) return;
    if (authStatus !== "idle") return;

    let cancelled = false;

    (async () => {
      const newAccessToken = await runRefreshOnce();

      if (!newAccessToken) {
        if (cancelled) return;
        clearAuth();
        setAuthStatus("unauthenticated");
        return;
      }

      if (cancelled) return;
      setAccessToken(newAccessToken);
      setAuthStatus("authenticated");
    })();

    return () => {
      cancelled = true;
    };
  }, [isRiotCallback, accessToken, authStatus, setAccessToken, setAuthStatus, clearAuth]);

  return <>{children}</>;
}
