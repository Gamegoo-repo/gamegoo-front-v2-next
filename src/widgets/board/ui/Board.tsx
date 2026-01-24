"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { paths } from "@/shared/api/schema";

import { RequestPostLists } from "@/entities/post/model/types/request/post.request.type";

import { BoardTable } from "@/features/board/ui/BoardTable";
import { useFetchPostListQuery } from "@/features/post/model/hooks/queries/useFetchPostListQuery";

type Base =
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"];

type GameMode = NonNullable<Base>["gameMode"];
type Tier = NonNullable<Base>["soloTier"];
type Mic = NonNullable<Base>["mike"];
type Position = NonNullable<Base>["mainP"];

export function Board() {
  const searchParams = useSearchParams();

  const params: RequestPostLists = {
    page: 1,
    gameMode: searchParams.get("mode") as GameMode,
    tier: searchParams.get("tier") as Tier,
    mike: searchParams.get("voice") as Mic,
    mainP: (searchParams.get("position") as Position) ?? "ANY"
  };
  const { data: posts, isLoading, refetch } = useFetchPostListQuery(params);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <BoardTable
      posts={posts}
      isLoading={isLoading}
    />
  );
}
