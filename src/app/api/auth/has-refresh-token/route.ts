import { hasCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * /api/auth/has-refresh-token
 *
 * refreshToken이 존재하는지 확인하는 API
 */
export async function GET() {
  const hasRefreshToken = await hasCookie("refreshToken", { cookies });

  return NextResponse.json({ hasRefreshToken });
}
