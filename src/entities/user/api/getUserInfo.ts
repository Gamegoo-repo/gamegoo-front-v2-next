"use server";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";


export const getUserInfo = async () => {
  const refreshToken = await getCookie("refreshToken", { cookies });

  if (!refreshToken) throw new Error("refreshToken이 존재하지 않습니다.");

  const { data, error } = await clientSideOpenapiClient.GET("/api/v2/profile", {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  if (error) throw new Error("인증에 실패했습니다.");

  return data.data;
};
