"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

/**
 * 우측 하단 메시지 버튼을 렌더링하는 컴포넌트
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("친구 목록");
  const [unReadMessageCount, setUnReadMessageCount] = useState(0);

  const { data: friendList } = useFriendListQuery();
  const { data: chatList } = useChatListQuery();

  const { socket } = useSocketContext();

  const messageTrigger = useTriggerSocketEvent("chat-message");

  const authStatus = useAuthStore((s) => s.authStatus);
  const status = useChatStore((s) => s.status);
  const uuid = useChatStore((s) => s.uuid);
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);

  const queryClient = useQueryClient();

  // 모달이 열릴 때 채팅 목록 및 기록의 캐시를 무효화하여 새로운 데이터를 렌더링하도록 하는 useEffect
  useEffect(() => {
    if (!isOpen) return;

    queryClient.invalidateQueries({
      queryKey: CHAT_LIST_QUERY_KEYS.all
    });
    queryClient.invalidateQueries({
      queryKey: CHAT_HISTORY_QUERY_KEYS.all
    });
  }, [isOpen, queryClient]);

  // 메시지가 수신되면 새로운 chatList 객체를 받아와 렌더링하는 useEffect
  // -> chatList 내부에 읽지 않은 메시지를 카운트하는 프로퍼티가 있음
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: CHAT_LIST_QUERY_KEYS.all
    });

    setUnReadMessageCount(
      chatList?.map((v) => v.notReadMsgCnt).reduce((acc, cur) => acc + cur) ?? 0
    );
  }, [messageTrigger, chatList, queryClient]);

  // ESC를 눌렀을 때 메시지 모달이 닫히게 하는 useEffect
  useEffect(() => {
    const detectPressEnter = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", detectPressEnter);

    return () => window.removeEventListener("keydown", detectPressEnter);
  }, []);

  if (!friendList || !chatList) return null;

  return (
    <>
      <div className="relative size-20">
        <Button
          className="fixed right-8 bottom-8 size-20 rounded-full bg-violet-600"
          onClick={() => {
            // 로그인하지 않은 사용자는 LoginRequiredModal을 띄우고 모달이 열리는 것을 막음
            if (authStatus !== "authenticated") {
              setIsOpenLoginRequiredModal(true);
              return;
            }

            setIsOpen(!isOpen);
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

      {isOpen && (
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
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <ViewTypeComp
                    viewType={viewType}
                    label="친구 목록"
                    setViewType={setViewType}
                  />
                  <ViewTypeComp
                    viewType={viewType}
                    label="채팅방"
                    setViewType={setViewType}
                  />
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

type ViewTypeCompProps = {
  label: ViewType;
  viewType: ViewType;
  setViewType: Dispatch<SetStateAction<ViewType>>;
};

function ViewTypeComp({ label, viewType, setViewType }: ViewTypeCompProps) {
  return (
    <div>
      <Button
        className="peer/view-type font-bold"
        variant="ghost"
        onClick={() => setViewType(label)}
      >
        {label}
      </Button>

      <hr
        className={cn(
          viewType === label
            ? "mx-auto border border-violet-600 peer-focus-visible/view-type:border-transparent"
            : "hidden",
          viewType === "친구 목록" ? "w-4/5" : "w-3/4"
        )}
      />
    </div>
  );
}
