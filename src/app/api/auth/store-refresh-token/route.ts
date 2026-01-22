import { authCookies } from "@/shared/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { refreshToken?: string };
  const refreshToken = body?.refreshToken;

  if (!refreshToken) {
    return NextResponse.json({ message: "refreshToken not found" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  authCookies.setRefreshToken(res, refreshToken);

  return res;
}