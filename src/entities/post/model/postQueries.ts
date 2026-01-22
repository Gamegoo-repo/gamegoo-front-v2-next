"use privateClient";

import { useQuery } from "@tanstack/react-query";


import { postKeys } from "@/entities/post";
import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

export const usePost = (page: number) => {
  return useQuery({
    queryKey: postKeys.list(page),
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/posts/list", {
        params: {
          query: {
            page
          }
        }
      });

      if (error) throw new Error("게시판 글 목록을 불러오는 데 실패했습니다 ");

      return data.data;
    }
  });
};
