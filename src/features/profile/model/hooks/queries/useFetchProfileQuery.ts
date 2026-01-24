import { profileApi } from "@/entities/profile/api/profile.api"
import { PROFILE_QUERYKEYS } from "@/entities/profile/constants/profile.queryKeys"
import { Profile } from "@/entities/profile/model/types/response/profile.response.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useFetchProfileQuery = () => {
    return useQuery<Profile>({
        queryKey: [PROFILE_QUERYKEYS.Profile],
        queryFn: () => profileApi.fetchProfile(),
        placeholderData: keepPreviousData,
    })
}