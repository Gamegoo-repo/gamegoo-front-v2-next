"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/features/auth";

/**
 * 유저가 새로고침하거나 페이지에 새로 진입했을 때 일회성으로 유저 정보를 받아서 zustand에 저장하는 provider
 */

export default function InitAuthProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, setAccessToken, authStatus, setAuthStatus, clearAuth } = useAuthStore();
  const pathname = usePathname();

  const isRiotCallback = pathname.includes("/riot/callback");

  useEffect(() => {
    if (isRiotCallback || accessToken || authStatus !== "idle") return;

    (async () => {
      // 401 에러 방지용
      const hasTokenRes = await fetch("/api/auth/has-refresh-token");
      const { hasRefreshToken } = await hasTokenRes.json();

      if (!hasRefreshToken) {
        setAuthStatus("unauthenticated");
        return;
      }

      // refreshToken이 존재하면 accessToken을 zustand에 저장
      const res = await fetch("/api/auth/refresh-access-token", {
        method: "POST"
      });

      if (!res.ok) {
        clearAuth();
        setAuthStatus("unauthenticated");
        return;
      }

      const { accessToken: newAccessToken } = await res.json();
      setAccessToken(newAccessToken);
      setAuthStatus("authenticated");
    })();
  }, [accessToken, isRiotCallback]);

  return <>{children}</>;
}
