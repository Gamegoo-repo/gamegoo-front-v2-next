import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { CHAT_HISTORY_QUERY_KEYS, CHAT_LIST_QUERY_KEYS } from "@/entities/chat";

export const useExitChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatroomUuid }: { chatroomUuid: string }) => {
      const { error } = await clientSideOpenapiClient.PATCH("/api/v2/chat/{chatroomUuid}/exit", {
        params: {
          path: {
            chatroomUuid
          }
        }
      });

      if (error) throw error;
    },

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: CHAT_HISTORY_QUERY_KEYS.uuid(variables.chatroomUuid)
      });
      queryClient.invalidateQueries({
        queryKey: CHAT_LIST_QUERY_KEYS.all
      });
    }
  });
};
