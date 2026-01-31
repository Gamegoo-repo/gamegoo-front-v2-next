"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";

import { POST_QUERYKEYS } from "@/entities/post";

import { Header } from "@/widgets/board";

export function HeaderContainer() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: [POST_QUERYKEYS.PostList, { page: normalizeSearchParam(searchParams.get("page")) }]
    });
  };

  return <Header refetch={refetch} />;
}
