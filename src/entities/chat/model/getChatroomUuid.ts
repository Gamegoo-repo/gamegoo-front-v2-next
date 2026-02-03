"use server";

import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";

// Chatroom의 UUID를 리턴하는 함수
export const getChatroomUuid = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });

  // const accessToken = await res.json();
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MjcwLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzcwMTAyMDI2LCJleHAiOjE3NzAxMDI2MjZ9.qLHjOx0zdDxGHQ8aj_0xpyDMD_69_gw2Kl0LxEhLExE";

  const { data, error } = await serverSideOpenapiClient.GET("/api/v2/chatroom", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (error || !data.data) {
    console.error(error);
    return;
  }

  return data.data?.chatroomResponseList.map((v) => v.uuid);
};
