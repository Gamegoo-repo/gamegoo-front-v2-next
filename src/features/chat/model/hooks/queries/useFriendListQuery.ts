import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient";

import { FRIEND_LIST_QUERY_KEYS } from "@/entities/chat";

import { FriendList } from "@/features/profile";

export const useFriendListQuery = () => {
  return useQuery<FriendList>({
    queryKey: FRIEND_LIST_QUERY_KEYS.all,
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/friend");

      if (error) throw error;
      if (!data.data?.friendInfoList) throw new Error("친구 목록을 찾을 수 없습니다.");

      return data.data?.friendInfoList;
    }
  });
};
