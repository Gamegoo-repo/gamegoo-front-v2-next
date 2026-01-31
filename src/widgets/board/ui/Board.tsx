"use client";

import { useSearchParams } from "next/navigation";

import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";

import { BoardTable, GameMode, Mic, Pagination, Position, Tier } from "@/features/board";
import { useFetchPostListQuery } from "@/features/post";

export function Board() {
  const searchParams = useSearchParams();

  const page = normalizeSearchParam(searchParams.get("page"));
  const gameMode = searchParams.get("mode") as GameMode;
  const tier = searchParams.get("tier") as Tier;
  const mike = searchParams.get("voice") as Mic;
  const mainP = (searchParams.get("position") as Position) ?? "ANY";

  const { data, isFetching } = useFetchPostListQuery({
    page,
    gameMode,
    tier,
    mike,
    mainP
  });

  return (
    <div className="flex flex-col items-center gap-[64px]">
      <BoardTable
        posts={data?.boards ?? []}
        isFetching={isFetching}
      />
      <Pagination
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
      />
    </div>
  );
}
