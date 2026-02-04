"use server";

import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";

// Chatroom의 UUID를 리턴하는 함수
export const getChatroomUuid = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });

  if (!res.ok) return;

  const accessToken = await res.json();

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
