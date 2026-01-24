"use client";

import { useRouter } from "next/navigation";

import { formatTime } from "@/shared/libs/date/formatTime";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/shared/ui/table";

import { PostList } from "../../../entities/post/model/types/response/post.response.type";

const TABLE_HEADER_LABELS = [
  "소환사",
  "매너 레벨",
  "티어",
  "주/부 포지션",
  "내가 찾는 포지션",
  "최근 선호 챔피언",
  "승률",
  "한마디",
  "등록일시"
] as const;

export function BoardTable({ posts, isLoading }: { posts: PostList; isLoading: boolean }) {
  const router = useRouter();

  if (!posts) return null;

  return (
    <Table className="table-fixed">
      <TableCaption className="sr-only">게시물 목록</TableCaption>

      <TableHeader>
        <TableRow>
          {TABLE_HEADER_LABELS.map((v) => {
            return <TableHead key={v}>{v}</TableHead>;
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts.boards.map((v) => {
          return (
            <TableRow
              key={`${v.boardId}-${v.memberId.toString()}`}
              onClick={() => router.push(`/board/${v.boardId}`)}
            >
              <TableCell>{v.gameName}</TableCell>
              <TableCell>LV. {v.mannerLevel}</TableCell>
              <TableCell>{`${v.tier.at(0)}${v.rank}`}</TableCell>
              <TableCell>{`${v.mainP}, ${v.subP}`}</TableCell>
              <TableCell>{`${v.wantP[0]}, ${v.wantP[1] ?? ""}`}</TableCell>
              <TableCell>이 값은 어디에 있을까</TableCell>
              <TableCell>{v.winRate}%</TableCell>
              <TableCell className="w-60 whitespace-normal">
                <div className="line-clamp-2">{v.contents}</div>
              </TableCell>
              <TableCell>{formatTime(v.createdAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
