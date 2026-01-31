"use client";

import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { POSITION_ICONS, TIER_ICONS } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";
import { formatTime } from "@/shared/libs/date/formatTime";
import { characters, toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/shared/ui/table";

import { useDeletePostMutation, useFetchPostListQuery } from "@/features/post";
import { useFetchProfileQuery } from "@/features/profile";

import { PostList } from "../../../entities/post/model/types/response/post.response.type";

export function BoardTable({ posts }: { posts: PostList }) {
  const { data: userInfo } = useFetchProfileQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deletePost = useDeletePostMutation();
  const { isFetching } = useFetchPostListQuery({ page: Number(searchParams.get("page")) });

  return (
    <Table className="table-fixed">
      <TableCaption className="sr-only">게시물 목록</TableCaption>

      <TableHeader className="sticky top-0 z-10">
        <TableRow className="bold-14 bg-gray-800 text-white *:text-center">
          {/* FIX: 내맘대로 나눔 나중에 수정 */}
          <TableHead className="w-[220px] rounded-l-[8px] text-start!">소환사</TableHead>
          <TableHead className="w-[52px]">매너 레벨</TableHead>
          <TableHead className="w-[64px]">티어</TableHead>
          <TableHead className="w-[69px]">주/부 포지션</TableHead>
          <TableHead className="w-[92px]">내가 찾는 포지션</TableHead>
          <TableHead className="w-[160px]">최근 선호 챔피언</TableHead>
          <TableHead className="w-[80px]">승률</TableHead>
          <TableHead className="w-[156px]">한마디</TableHead>
          <TableHead className={cn("w-[80px] rounded-r-[8px]", userInfo && "text-start!")}>
            등록일시
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts && !isFetching ? (
          posts.boards.map((v) => {
            const ProfileIcon = characters[v.profileImage - 1];
            const SoloTierIcon = TIER_ICONS[v.soloTier];
            const MainPositionIcon = POSITION_ICONS[v.mainP];
            const SubPositionIcon = POSITION_ICONS[v.subP];
            const WantMainPosition = POSITION_ICONS[v.wantP[0]];
            const WantSubPosition = POSITION_ICONS[v.wantP[1]];

            if (v.memberId === userInfo?.id) console.log("!");

            return (
              <TableRow
                key={`${v.boardId}-${v.memberId.toString()}`}
                className="group *:border-b *:border-b-gray-300 *:py-[19px] hover:bg-gray-200"
                onClick={() => {
                  router.push(`/board/${v.boardId}?page=${searchParams.get("page")}`);
                }}
              >
                {/* 소환사 */}
                <TableCell>
                  <div className="flex gap-[8px]">
                    <div
                      className="flex size-[40px] items-center justify-center rounded-full
bg-violet-200 p-1"
                    >
                      <ProfileIcon />
                    </div>
                    <div>
                      <p className="semibold-16">{v.gameName}</p>
                      <div className="flex items-center gap-2">
                        <p className="regular-13 text-gray-600">#{v.tag}</p>
                        <Button
                          className="hidden h-[18px]! w-fit border border-gray-400 bg-gray-200 px-1
text-xs group-hover:flex"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(`${v.gameName}#${v.tag}`);
                            toastMessage.success("소환사명이 복사되었습니다.");
                          }}
                        >
                          복사
                        </Button>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* 매너 레벨 */}
                <TableCell>
                  <span className="bold-16 flex justify-center text-violet-600">
                    LV. {v.mannerLevel}
                  </span>
                </TableCell>

                {/* 티어 */}
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex size-[34px] items-center justify-center">
                      <SoloTierIcon />
                    </div>
                    <span className="bold-16">{`${v.tier.at(0)}${v.tier.at(0) !== "U" ? v.rank : ""}`}</span>
                  </div>
                </TableCell>

                {/* 주/부 포지션 */}
                <TableCell>
                  <div className="flex justify-center gap-[2px] *:size-[24px]">
                    <MainPositionIcon />
                    <SubPositionIcon />
                  </div>
                </TableCell>

                {/* 내가 찾는 포지션 */}
                <TableCell>
                  <div className="flex justify-center gap-[2px] *:size-[24px]">
                    <WantMainPosition />
                    {v.wantP[1] !== undefined && <WantSubPosition />}
                  </div>
                </TableCell>

                {/* 최근 선호 챔피언 */}
                <TableCell>
                  {v.championStatsResponseList.length === 0 ? (
                    <p className="semibold-14 text-center text-gray-400">챔피언 정보가 없습니다.</p>
                  ) : (
                    <div className="flex justify-center gap-[6px]">
                      {v.championStatsResponseList.map(({ championName, championId, winRate }) => {
                        return (
                          <div
                            key={championId}
                            className="flex flex-col items-center"
                          >
                            <Image
                              src={`/champions/${championName.replaceAll(" ", "")}.png`}
                              alt=""
                              width={32}
                              height={32}
                            />

                            {/* FIX: 승률별 색 맞는지 확인 */}
                            <p
                              className={cn(
                                `-mt-1 w-[34px] rounded-full py-[2px] text-center text-[11px]
font-[700] text-white`,
                                winRate < 50 && "bg-gray-700",
                                winRate >= 50 && winRate < 70 && "bg-violet-600",
                                winRate >= 70 && "bg-[#CB1FCF]"
                              )}
                            >
                              {winRate.toFixed(0)}%
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TableCell>

                {/* 승률 */}
                <TableCell>
                  <p
                    className={cn(
                      "bold-16 flex justify-center",
                      v.winRate! < 50 && "text-gray-700",
                      v.winRate! >= 50 && v.winRate! < 70 && "text-violet-600",
                      v.winRate! >= 70 && "text-[#CB1FCF]"
                    )}
                  >
                    {v.winRate?.toFixed(1)}%
                  </p>
                </TableCell>

                {/* 한마디 */}
                <TableCell>
                  <div className="flex h-[58px] items-center">
                    <div
                      className="flex w-full justify-center rounded-[8px] border border-gray-400
bg-gray-100 p-[8px]"
                    >
                      <p
                        className="regular-13 line-clamp-2 text-center break-words
whitespace-normal"
                      >
                        {v.contents}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* 등록일시 */}
                <TableCell>
                  <div className="flex items-center justify-between gap-[6px] text-gray-500">
                    <p className="flex w-full justify-center">{formatTime(v.createdAt)}</p>

                    {userInfo && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="size-[24px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <EllipsisVertical className="size-[20px]" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          className="medium-14 w-[175px] rounded-[10px] border-none bg-white p-0
text-gray-600 *:h-[43px] *:hover:bg-gray-200"
                          align="end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {v.memberId === userInfo.id ? (
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/board/post/${v.boardId}/edit/?page=${searchParams.get("page")}`,
                                  { scroll: false }
                                )
                              }
                            >
                              수정하기
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>신고하기</DropdownMenuItem>
                          )}
                          {v.memberId === userInfo.id ? (
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => deletePost.mutate(v.boardId)}
                            >
                              삭제하기
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>차단하기</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <Skeleton />
        )}
      </TableBody>
    </Table>
  );
}

function Skeleton() {
  const skeletonRows = useMemo(() => {
    return (
      <>
        {Array.from({ length: 20 }).map((_, i) => (
          <TableRow
            key={i}
            className="*:border-b *:border-b-gray-300"
          >
            {Array.from({ length: 9 }).map((__, j) => (
              <TableCell key={j}>
                <div className="h-[86px] w-full animate-pulse rounded-md bg-gray-200" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }, []);

  return <>{skeletonRows}</>;
}
