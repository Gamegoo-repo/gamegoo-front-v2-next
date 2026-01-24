import { clientSideOpenapiClient } from "@/shared/api/clientSideOpenapiClient"
import { PROFILE_ENDPOINTS } from "../constants/profile.endpoints"
import { Profile } from "../model/types/response/profile.response.type";

export const profileApi = {
    fetchProfile: async():Promise<Profile> => {
        const [url, options] = PROFILE_ENDPOINTS.fetchProfile();
        const {data, error} = await clientSideOpenapiClient.GET(url,options)

        if (error || !data.data) {
            throw new Error("프로필 조회 실패");
        }

        return data.data
    }
}