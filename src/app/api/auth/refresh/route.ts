import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";
import { authCookies } from "@/shared/libs/cookies/cookies";
import { NextResponse } from "next/server";

const REFRESH_TOKEN_KEY = "refreshToken";

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const POST = async () => {
  /**
   * 1) 쿠키에서 refreshToken 읽기 (await 필수)
   */
  const refreshToken = await authCookies.getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json(
      { message: "refreshToken not found" },
      { status: 401 }
    );
  }

  /**
   * 2) refresh API 호출
   */
  const { data, error } = await serverSideOpenapiClient.POST(
    "/api/v2/auth/refresh",
    {
      body: { refreshToken },
    }
  );

  const nextAccessToken = data?.data?.accessToken;
  const nextRefreshToken = data?.data?.refreshToken;

  /**
   * 3) refresh 실패 시: 쿠키 제거 후 401 반환
   */
  if (error || !nextAccessToken || !nextRefreshToken) {
    const res = NextResponse.json(
      { message: "refreshToken invalid" },
      { status: 401 }
    );

    authCookies.clearRefreshToken(res);

    return res;
  }

  /**
   * 4) refresh 성공 시: refreshToken 갱신 + accessToken 응답
   */
  const res = NextResponse.json({ accessToken: nextAccessToken });

  authCookies.setRefreshToken(res, nextRefreshToken);


  return res;
};