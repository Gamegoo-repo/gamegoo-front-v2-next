"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/features/auth";

export function RiotCallbackPage() {
  const { setAccessToken, setAuthStatus } = useAuthStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (status === "NEED_SIGNUP" || !refreshToken) {
      // FIX: 약관 라우트 찾아서 수정
      router.replace("/terms");
      return;
    }

    setAccessToken(accessToken);
    setAuthStatus("authenticated");

    // http-only cookie에 refreshToken이 저장되면 / 라우트로 이동
    fetch("/api/auth/store-refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    }).finally(() => router.replace("/"));
  }, [router, searchParams, setAccessToken]);

  return null;
}
