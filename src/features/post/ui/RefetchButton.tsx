"use client";

import { POST_QUERYKEYS } from "@/entities/post/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";


export function RefetchButton() {
  const queryClient = useQueryClient();

  return (
    <button
      className="p-1!"
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: [POST_QUERYKEYS.PostList, {page:1}]
        })
      }
    >
      <RefreshCcw className="size-8" />
    </button>
  );
}
