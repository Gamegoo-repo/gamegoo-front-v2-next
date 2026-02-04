import { paths } from "@/shared/api/schema";

export type ChatList = NonNullable<
  paths["/api/v2/chatroom"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["chatroomResponseList"];
