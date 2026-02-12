import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

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

    onSuccess: (_, variables) => {
      if (variables.type === "block") toastMessage.success("차단되었습니다.");
      if (variables.type === "unblock") toastMessage.success("차단을 해제했습니다.");

      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });
    }
  });
};
