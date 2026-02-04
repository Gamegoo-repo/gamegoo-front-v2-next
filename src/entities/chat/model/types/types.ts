import { paths } from "@/shared/api/schema";

export type ChatList = NonNullable<
  paths["/api/v2/chatroom"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["chatroomResponseList"];

export type StartChat = NonNullable<
  paths["/api/v2/chat/start/member/{memberId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;

export type ChatHistory = NonNullable<
  paths["/api/v2/chat/{chatroomUuid}/messages"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
