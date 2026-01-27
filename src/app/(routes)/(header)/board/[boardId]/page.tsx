import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";

import { BoardId } from "@/widgets/board";

export default async function page({ params }: { params: { boardId: string } }) {
  const boardId = await params;

  const { data, error } = await serverSideOpenapiClient.GET("/api/v2/posts/list/{boardId}", {
    params: {
      path: {
        boardId: Number(boardId.boardId)
      }
    }
  });

  if (error || !data.data) throw new Error("게시물이 존재하지 않습니다.");

  return <BoardId boardData={data.data} />;
}
