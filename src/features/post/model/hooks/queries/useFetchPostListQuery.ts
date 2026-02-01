import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { postApi } from "@/entities/post/api/post.api";
import { POST_QUERYKEYS } from "@/entities/post/constants/post.queryKeys";
import { RequestPostLists } from "@/entities/post/model/types/request/post.request.type";
import { PostList } from "@/entities/post/model/types/response/post.response.type";

export const useFetchPostListQuery = (params: RequestPostLists) => {
  return useQuery<PostList>({
    queryKey: [...POST_QUERYKEYS.PostList, params],
    queryFn: () => postApi.fetchBoardList(params),
    placeholderData: keepPreviousData
  });
};
