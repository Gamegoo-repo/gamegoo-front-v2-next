"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { CHAT_HISTORY_QUERY_KEYS } from "@/entities/chat";

import { LoginRequiredModal } from "@/features/auth";
import {
  Chat,
  ChatroomList,
  Friends,
  useChatListQuery,
  useChatStore,
  useFriendListQuery
} from "@/features/chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoginRequiredModal, setIsOpenLoginRequiredModal] = useState(false);
  const [type, setType] = useState<"친구 목록" | "채팅방">("친구 목록");
  const { data: friendList } = useFriendListQuery();
  const { data: chatList } = useChatListQuery();
  const status = useChatStore((s) => s.status);
  const queryClient = useQueryClient();
  const uuid = useChatStore((s) => s.uuid);

  return (
    <>
      <Button
        className="fixed right-8 bottom-8 size-20 rounded-full bg-violet-600"
        onClick={() => {
          if (friendList) {
            setIsOpen(!isOpen);

            queryClient.invalidateQueries({
              queryKey: CHAT_HISTORY_QUERY_KEYS.uuid(uuid)
            });

            return;
          }

          setIsOpenLoginRequiredModal(true);
        }}
      >
        <MessageSquare className="size-8 stroke-[1.5] text-white" />
      </Button>

      {isOpen && friendList && chatList && (
        <div
          className="fixed right-8 bottom-32 h-[720px] max-h-[75dvh] w-[420px] space-y-2
overflow-y-scroll rounded-2xl bg-white shadow-lg"
        >
          {status === "INACTIVE" ? (
            <>
              <header className="space-y-4 px-4 pt-4">
                <div className="flex items-center justify-between">
                  <p className="bold-20">메신저</p>
                  <Button
                    className="p-1! hover:bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </Button>
                </div>

                <div className="flex space-x-8 **:font-bold">
                  <Button
                    className={cn(
                      "h-fit rounded-none border-b-3 border-transparent p-0",
                      type === "친구 목록" && "border-b-3 border-violet-600"
                    )}
                    onClick={() => setType("친구 목록")}
                  >
                    친구 목록
                  </Button>
                  <Button
                    className={cn(
                      "h-fit rounded-none border-b-3 border-transparent p-0",
                      type === "채팅방" && "border-b-3 border-violet-600"
                    )}
                    onClick={() => setType("채팅방")}
                  >
                    채팅방
                  </Button>
                </div>
              </header>

              {type === "친구 목록" ? (
                <Friends friendList={friendList} />
              ) : (
                <ChatroomList chatList={chatList} />
              )}
            </>
          ) : (
            <Chat uuid={uuid} />
          )}
        </div>
      )}

      {isOpenLoginRequiredModal && (
        <div onClick={() => setIsOpenLoginRequiredModal(false)}>
          <LoginRequiredModal routeBack={false} />
        </div>
      )}
    </>
  );
}
