import { useAuthStore } from "@/features/auth";

const REFRESH_ENDPOINT = "/api/auth/refresh";
const RETRY_DELAY_MS = 200;
const RETRY_MESSAGE = "refreshToken not found";

let refreshPromise: Promise<string | null> | null = null;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type RefreshResult =
  | { ok: true; accessToken: string }
  | { ok: false; status: number; message?: string };

async function requestRefresh(): Promise<RefreshResult> {
  const res = await fetch(REFRESH_ENDPOINT, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await safeReadMessage(res);
    return { ok: false, status: res.status, message };
  }

  const data: { accessToken?: string } = await res.json();
  if (!data?.accessToken) {
    return { ok: false, status: 200, message: "accessToken missing" };
  }

  return { ok: true, accessToken: data.accessToken };
}

async function safeReadMessage(res: Response): Promise<string | undefined> {
  try {
    const json = await res.json();
    return json?.message;
  } catch {
    return undefined;
  }
}

function shouldRetryRefresh(result: RefreshResult) {
  return (
    !result.ok &&
    result.status === 401 &&
    result.message === RETRY_MESSAGE
  );
}

function applyAccessToken(accessToken: string) {
  useAuthStore.getState().setAccessToken(accessToken);
}

export async function runRefreshOnce(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      // 1차 시도
      const first = await requestRefresh();

      if (first.ok) {
        applyAccessToken(first.accessToken);
        return first.accessToken;
      }

      // 특정 케이스에서만 1회 재시도
      if (!shouldRetryRefresh(first)) return null;

      await wait(RETRY_DELAY_MS);

      const second = await requestRefresh();
      if (!second.ok) return null;

      applyAccessToken(second.accessToken);
      return second.accessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}