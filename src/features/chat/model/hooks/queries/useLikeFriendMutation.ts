import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { FRIEND_LIST_QUERY_KEYS } from "@/entities/chat";

export const useLikeFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId }: { memberId: number }) => {
      const { data, error } = await clientSideOpenapiClient.PATCH(
        "/api/v2/friend/{memberId}/star",
        {
          params: {
            path: {
              memberId
            }
          }
        }
      );

      if (error) throw error;

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FRIEND_LIST_QUERY_KEYS.all
      });
    }
  });
};
