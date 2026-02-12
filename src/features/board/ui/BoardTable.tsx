"use client";

import { EllipsisVertical, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { POSITION_ICONS, TIER_ICONS } from "@/shared/constants";
import { REPORT_ITEMS } from "@/shared/constants/reportItems";
import { cn } from "@/shared/libs/cn";
import { formatTime } from "@/shared/libs/date/formatTime";
import { toastMessage } from "@/shared/model";
import { AlertModal } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";
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
import { Textarea } from "@/shared/ui/textarea";

import { UserInfo } from "@/entities/auth";
import { ProfileIcon } from "@/entities/profile";

import { BoardList } from "@/features/board";
import { useBlockUserMutation, useDeletePostMutation } from "@/features/post";
import { useReportMutation } from "@/features/post/model/hooks/queries/useReportMutation";

type BoardTableProps = {
  posts: NonNullable<BoardList>["boards"];
  isLoading: boolean;
  userInfo: UserInfo;
};

export function BoardTable({ posts, isLoading, userInfo }: BoardTableProps) {
  return (
    <>
      <Table className="table-fixed">
        <TableCaption className="sr-only">게시물 목록</TableCaption>

        <TableHeader className="sticky top-0 z-10">
          <TableRow className="bold-14 bg-gray-800 text-white *:text-center">
            {/* FIX: 아무렇게나 나눔 나중에 수정 */}
            <TableHead className="w-[160px] rounded-l-[8px] text-start!">소환사</TableHead>
            <TableHead className="w-[50px]">매너 레벨</TableHead>
            <TableHead className="w-[80px]">티어</TableHead>
            <TableHead className="w-[70px]">주/부 포지션</TableHead>
            <TableHead className="w-[90px]">내가 찾는 포지션</TableHead>
            <TableHead className="w-[120px]">최근 선호 챔피언</TableHead>
            <TableHead className="w-[80px]">승률</TableHead>
            <TableHead className="w-[150px]">한마디</TableHead>
            <TableHead className="w-[80px] rounded-r-[8px]">등록일시</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts && !isLoading ? (
            posts.map((v) => {
              return (
                <BoardRow
                  key={`${v.boardId}-${v.memberId.toString()}`}
                  v={v}
                  userInfo={userInfo}
                />
              );
            })
          ) : (
            <Skeleton />
          )}
        </TableBody>
      </Table>
    </>
  );
}

type BoardRowProps = {
  v: NonNullable<BoardList>["boards"][number];
  userInfo: UserInfo;
};

function BoardRow({ v, userInfo }: BoardRowProps) {
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isUnblockOpen, setIsUnblockOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const deletePost = useDeletePostMutation();
  const blockUser = useBlockUserMutation();

  const SoloTierIcon = TIER_ICONS[v.soloTier];
  const MainPositionIcon = POSITION_ICONS[v.mainP];
  const SubPositionIcon = POSITION_ICONS[v.subP];
  const WantMainPosition = POSITION_ICONS[v.wantP[0]];
  const WantSubPosition = POSITION_ICONS[v.wantP[1]];

  const postDetailPageLink = `/board/${v.boardId}?${searchParams.toString()}`;

  return (
    <>
      <TableRow
        className="group a11y-focus-visible relative rounded-md outline-none *:border-b
*:border-b-gray-300 *:py-[19px] hover:bg-gray-200"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(postDetailPageLink);
        }}
      >
        {/* 소환사 */}
        <TableCell>
          <Link
            href={postDetailPageLink}
            className="absolute inset-0"
            aria-label="게시물 상세로 이동"
            tabIndex={-1}
          />

          <div className="flex gap-[8px]">
            <ProfileIcon imgNum={v.profileImage} />
            <div>
              <p className="semibold-16">{v.gameName}</p>
              <div className="flex items-center gap-2">
                <p className="regular-13 text-gray-600">#{v.tag}</p>

                <Button
                  className="relative z-10 h-fit w-fit border border-gray-400 px-1 text-xs opacity-0
group-hover:opacity-100 hover:bg-gray-300 focus-visible:opacity-100"
                  tabIndex={0}
                  variant="ghost"
                  size="icon"
                  onClick={() => {
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
          <span className="bold-16 flex justify-center text-violet-600">LV. {v.mannerLevel}</span>
        </TableCell>

        {/* 티어 */}
        <TableCell>
          <div className="flex items-center justify-center">
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
                        `-mt-1 w-[34px] rounded-full py-[2px] text-center text-[11px] font-[700]
text-white`,
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
              className="flex w-full justify-center rounded-[8px] border border-gray-400 bg-gray-100
p-[8px]"
            >
              <p className="regular-13 line-clamp-2 text-center break-words whitespace-normal">
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
                    className="relative z-10 py-4 hover:bg-gray-300"
                    variant="ghost"
                    size="icon-xs"
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <EllipsisVertical className="size-[20px]" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="medium-14 w-[175px] rounded-[10px] border border-violet-300 bg-white
p-0 text-gray-600 *:h-[43px] *:hover:bg-gray-200"
                  align="end"
                >
                  {v.memberId === userInfo.id ? (
                    <DropdownItemWrapper
                      label="수정하기"
                      onClick={() =>
                        router.push(
                          `/board/post/${v.boardId}/edit/?page=${searchParams.get("page")}`,
                          { scroll: false }
                        )
                      }
                    />
                  ) : (
                    <DropdownItemWrapper
                      label="신고하기"
                      onClick={() => setIsReportOpen(true)}
                    />
                  )}
                  {v.memberId === userInfo.id ? (
                    <DropdownItemWrapper
                      className="text-red-500"
                      label="삭제하기"
                      onClick={() => deletePost.mutate(v.boardId)}
                    />
                  ) : (
                    <>
                      {v.isBlocked ? (
                        <DropdownItemWrapper
                          onClick={() => setIsUnblockOpen(true)}
                          label="차단 해제"
                        />
                      ) : (
                        <DropdownItemWrapper
                          label="차단하기"
                          onClick={() => setIsBlockOpen(true)}
                        />
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </TableCell>
      </TableRow>

      {/* 차단 */}
      <AlertModal
        open={isBlockOpen}
        onOpenChange={setIsBlockOpen}
        action={() => blockUser.mutate({ memberId: v.memberId, type: "block" })}
        title="차단하시겠습니까?"
        description={
          <>
            <span>차단한 상대에게는 메시지를 받을 수 없으며</span>
            <br />
            <span>매칭이 이루어지지 않습니다.</span>
          </>
        }
        actionLabel="차단"
      />

      {/* 차단 해제 */}
      <AlertModal
        open={isUnblockOpen}
        onOpenChange={setIsUnblockOpen}
        action={() => blockUser.mutate({ memberId: v.memberId, type: "unblock" })}
        title="차단을 해제하시겠습니까?"
        description="차단 해제"
        descriptionSrOnly
        actionLabel="차단 해제"
      />

      {/* 신고 */}
      <Report
        isReportOpen={isReportOpen}
        setIsReportOpen={setIsReportOpen}
        memberId={v.memberId}
        boardId={v.boardId}
      />
    </>
  );
}

type DropdownItemWrapperProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

function DropdownItemWrapper({ label, onClick, className }: DropdownItemWrapperProps) {
  return (
    <DropdownMenuItem
      className={cn("a11y-focus-visible-bg first:rounded-b-none last:rounded-t-none", className)}
      onClick={() => onClick()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {label}
    </DropdownMenuItem>
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
type ReportProps = {
  isReportOpen: boolean;
  setIsReportOpen: Dispatch<SetStateAction<boolean>>;
  memberId: number;
  boardId: number;
};

function Report({ isReportOpen, setIsReportOpen, memberId, boardId }: ReportProps) {
  const [reportCodeList, setReportCodeList] = useState<number[]>([]);
  const [reportContent, setReportContent] = useState("");

  const report = useReportMutation();

  return (
    <Dialog
      open={isReportOpen}
      onOpenChange={setIsReportOpen}
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-scroll bg-white"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="bold-20">유저 신고하기</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <X />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="sr-only">유저 신고</DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="semibold-18">신고 사유</p>

            <ul className="space-y-[21px]">
              {REPORT_ITEMS.map((v, i) => {
                return (
                  <li
                    key={v}
                    className="flex cursor-pointer items-center gap-2 *:cursor-pointer"
                  >
                    <Checkbox
                      id={v}
                      onCheckedChange={(isSelected: boolean) => {
                        setReportCodeList((prev: number[]) =>
                          isSelected ? [...prev, i] : prev.filter((item) => item !== i)
                        );
                      }}
                      checked={reportCodeList.includes(i)}
                    />
                    <label
                      className="regular-18"
                      htmlFor={v}
                    >
                      {v}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="semibold-18">상세 내용</p>
            <div>
              <Textarea
                className="h-20 border border-violet-300"
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="내용을 입력하세요. (선택)"
              />
            </div>
          </div>

          <DialogClose asChild>
            <Button
              className="bold-14 h-16 w-full rounded-2xl"
              disabled={reportCodeList.length === 0}
              onClick={() => {
                report.mutate({
                  memberId: memberId,
                  reportCodeList,
                  pathCode: 1,
                  contents: reportContent,
                  boardId: boardId
                });

                setReportCodeList([]);
              }}
            >
              신고하기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
