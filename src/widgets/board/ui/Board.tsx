"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { RequestPostLists } from "@/entities/post/model/types/request/post.request.type";

import { GameMode, Mic, Pagination, Position, Tier } from "@/features/board";
import { BoardTable } from "@/features/board/ui/BoardTable";
import { useFetchPostListQuery } from "@/features/post/model/hooks/queries/useFetchPostListQuery";

export function Board() {
  const searchParams = useSearchParams();

  const params: RequestPostLists = {
    page: Number(searchParams.get("page")),
    gameMode: searchParams.get("mode") as GameMode,
    tier: searchParams.get("tier") as Tier,
    mike: searchParams.get("voice") as Mic,
    mainP: (searchParams.get("position") as Position) ?? "ANY"
  };
  const { data: posts, refetch } = useFetchPostListQuery(params);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <div className="flex flex-col items-center gap-[64px]">
      <BoardTable posts={posts} />
      <Pagination />
    </div>
  );
}
