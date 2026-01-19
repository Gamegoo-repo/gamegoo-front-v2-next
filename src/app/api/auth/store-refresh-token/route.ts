import { setCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type StoreRefreshToken = {
  refreshToken: string;
};

/**
 * /api/auth/store-refresh-token
 *
 * Cookie에 http-only로 refreshToken을 저장하는 API
 */

export const POST = async (req: NextRequest) => {
  const { refreshToken } = (await req.json()) as StoreRefreshToken;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "refreshToken이 존재하지 않습니다. [/api/auth/store-refresh-token]" },
      { status: 401 }
    );
  }

  await setCookie("refreshToken", refreshToken, {
    cookies,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return NextResponse.json({ ok: true });
};
