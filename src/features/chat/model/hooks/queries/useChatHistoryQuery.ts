import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { CHAT_HISTORY_QUERY_KEYS, ChatHistory } from "@/entities/chat";

export const useChatHistoryQuery = (chatroomUuid: string) => {
  return useQuery<ChatHistory>({
    queryKey: CHAT_HISTORY_QUERY_KEYS.uuid(chatroomUuid),
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET(
        "/api/v2/chat/{chatroomUuid}/messages",
        {
          params: {
            path: {
              chatroomUuid
            }
          }
        }
      );

      if (error) throw error;
      if (!data.data) throw new Error("채팅 기록이 존재하지 않습니다.");

      return data.data;
    }
  });
};
