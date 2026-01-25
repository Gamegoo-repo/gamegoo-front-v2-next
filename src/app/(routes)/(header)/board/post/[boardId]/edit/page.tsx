import { serverSideOpenapiClient } from "@/shared/api/serverSideOpenApiClient";

import { Post } from "@/widgets/board";

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;
  const { data } = await serverSideOpenapiClient.GET("/api/v2/posts/list/{boardId}", {
    params: {
      path: {
        boardId: Number(boardId)
      }
    }
  });

  return (
    <Post
      postData={data?.data}
      boardId={boardId}
    />
  );
}
