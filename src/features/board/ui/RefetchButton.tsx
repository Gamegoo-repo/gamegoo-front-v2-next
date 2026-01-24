"use client";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

import { POST_QUERYKEYS } from "@/entities/post/constants/post.queryKeys";

export function RefetchButton() {
  const queryClient = useQueryClient();

  return (
    <button
      className="p-1!"
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: [POST_QUERYKEYS.PostList, { page: 1 }]
        })
      }
    >
      <RefreshCcw className="size-8" />
    </button>
  );
}
