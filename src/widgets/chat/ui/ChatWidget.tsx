"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { LoginRequiredModal } from "@/features/auth";
import { Chatroom, Friends, useFriendListQuery } from "@/features/chat";
import { useChatListQuery } from "@/features/chat/model/hooks/queries/useChatListQuery";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLoginRequiredModal, setIsOpenLoginRequiredModal] = useState(false);
  const [type, setType] = useState<"친구 목록" | "채팅방" | "룸">("친구 목록");
  const { data: friendList } = useFriendListQuery();
  const { data: chatList } = useChatListQuery();

  return (
    <>
      <Button
        className="fixed right-8 bottom-8 size-20 rounded-full bg-violet-600"
        onClick={() => {
          if (friendList) {
            setIsOpen(!isOpen);
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
overflow-y-scroll rounded-2xl border border-gray-200 bg-white shadow-lg"
        >
          {type !== "룸" && (
            <header className="space-y-4 px-5 pt-5 pb-1">
              <p className="bold-20">메신저</p>

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
          )}

          <div className="px-4">
            {type === "친구 목록" ? (
              <Friends friendList={friendList} />
            ) : (
              <Chatroom chatList={chatList} />
            )}
          </div>
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
