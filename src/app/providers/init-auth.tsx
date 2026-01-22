"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth";

export default function InitAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        if (cancelled) return;
        clearAuth();
        setAuthStatus("unauthenticated");
        return;
      }

      const data: { accessToken: string } = await res.json();

      if (!data?.accessToken) {
        if (cancelled) return;
        clearAuth();
        setAuthStatus("unauthenticated");
        return;
      }

      if (cancelled) return;
      setAccessToken(data.accessToken);
      setAuthStatus("authenticated");
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isRiotCallback,
    accessToken,
    authStatus,
    setAccessToken,
    setAuthStatus,
    clearAuth,
  ]);

  return <>{children}</>;
}