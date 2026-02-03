import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

import { POST_QUERYKEYS } from "@/entities/post";

import { PostBody } from "@/features/board";

export const usePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async ({ body }: { body: PostBody }) => {
      const { error } = await clientSideOpenapiClient.POST("/api/v2/posts", { body });

      if (error) throw error;
    },

    onSuccess: () => {
      toastMessage.success("게시물이 작성되었습니다.");
      router.replace(`/board/?page=${searchParams.get("page")}`);

      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });
    },

    onError: () => {
      toastMessage.error("이미 존재하는 글입니다.");
    }
  });
};
