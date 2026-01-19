import { deleteCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  await deleteCookie("refreshToken", {
    cookies,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return NextResponse.json({ ok: true });
};
