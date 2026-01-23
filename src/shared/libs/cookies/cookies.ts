import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const REFRESH_TOKEN_KEY = "refreshToken";
const CSRF_TOKEN_KEY = "csrfToken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const authCookies = {
  //서버에서 쿠키 읽기 (Route Handler / Server Component)
  async getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_KEY)?.value ?? null;
  },

  //NextResponse에 refreshToken 세팅
  setRefreshToken(res: NextResponse, refreshToken: string) {
    res.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      ...cookieOptions,
    });
  },

  //refreshToken 삭제
  clearRefreshToken(res: NextResponse) {
    res.cookies.set(REFRESH_TOKEN_KEY, "", {
      ...cookieOptions,
      maxAge: 0,
    });
  },

  //CSRF 토큰 세팅 (httpOnly로 둘지 여부는 정책 선택)
  setCsrfToken(res: NextResponse, token: string,  maxAge?: number) {
    res.cookies.set(CSRF_TOKEN_KEY, token, {
      ...cookieOptions,
      maxAge,
    });
  },

  //csrfToken 읽기
  async getCsrfToken() {
    const cookieStore = await cookies();
    return cookieStore.get(CSRF_TOKEN_KEY)?.value ?? null;
  },

  //csrfToken 삭제
  clearCsrfToken(res: NextResponse) {
    res.cookies.set(CSRF_TOKEN_KEY, "", {
      ...cookieOptions,
      maxAge: 0,
    });
  },
};