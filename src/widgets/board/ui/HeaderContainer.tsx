"use client";

import { useQueryClient } from "@tanstack/react-query";

import { POST_QUERYKEYS } from "@/entities/post";

import { Header } from "@/widgets/board";

export function HeaderContainer() {
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: POST_QUERYKEYS.PostList
    });
  };

  return <Header refetch={refetch} />;
}
