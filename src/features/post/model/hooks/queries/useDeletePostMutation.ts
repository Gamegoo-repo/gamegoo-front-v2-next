import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { POST_QUERYKEYS } from "@/entities/post/constants/post.queryKeys";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (boardId: number) => {
      const { error } = await clientSideOpenapiClient.DELETE("/api/v2/posts/{boardId}", {
        params: { path: { boardId } }
      });

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERYKEYS.PostList]
      });
    }
  });
};
