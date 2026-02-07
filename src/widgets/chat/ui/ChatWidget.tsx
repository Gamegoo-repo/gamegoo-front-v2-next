"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useTriggerSocketEvent } from "@/shared/hooks/socket/useTriggerSocketEvent";
import { cn } from "@/shared/libs/cn";
import { useSocketContext } from "@/shared/libs/socket/SocketContext";
import { Button } from "@/shared/ui/button";

import { CHAT_HISTORY_QUERY_KEYS, CHAT_LIST_QUERY_KEYS, ViewType } from "@/entities/chat";

import { useAuthStore } from "@/features/auth";
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
  const [viewType, setViewType] = useState<ViewType>("친구 목록");
  const [unReadMessageCount, setUnReadMessageCount] = useState(0);
  const { data: friendList } = useFriendListQuery();
  const { data: chatList } = useChatListQuery();
  const status = useChatStore((s) => s.status);
  const uuid = useChatStore((s) => s.uuid);
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);
  const messageTrigger = useTriggerSocketEvent("chat-message");
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) return;

    queryClient.invalidateQueries({
      queryKey: CHAT_LIST_QUERY_KEYS.all
    });
    queryClient.invalidateQueries({
      queryKey: CHAT_HISTORY_QUERY_KEYS.all
    });
  }, [isOpen]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: CHAT_LIST_QUERY_KEYS.all
    });

    setUnReadMessageCount(
      chatList?.map((v) => v.notReadMsgCnt).reduce((acc, cur) => acc + cur) ?? 0
    );
  }, [messageTrigger, chatList]);

  useEffect(() => {
    const detectPressEnter = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", detectPressEnter);

    return () => window.removeEventListener("keydown", detectPressEnter);
  }, []);

  return (
    <>
      <div className="relative size-20">
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

        {unReadMessageCount > 0 && (
          <div
            className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full
border border-violet-300 bg-violet-200 text-lg"
          >
            {unReadMessageCount}
          </div>
        )}
      </div>

      {isOpen && friendList && chatList && (
        <div
          className="fixed right-8 bottom-32 h-[720px] max-h-[75dvh] w-[420px] space-y-2
overflow-y-scroll rounded-2xl border border-gray-200 bg-white shadow-lg"
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
                      viewType === "친구 목록" && "border-b-3 border-violet-600"
                    )}
                    onClick={() => setViewType("친구 목록")}
                  >
                    친구 목록
                  </Button>
                  <Button
                    className={cn(
                      "h-fit rounded-none border-b-3 border-transparent p-0",
                      viewType === "채팅방" && "border-b-3 border-violet-600"
                    )}
                    onClick={() => setViewType("채팅방")}
                  >
                    채팅방
                  </Button>
                </div>
              </header>

              {viewType === "친구 목록" ? (
                <Friends friendList={friendList} />
              ) : (
                <ChatroomList chatList={chatList} />
              )}
            </>
          ) : (
            <Chat
              socket={socket}
              uuid={uuid}
            />
          )}
        </div>
      )}
    </>
  );
}
