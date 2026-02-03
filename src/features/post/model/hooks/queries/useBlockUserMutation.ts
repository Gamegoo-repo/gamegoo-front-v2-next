import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { POST_QUERYKEYS } from "@/entities/post";

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, type }: { memberId: number; type: "block" | "unblock" }) => {
      if (type === "block") {
        const { error } = await clientSideOpenapiClient.POST("/api/v2/block/{memberId}", {
          params: {
            path: {
              memberId
            }
          }
        });

        if (error) throw error;

        return;
      }

      const { error } = await clientSideOpenapiClient.DELETE("/api/v2/block/{memberId}", {
        params: {
          path: {
            memberId
          }
        }
      });

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });
    }
  });
};
