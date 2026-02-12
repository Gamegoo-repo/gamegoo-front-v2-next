import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { CHAT_LIST_QUERY_KEYS } from "@/entities/chat";

import { useChatStore } from "@/features/chat/model/store/chat.store";

export const useStartChatMutation = () => {
  const queryClient = useQueryClient();
  const setUuid = useChatStore((s) => s.setUuid);
  const setData = useChatStore((s) => s.setData);
  const setStatus = useChatStore((s) => s.setStatus);

  return useMutation({
    mutationFn: async ({ memberId }: { memberId: number }) => {
      const { data, error } = await clientSideOpenapiClient.GET(
        "/api/v2/chat/start/member/{memberId}",
        {
          params: {
            path: {
              memberId
            }
          }
        }
      );

      if (error) throw error;
      if (!data.data) throw new Error("채팅 시작 API에서 오류가 발생했습니다.");

      return data.data;
    },

    onSuccess: (data) => {
      setUuid(data.uuid);
      setData(data);
      setStatus("ACTIVE");

      queryClient.invalidateQueries({
        queryKey: CHAT_LIST_QUERY_KEYS.all
      });
    }
  });
};
