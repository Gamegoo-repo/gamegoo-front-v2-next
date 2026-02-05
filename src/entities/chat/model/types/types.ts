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

export type MessageEmitByServer = {
  event: string;
  data: {
    senderId: number;
    senderName: string;
    senderProfileImg: string;
    message: string;
    createdAt: string;
    timestamp: number;
  };
  timestamp: string;
};
