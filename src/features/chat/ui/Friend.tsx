import { formatTime } from "@/shared/libs/date/formatTime";

import { ProfileIcon } from "@/entities/profile";

import { useStartChatMutation } from "@/features/chat";
import { useFriendStore } from "@/features/profile";

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

export function Friend({ memberId, imgNum, name, label, lastMsgAt, type, children }: FriendProps) {
  const startChat = useStartChatMutation();
  const onlineFriendsIds = useFriendStore((s) => s.onlineFriendsIds);

  return (
    <li
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-200"
      onClick={() => startChat.mutate({ memberId })}
    >
      <div className="flex w-full gap-2">
        <ProfileIcon imgNum={imgNum} />
        <div className="flex-1">
          <div className="font-semibold">
            <div className="flex items-center gap-1">
              <span>{name}</span>
              {onlineFriendsIds.includes(memberId) && (
                <span className="inline-flex size-2 rounded-full bg-green-500"></span>
              )}
            </div>
          </div>
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
