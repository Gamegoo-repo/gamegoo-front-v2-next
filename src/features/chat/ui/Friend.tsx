import { formatTime } from "@/shared/libs/date/formatTime";

import { ProfileIcon } from "@/entities/profile";

import { useStartChatMutation } from "@/features/chat";

type FriendProps = {
  memberId: number;
  imgNum: number;
  name: string;
  label: string;
  tag?: string;
  lastMsgAt?: string;
  children: React.ReactNode;
  type: "친구 목록" | "채팅방";
};

export function Friend({
  memberId,
  imgNum,
  name,
  label,
  tag,
  lastMsgAt,
  type,
  children
}: FriendProps) {
  const startChat = useStartChatMutation();

  return (
    <li
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-200"
      onClick={() => startChat.mutate({ memberId })}
    >
      <div className="flex w-full gap-2">
        <ProfileIcon imgNum={imgNum} />
        <div className="flex-1">
          <p className="font-semibold">
            <span>{name}</span>
            <span className="text-gray-500">{tag && ` #${tag}`}</span>
          </p>
          <p className="flex flex-1 justify-between text-sm text-gray-500">
            <span>{label}</span>
            <span className="text-xs">{type === "채팅방" ? formatTime(lastMsgAt!) : ""}</span>
          </p>
        </div>
      </div>

      {children}
    </li>
  );
}
