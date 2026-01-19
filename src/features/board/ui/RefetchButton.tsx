"use client";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

import { postKeys } from "@/entities/post/model/postKeys";

export function RefetchButton() {
  const queryClient = useQueryClient();

  return (
    <button
      className="p-1!"
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: postKeys.list(1)
        })
      }
    >
      <RefreshCcw className="size-8" />
    </button>
  );
}
