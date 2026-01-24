import { authCookies } from "@/shared/libs/cookies/cookies";
import { encode } from "js-base64";
import { NextResponse } from "next/server";

const CSRF_TOKEN_KEY = "csrfToken";

// CSRF 토큰은 짧게(예: 10분)만 유효하게 두는 걸 추천
const CSRF_MAX_AGE_SECONDS = 60 * 10;

export const GET = async () => {
  /**
   * 1) ENV 로드 + 필수값 검증
   */
  const {
    RIOT_AUTH_URL,
    RIOT_CLIENT_ID,
    RIOT_REDIRECT_URI,
    RIOT_SCOPE,
    RIOT_RESPONSE_TYPE,
    NEXT_PUBLIC_APP_URL,
  } = process.env;

  if (
    !RIOT_AUTH_URL ||
    !RIOT_CLIENT_ID ||
    !RIOT_REDIRECT_URI ||
    !NEXT_PUBLIC_APP_URL
  ) {
    return NextResponse.json(
      { message: "ENV 설정을 확인해 주세요." },
      { status: 500 }
    );
  }

  /**
   * 2) CSRF 토큰 생성
   * - callback에서 state 내부 csrfToken과 쿠키 csrfToken이 일치하는지 검증 용도
   */
  const csrfToken = crypto.randomUUID();

  /**
   * 3) OAuth Authorization 요청 파라미터 구성
   */
  const params = new URLSearchParams({
    redirect_uri: RIOT_REDIRECT_URI,
    client_id: RIOT_CLIENT_ID,
    response_type: RIOT_RESPONSE_TYPE ?? "code",
    scope: RIOT_SCOPE ?? "openid",
    state: encode(
      JSON.stringify({
        redirect: `${NEXT_PUBLIC_APP_URL}/riot/callback`,
        csrfToken,
      })
    ),
    // 필요할 때만 강제 로그인 권장 (원하는 정책이면 유지)
    prompt: "login",
  });

  /**
   * 4) Riot 인증 페이지로 리다이렉트 응답 생성
   */
  const redirectUrl = `${RIOT_AUTH_URL}?${params.toString()}`;
  const res = NextResponse.redirect(redirectUrl);

  /**
   * 5) CSRF 쿠키 저장
   * - httpOnly: JS 접근 불가 (XSS 방어)
   * - sameSite=lax: OAuth redirect 플로우에서 동작 가능
   * - maxAge: 짧게 만료 (재사용/탈취 리스크 완화)
   */
   authCookies.setCsrfToken(res, csrfToken, CSRF_MAX_AGE_SECONDS);


  return res;
};