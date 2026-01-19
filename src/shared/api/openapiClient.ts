import createClient from "openapi-fetch";
import { Middleware } from "openapi-fetch";

import { useAuthStore } from "@/features/auth";

import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Authorization을 추가하는 middleware
 */
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = useAuthStore.getState().accessToken;

    if (request.headers.has("Authorization")) {
      return request;
    }

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return request;
  }
};

let refreshPromise: Promise<string | null> | null = null; // Promise 대기열

/**
 * 요청에 401이 포함되면 accessToken을 새로 발급받는 middleware
 */
const refreshMiddleware: Middleware = {
  async onResponse({ response, request }) {
    if (response.status !== 401) return response;

    // refresh 대기열이 비어있을 경우 코드 시작
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          // 새로운 accessToken 발급
          const res = await fetch("/api/auth/refresh-access-token", {
            method: "POST",
            credentials: "include"
          });

          if (!res.ok) return null;

          const data: { accessToken: string } = await res.json();

          // 새로운 accessToken을 zustand에 저장
          useAuthStore.getState().setAccessToken(data.accessToken);

          return data.accessToken;
        } catch {
          return null;
        }
      })();
    }

    const newAccessToken = await refreshPromise;

    // 대기열 비움
    refreshPromise = null;

    // refresh 실패 -> 로그아웃 및 재시도 중단
    if (!newAccessToken) {
      useAuthStore.getState().clearAuth();
      return response;
    }

    // refresh 성공
    // 원래 요청에 새로운 accessToken을 붙여 요청 재시도
    // refresh 객체는 한 번 소비되면 재사용 불가하므로 clone() 사용
    const retryRequest = request.clone();
    retryRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

    return fetch(retryRequest);
  }
};

/**
 * Client side API client를 생성하는 함수
 */
export const clientSideOpenapiClient = (() => {
  const client = createClient<paths>({ baseUrl: API_BASE_URL });

  client.use(authMiddleware);
  client.use(refreshMiddleware);

  return client;
})();

/**
 * Server side API client를 생성하는 함수
 */
export const serverSideOpenapiClient = createClient<paths>({
  baseUrl: API_BASE_URL
});
