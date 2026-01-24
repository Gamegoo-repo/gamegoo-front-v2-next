import { paths } from "@/shared/api/schema";

export type Profile = paths['/api/v2/profile']["get"]['responses']["200"]["content"]["*/*"]["data"];