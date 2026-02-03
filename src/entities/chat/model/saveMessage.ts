"use server";

import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";

type SaveMessageProps = {
  memberId: number;
  chatroomUuid: string;
  message: string;
  accessToken: string;
};

// 메시지를 저장 및 전송하는 함수
export const saveMessage = async ({
  memberId,
  chatroomUuid,
  message,
  accessToken
}: SaveMessageProps) => {
  const { data, error } = await serverSideOpenapiClient.POST(
    "/api/v2/internal/{memberId}/chat/{chatroomUuid}",
    {
      params: {
        path: {
          memberId,
          chatroomUuid
        }
      },
      body: {
        message
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (error) throw error;

  return data.data;
};
