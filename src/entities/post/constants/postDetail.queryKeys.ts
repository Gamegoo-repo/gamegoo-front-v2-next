export const POST_DETAIL_QUERY_KEYS = {
  all: ["postDetail"] as const,
  detail: (boardId: string) => [...POST_DETAIL_QUERY_KEYS.all, boardId]
};
