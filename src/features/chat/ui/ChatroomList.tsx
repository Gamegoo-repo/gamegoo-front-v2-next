import { EllipsisVertical } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { ChatList } from "@/entities/chat";
import { ProfileIcon } from "@/entities/profile";

import { useExitChatMutation } from "@/features/chat";

export function ChatroomList({ chatList }: { chatList: ChatList }) {
  const exitChat = useExitChatMutation();

  return (
    <ul className="px-4">
      {chatList.map((v) => {
        return (
          <li
            key={v.chatroomId}
            className="group flex items-center justify-between rounded-lg p-2 hover:bg-gray-200
has-[[data-state=open]]:bg-gray-200"
          >
            <div className="flex items-center gap-2">
              <ProfileIcon imgNum={v.targetMemberImg} />

              <div>
                <p>
                  <span className="font-semibold">{v.targetMemberName}</span>{" "}
                  <span className="text-gray-500">#{v.tag}</span>
                </p>
                <p className="text-sm text-gray-500">{v.lastMsg}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <EllipsisVertical className="size-4! shrink-0" />
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
          </li>
        );
      })}

      {chatList.length === 0 && (
        <div className="flex h-50 items-end justify-center">생성된 채팅방이 없습니다.</div>
      )}
    </ul>
  );
}
