import { authCookies } from "@/shared/auth/cookies";
import { NextResponse } from "next/server";


export const POST = async () => {
  /**
   * 1) 기본 응답 생성
   * - 로그아웃 성공 여부만 내려주는 형태
   */
  const res = NextResponse.json({ ok: true });

  /**
   * 2) refreshToken 쿠키 삭제
   * - maxAge: 0 → 즉시 만료
   * - httpOnly → JS 접근 불가
   * - secure → 운영 환경에서만 https로 전송
   */
  authCookies.clearRefreshToken(res);


  return res;
};