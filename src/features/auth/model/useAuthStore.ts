import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthStatus = "idle" | "authenticated" | "unauthenticated";

type AuthStore = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;

  authStatus: AuthStatus;
  setAuthStatus: (authStatus: AuthStatus) => void;

  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  // FIX: 디버깅용
  devtools((set) => ({
    accessToken: null,
    setAccessToken: (accessToken) => set({ accessToken }),

    authStatus: "idle",
    setAuthStatus: (authStatus) => set({ authStatus }),

    clearAuth: () => set({ accessToken: null, authStatus: "unauthenticated" })
  }))
);
