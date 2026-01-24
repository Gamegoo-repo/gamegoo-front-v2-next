"use client";

import { RequestPostLists } from "@/entities/post/model/types/request/post.request.type";
import { useFetchPostListQuery } from "@/features/post/model/hooks/queries/useFetchPostListQuery";
import { PostTable } from "@/features/post/ui/PostTable";



export function Board() {

  const params: RequestPostLists= {
    page:1,
  }
  const { data: posts, isLoading } = useFetchPostListQuery(params);

  return (
    <PostTable
      posts={posts}
      isLoading={isLoading}
    />
  );
}
