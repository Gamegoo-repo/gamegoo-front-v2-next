import { EllipsisVertical } from "lucide-react";

import { characters } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { ChatList } from "@/entities/chat";

import { useExitChatMutation } from "@/features/chat";

export function Chatroom({ chatList }: { chatList: ChatList }) {
  const exitChat = useExitChatMutation();

  return (
    <ul>
      {chatList.map((v) => {
        const ProfileIcon = characters[v.targetMemberImg];

        return (
          <li
            key={v.chatroomId}
            className="group flex items-center rounded-lg px-2 py-4 hover:bg-gray-200
has-[[data-state=open]]:bg-gray-200"
          >
            <Button
              className="flex-1 justify-start p-0 text-start"
              asChild
            >
              <div>
                <div className="size-12 rounded-full bg-violet-300 p-1.5">
                  <ProfileIcon />
                </div>

                <div>
                  <p>
                    <span className="font-semibold">{v.targetMemberName}</span>{" "}
                    <span className="text-gray-500">#{v.tag}</span>
                  </p>
                  <p className="text-sm text-gray-500">{v.lastMsg}</p>
                </div>
              </div>
            </Button>

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
