import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { CHAT_HISTORY_QUERY_KEYS, useChat } from "@/entities/chat";
import { ProfileIcon } from "@/entities/profile";

import { useAuthStore } from "@/features/auth";
import { useChatHistoryQuery, useChatStore, useExitChatMutation } from "@/features/chat";

export function Chat({ uuid }: { uuid: string }) {
  const [input, setInput] = useState("");
  const setStatus = useChatStore((s) => s.setStatus);
  const data = useChatStore((s) => s.data);
  const accessToken = useAuthStore((s) => s.accessToken);
  const { isConnected, messages, sendMessage } = useChat(accessToken!, uuid);
  const { data: chatHistory } = useChatHistoryQuery(uuid);
  const exitChat = useExitChatMutation();
  const queryClient = useQueryClient();
  const chatRef = useRef<HTMLUListElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);

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

  if (!data || !chatHistory) return null;

  return (
    <div className="flex h-full flex-col bg-violet-200 pt-4">
      <header className="flex items-center justify-between border-b border-violet-300 px-3 pb-4">
        <div className="flex items-center gap-2">
          <Button
            className="p-1! hover:bg-violet-300"
            onClick={() => {
              setStatus("INACTIVE");

              queryClient.invalidateQueries({
                queryKey: CHAT_HISTORY_QUERY_KEYS.uuid(uuid)
              });
            }}
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="flex items-center gap-2">
            <ProfileIcon imgNum={data.memberProfileImg} />
            <div>
              <div className="flex items-center gap-4 py-0! font-semibold">
                <Button
                  className="h-fit p-0! text-base!"
                  onClick={() => {
                    navigator.clipboard.writeText(`${data.gameName}#${data.tag}`);
                    toastMessage.success("소환사명이 복사되었습니다.");
                  }}
                >
                  <span className="font-semibold">{data.gameName}</span>{" "}
                  <span className="text-gray-500">#{data.tag}</span>
                </Button>
              </div>
              <p className="medium-11 text-gray-600">[온라인 여부]</p>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-1! hover:bg-violet-300">
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
        className="h-full space-y-2 overflow-y-scroll px-3 pt-3 last:bg-blue-200"
        ref={chatRef}
      >
        {messagesWithHistory.map((v, i) => {
          return (
            <li
              key={`${v.timestamp}-${i}`}
              className="flex items-center gap-2"
            >
              {v.senderName === data.gameName && (
                <ProfileIcon
                  size="38px"
                  imgNum={Number(v.senderProfileImg)}
                />
              )}

              <div
                className={cn(
                  "flex items-end gap-2",
                  v.senderName === data.gameName ? "flex-row-reverse" : "ml-auto",
                  v.senderName !== data.gameName && hasScroll && "pr-2"
                )}
              >
                <span className="text-[10px] text-violet-400">
                  {new Date(v.timestamp).toLocaleString("ko-KR", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true
                  })}
                </span>
                <p
                  className={cn(
                    "w-fit rounded-xl px-2 py-1",
                    v.senderName === data.gameName ? "bg-white" : "ml-auto bg-violet-300"
                  )}
                >
                  {v.message}
                </p>
              </div>
            </li>
          );
        })}

        <div
          className="pb-2"
          ref={bottomRef}
        />
      </ul>

      <footer className="mt-auto bg-white p-3">
        <textarea
          className="block h-18 w-full resize-none border-none outline-none"
          maxLength={1000}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.shiftKey || e.nativeEvent.isComposing) return;

              e.preventDefault();
              sendMessage(input.trim());
              setInput("");
            }
          }}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-violet-600">{input.length} / 1000</p>
          <Button
            className="rounded-full bg-violet-600 p-4 text-white"
            onClick={() => {
              sendMessage(input.trim());
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
