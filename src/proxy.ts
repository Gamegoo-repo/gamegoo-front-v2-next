import { type NextRequest, NextResponse } from "next/server";

/**
 * refreshToken으로 로그인하지 않은 사용자는 protected route에 진입할 수 없도록 하는 middleware
 */

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    // 현재 요청된 URL을 복제
    const url = request.nextUrl.clone();
    // 되돌아갈 라우트
    url.pathname = "/";
    // query string에 데이터 추가
    url.searchParams.append("login-required", "true");

    // url.pathname으로 리디렉션
    return NextResponse.redirect(url);
  }

  // refreshToken이 있다면 원래 가려던 페이지로 이동시킴
  return NextResponse.next();
}

// 보호할 라우트 목록
export const config = {
  matcher: ["/match/:path*", "/mypage/:path*"]
};
