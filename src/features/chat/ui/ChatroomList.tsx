import { EllipsisVertical } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { ChatList } from "@/entities/chat";

import { Friend, useExitChatMutation } from "@/features/chat";

export function ChatroomList({ chatList }: { chatList: ChatList }) {
  const exitChat = useExitChatMutation();

  return (
    <ul className="px-4 pt-2">
      {chatList.map((v) => {
        return (
          <Friend
            name={v.targetMemberName}
            key={v.targetMemberId}
            tag={v.tag}
            memberId={v.targetMemberId}
            imgNum={v.targetMemberImg}
            label={v.lastMsg ?? ""}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <EllipsisVertical className="size-5!" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border border-gray-200 bg-white p-0"
                align="end"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => exitChat.mutate({ chatroomUuid: v.uuid })}
                >
                  채팅방 나가기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Friend>
        );
      })}

      {chatList.length === 0 && (
        <div className="flex h-50 items-end justify-center">생성된 채팅방이 없습니다.</div>
      )}
    </ul>
  );
}
