import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient"
import { RequestPostLists } from "../model/types/request/post.request.type"
import { POST_END_POINTS } from "../constants/post.endpoints"
import { PostList } from "../model/types/response/post.response.type";

export const postApi = {
  fetchBoardList: async (params: RequestPostLists): Promise<PostList> => {
    const [url, options] = POST_END_POINTS.postList(params);
    const { data, error } = await clientSideOpenapiClient.GET(url, options);

    if (error || !data.data) {
      throw new Error("게시글 리스트 조회 실패");
    }

    return data.data;
  },
};