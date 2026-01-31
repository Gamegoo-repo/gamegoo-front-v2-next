import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { PostDetail } from "@/entities/post";
import { POST_DETAIL_QUERY_KEYS } from "@/entities/post/constants/postDetail.queryKeys";

export const usePostDetailQuery = (boardId?: string, initialData?: PostDetail) => {
  return useQuery<PostDetail>({
    queryKey: POST_DETAIL_QUERY_KEYS.detail(boardId!),
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/posts/list/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        }
      });

      if (error) throw error;

      return data.data;
    },
    initialData,
    enabled: !!boardId
  });
};
