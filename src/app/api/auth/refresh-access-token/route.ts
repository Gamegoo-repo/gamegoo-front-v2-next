import { getCookie, setCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { serverSideOpenapiClient } from "@/shared/api/openapiClient";

/**
 * /api/auth/refresh-access-token
 *
 * refreshToken으로 accessToken을 새로 발급받는 API
 */

export const POST = async () => {
  const refreshToken = await getCookie("refreshToken", { cookies });

  if (!refreshToken) {
    return NextResponse.json(
      { message: "refreshToken이 존재하지 않습니다. [/api/auth/refresh-access-token]" },
      { status: 401 }
    );
  }

  const { data, error } = await serverSideOpenapiClient.POST("/api/v2/auth/refresh", {
    body: {
      refreshToken
    }
  });

  if (error || !data?.data?.accessToken || !data.data.refreshToken) {
    return NextResponse.json(
      { message: "refreshToken이 유효하지 않습니다. [/api/auth-refresh-access-token]" },
      { status: 401 }
    );
  }

  await setCookie("refreshToken", data.data?.refreshToken, {
    cookies,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return NextResponse.json({ accessToken: data.data?.accessToken });
};
