"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";

import { NoPost } from "@/entities/board/ui/NoPost";
import { POST_QUERYKEYS } from "@/entities/post";

import { BoardTable, GameMode, Mic, Pagination, Position, Tier } from "@/features/board";
import { useFetchPostListQuery } from "@/features/post";
import { useFetchProfileQuery } from "@/features/profile";

export function Board() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: userInfo, isSuccess } = useFetchProfileQuery();

  const page = normalizeSearchParam(searchParams.get("page"));
  const gameMode = searchParams.get("mode") as GameMode;
  const tier = searchParams.get("tier") as Tier;
  const mike = searchParams.get("voice") as Mic;
  const mainP = (searchParams.get("position") as Position) ?? "ANY";

  const params = { page, gameMode, tier, mike, mainP };
  const { data, isLoading } = useFetchPostListQuery(params);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: POST_QUERYKEYS.PostList
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center gap-[64px]">
      <BoardTable
        posts={data?.boards ?? []}
        isLoading={isLoading}
        userInfo={userInfo}
      />
      {data?.boards.length === 0 ? (
        <NoPost />
      ) : (
        <Pagination
          totalPages={data?.totalPages ?? 0}
          currentPage={page}
        />
      )}
    </div>
  );
}
