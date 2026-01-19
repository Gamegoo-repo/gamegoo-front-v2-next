"use client";

import { PostTable, usePost } from "@/entities/post";

export function Board() {
  const { data: posts, isLoading } = usePost(1);

  return (
    <PostTable
      posts={posts}
      isLoading={isLoading}
    />
  );
}
