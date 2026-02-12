import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";

import { cn } from "@/shared/libs/cn";
import { getDisplayDate } from "@/shared/libs/date/getDisplayDate";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { Textarea } from "@/shared/ui/textarea";

import { CHAT_HISTORY_QUERY_KEYS, CHAT_LIST_QUERY_KEYS, useChat } from "@/entities/chat";
import { ProfileIcon } from "@/entities/profile";

import { useChatHistoryQuery, useChatStore, useExitChatMutation } from "@/features/chat";
import { useFriendStore } from "@/features/profile";

type ChatProps = {
  socket: Socket | null;
  uuid: string;
};

export function Chat({ socket, uuid }: ChatProps) {
  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);

  const chatRef = useRef<HTMLUListElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const setStatus = useChatStore((s) => s.setStatus);
  const data = useChatStore((s) => s.data);
  const onlineFriendsIds = useFriendStore((s) => s.onlineFriendsIds);

  const { messages, sendMessage } = useChat(socket, uuid);

  const { data: chatHistory } = useChatHistoryQuery(uuid);
  const exitChat = useExitChatMutation();
  const queryClient = useQueryClient();

  const messagesWithHistory = useMemo(
    () => [...(chatHistory?.chatMessageList ?? []), ...messages],
    [chatHistory?.chatMessageList, messages]
  );

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;

      setIsAtBottom(bottom);
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isAtBottom) return;

    bottomRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end"
    });
  }, [messagesWithHistory, isAtBottom]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => window.removeEventListener("resize", checkScroll);
  }, [messagesWithHistory]);

  if (!data) return null;

  return (
    <div className="flex h-full flex-col bg-violet-200 pt-4">
      <header className="flex items-center justify-between border-b border-violet-300 px-3 pb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setStatus("INACTIVE");

              queryClient.invalidateQueries({
                queryKey: CHAT_HISTORY_QUERY_KEYS.uuid(uuid)
              });
              queryClient.invalidateQueries({
                queryKey: CHAT_LIST_QUERY_KEYS.all
              });
            }}
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="flex items-center gap-2">
            <ProfileIcon imgNum={data.memberProfileImg} />

            <div className="space-y-1">
              <div className="flex items-center gap-4 py-0! font-semibold">
                <Button
                  className="p-0 focus-visible:ring-0!"
                  variant="ghost"
                  tabIndex={-1}
                  onClick={() => {
                    navigator.clipboard.writeText(`${data.gameName}#${data.tag}`);
                    toastMessage.success("소환사명이 복사되었습니다.");
                  }}
                >
                  <span className="font-semibold">{data.gameName}</span>{" "}
                  <span className="text-gray-500">#{data.tag}</span>
                </Button>
              </div>
              <div className="medium-11">
                {onlineFriendsIds.includes(data.memberId) ? (
                  <span className="rounded-md bg-green-400 px-2 py-0.5 font-semibold">온라인</span>
                ) : (
                  <span className="rounded-md bg-gray-200 px-2 py-0.5 font-semibold">오프라인</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <EllipsisVertical className="size-5!" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-none bg-white p-0 *:cursor-pointer *:rounded-none *:py-2
*:data-[highlighted]:bg-gray-200 *:data-[highlighted]:text-violet-600"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => {
                setStatus("INACTIVE");
                exitChat.mutate({ chatroomUuid: uuid });
              }}
            >
              채팅방 나가기
            </DropdownMenuItem>
            <DropdownMenuItem>친구 삭제</DropdownMenuItem>
            <DropdownMenuItem>신고하기</DropdownMenuItem>
            <DropdownMenuItem>차단하기</DropdownMenuItem>
            <DropdownMenuItem>매너 평가</DropdownMenuItem>
            <DropdownMenuItem>비매너 평가</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ul
        className="group/chat h-full overflow-y-scroll px-3 pt-3 outline-none
focus-visible:bg-violet-300"
        ref={chatRef}
      >
        {messagesWithHistory.map((v, i) => {
          const currentDate = format(new Date(v.createdAt), "yyyy-MM-dd");
          const prevDate =
            i > 0 ? format(new Date(messagesWithHistory[i - 1].createdAt), "yyyy-MM-dd") : null;
          const isNewDay = currentDate !== prevDate;
          const currentTimeStamp = new Date(v.timestamp).toLocaleString("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          });
          const nextTimeStamp = new Date(messagesWithHistory[i + 1]?.timestamp).toLocaleString(
            "ko-KR",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            }
          );

          return (
            <li
              key={`${v.timestamp}-${i}`}
              className={cn(nextTimeStamp !== currentTimeStamp && "pb-2")}
            >
              {isNewDay && (
                <div className="my-2 text-center">
                  <span className="rounded-md bg-gray-200 px-4 py-0.5 text-sm">
                    {getDisplayDate(v.createdAt)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {v.senderName === data.gameName && (
                  <div
                    className={cn(
                      messagesWithHistory[i - 1]?.senderId === v.senderId && "invisible"
                    )}
                  >
                    <ProfileIcon
                      size={36}
                      imgNum={Number(v.senderProfileImg)}
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "flex h-[38px] items-center gap-2",
                    v.senderName === data.gameName ? "flex-row-reverse" : "ml-auto",
                    v.senderName !== data.gameName && hasScroll && "pr-2"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-full items-end text-[10px] text-violet-400",
                      nextTimeStamp === currentTimeStamp && "invisible"
                    )}
                  >
                    {new Date(v.timestamp).toLocaleString("ko-KR", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    })}
                  </div>
                  <p
                    className={cn(
                      "w-fit rounded-xl px-2 py-1",
                      v.senderName === data.gameName ? "bg-white" : "ml-auto bg-violet-300"
                    )}
                  >
                    {v.message}
                  </p>
                </div>
              </div>
            </li>
          );
        })}

        <div ref={bottomRef} />
      </ul>

      <footer className="mt-auto bg-white p-3">
        <Textarea
          className="h-18 p-0"
          maxLength={1000}
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.shiftKey || e.nativeEvent.isComposing) return;

              e.preventDefault();

              if (input.trim().length > 0) sendMessage(input.trim());
              setInput("");
            }
          }}
        />
        <div className="flex items-end justify-between">
          <p className="text-xs text-violet-600">{input.length} / 1000</p>

          <Button
            className="rounded-full"
            size="lg"
            onClick={() => {
              if (input.trim().length > 0) sendMessage(input.trim());
              setInput("");
            }}
          >
            전송
          </Button>
        </div>
      </footer>
    </div>
  );
}
