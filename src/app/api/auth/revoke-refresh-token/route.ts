import { deleteCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  await deleteCookie("refreshToken", { cookies });

  return NextResponse.json({ ok: true });
};
