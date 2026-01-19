import { setCookie } from "cookies-next/server";
import { encode } from "js-base64";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * /api/auth/login-riot
 *
 * Riot OAuth 로그인을 진행하는 API
 */

export const GET = async () => {
  const {
    RIOT_AUTH_URL,
    RIOT_CLIENT_ID,
    RIOT_REDIRECT_URI,
    RIOT_SCOPE,
    RIOT_RESPONSE_TYPE,
    NEXT_PUBLIC_APP_URL
  } = process.env;

  if (!RIOT_AUTH_URL || !RIOT_CLIENT_ID || !RIOT_REDIRECT_URI || !NEXT_PUBLIC_APP_URL) {
    return NextResponse.json({ message: "ENV 설정을 확인해 주세요." }, { status: 500 });
  }

  const csrfToken = crypto.randomUUID();

  await setCookie("csrfToken", csrfToken, {
    cookies,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키를 전송할 지 여부
    sameSite: "lax", // CSRF 공격 방어용
    path: "/" // 도메인 내에서 쿠키가 유효햔 범위
  });

  const params = new URLSearchParams({
    redirect_uri: RIOT_REDIRECT_URI,
    client_id: RIOT_CLIENT_ID,
    response_type: RIOT_RESPONSE_TYPE ?? "code",
    scope: RIOT_SCOPE ?? "openid",
    state: encode(
      JSON.stringify({
        redirect: `${NEXT_PUBLIC_APP_URL}/riot/callback`,
        csrfToken
      })
    ),
    prompt: "login"
  });

  return NextResponse.redirect(`${RIOT_AUTH_URL}?${params.toString()}`);
};
