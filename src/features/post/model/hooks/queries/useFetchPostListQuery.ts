import { postApi } from "@/entities/post/api/post.api";
import { RequestPostLists } from "@/entities/post/api/post.request.type";
import { PostList } from "@/entities/post/api/post.response.type";
import { POST_QUERYKEYS } from "@/entities/post/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFetchPostListQuery = (params:RequestPostLists) => {
    return useQuery<PostList>({
        queryKey:[POST_QUERYKEYS.PostList,params],
        queryFn: () => postApi.fetchBoardList(params),
        placeholderData: keepPreviousData,
    })
}