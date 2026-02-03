import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

import { POST_QUERYKEYS } from "@/entities/post";
import { POST_DETAIL_QUERY_KEYS } from "@/entities/post/constants/postDetail.queryKeys";

import { PostBody } from "@/features/board";

export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async ({ body, boardId }: { body: PostBody; boardId: number }) => {
      const { error } = await clientSideOpenapiClient.PUT("/api/v2/posts/{boardId}", {
        params: {
          path: {
            boardId: Number(boardId)
          }
        },
        body
      });

      if (error) throw error;
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: POST_DETAIL_QUERY_KEYS.detail(vars.boardId.toString())
      });
      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });

      router.replace(`/board/?page=${searchParams.get("page")}`);
      toastMessage.success("게시물이 수정되었습니다.");
    }
  });
};
