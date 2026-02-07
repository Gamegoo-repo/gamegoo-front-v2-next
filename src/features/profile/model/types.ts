import { paths } from "@/shared/api/schema";

type Friend = paths["/api/v2/friend"]["get"]["responses"]["200"]["content"]["*/*"]["data"];

export type FriendList = NonNullable<Friend>["friendInfoList"];
