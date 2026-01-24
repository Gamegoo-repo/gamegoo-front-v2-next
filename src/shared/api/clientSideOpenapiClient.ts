import createClient from "openapi-fetch";
import type { Middleware } from "openapi-fetch";

import { useAuthStore } from "@/features/auth";
import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");
}

const REFRESH_ENDPOINT = "/api/auth/refresh";

const RETRY_HEADER_KEY = "x-auth-retry-count";
const MAX_RETRY_COUNT = 1;

let refreshPromise: Promise<string | null> | null = null;

/**
 * Authorization 자동 추가
 */
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    // 이미 Authorization이 있으면 건드리지 않음
    if (request.headers.has("Authorization")) return request;

    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) return request;

    request.headers.set("Authorization", `Bearer ${accessToken}`);
    return request;
  },
};

/**
 * refresh는 동시에 여러 번 호출되면 안 되므로 Promise 공유
 */
async function runRefreshOnce(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(REFRESH_ENDPOINT, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) return null;

        const data: { accessToken: string } = await res.json();

        if (!data?.accessToken) return null;

        useAuthStore.getState().setAccessToken(data.accessToken);
        return data.accessToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

/**
 * 401이면 refresh 후 재요청 (안전 정책 포함)
 */
const refreshMiddleware: Middleware = {
  async onResponse({ response, request }) {
    if (response.status !== 401) return response;

    // refresh 요청 자체는 무한루프 위험 → 그대로 반환
    try {
      const { pathname } = new URL(request.url);
      if (pathname === REFRESH_ENDPOINT) return response;
    } catch {
      // request.url 파싱 실패하면 안전하게 그냥 반환
      return response;
    }

    // retry limit
    const retryCount = Number(request.headers.get(RETRY_HEADER_KEY) ?? "0");
    if (retryCount >= MAX_RETRY_COUNT) {
      useAuthStore.getState().clearAuth();
      return response;
    }

    // GET/HEAD만 안전 재시도 허용
    const method = request.method.toUpperCase();
    const isSafeToRetry = method === "GET" || method === "HEAD";

    // POST/PUT은 재시도하면 사고날 수 있음 → refresh만 하고 종료
    if (!isSafeToRetry) {
      const token = await runRefreshOnce();
      if (!token) useAuthStore.getState().clearAuth();
      return response;
    }

    // refresh 후 원 요청 재시도
    const newAccessToken = await runRefreshOnce();
    if (!newAccessToken) {
      useAuthStore.getState().clearAuth();
      return response;
    }

    const retryRequest = request.clone();
    retryRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
    retryRequest.headers.set(RETRY_HEADER_KEY, String(retryCount + 1));

    return fetch(retryRequest, { credentials: "include" });
  },
};

/**
 * Client-side OpenAPI Client
 */
export const clientSideOpenapiClient = (() => {
  const client = createClient<paths>({ baseUrl: API_BASE_URL });

  client.use(authMiddleware);
  client.use(refreshMiddleware);

  return client;
})();