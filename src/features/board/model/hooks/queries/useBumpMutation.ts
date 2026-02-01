import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";
import { toastMessage } from "@/shared/model";

import { POST_QUERYKEYS } from "@/entities/post";

import { useAuthStore } from "@/features/auth";

export const useBumpMutation = ({ loginRequired }: { loginRequired: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const authStatus = useAuthStore.getState().authStatus;

      if (authStatus !== "authenticated") throw new Error("LOGIN_REQUIRED");

      const { error } = await clientSideOpenapiClient.POST("/api/v2/posts/my/latest/bump");

      if (error) throw new Error("BUMP_FAILED");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });

      toastMessage.success("ㅇㅋ");
    },
    onError: (err: Error) => {
      if (err.message === "LOGIN_REQUIRED") {
        loginRequired();
        return;
      }

      toastMessage.error("기다려");
    }
  });
};
