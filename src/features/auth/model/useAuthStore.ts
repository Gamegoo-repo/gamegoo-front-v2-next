import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthStatus = "idle" | "authenticated" | "unauthenticated";

type AuthStore = {
  accessToken: string | null;
  authStatus: AuthStatus;

  setAccessToken: (token: string | null) => void;
  setAuthStatus: (status: AuthStatus) => void;

  login: (token: string) => void;
  logout: () => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    authStatus: "idle",

    setAccessToken: (token) =>
      set({
        accessToken: token,
        authStatus: token ? "authenticated" : "unauthenticated",
      }),

    setAuthStatus: (status) => set({ authStatus: status }),

    login: (token) =>
      set({
        accessToken: token,
        authStatus: "authenticated",
      }),

    logout: () =>
      set({
        accessToken: null,
        authStatus: "unauthenticated",
      }),

    clearAuth: () =>
      set({
        accessToken: null,
        authStatus: "unauthenticated",
      }),
  }))
);