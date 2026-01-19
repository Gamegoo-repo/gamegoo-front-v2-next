"use client";

import { useQuery } from "@tanstack/react-query";

import { clientSideOpenapiClient } from "@/shared/api/openapiClient";

import { userKeys } from "@/entities/user/model/userKeys";

import { useAuthStore } from "@/features/auth";

export const useUserInfo = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: userKeys.info(),
    enabled: !!accessToken,
    queryFn: async () => {
      const { data, error } = await clientSideOpenapiClient.GET("/api/v2/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (error) throw new Error("유저 프로필을 불러오는 데 실패했습니다.");

      return data.data;
    }
  });
};
