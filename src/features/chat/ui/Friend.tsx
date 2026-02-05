import { ProfileIcon } from "@/entities/profile";

import { useStartChatMutation } from "@/features/chat";

type FriendProps = {
  memberId: number;
  imgNum: number;
  name: string;
  label: string;
  tag?: string;
  children: React.ReactNode;
};

export function Friend({ memberId, imgNum, name, label, tag, children }: FriendProps) {
  const startChat = useStartChatMutation();

  return (
    <li
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-200"
      onClick={() => startChat.mutate({ memberId })}
    >
      <div className="flex gap-2">
        <ProfileIcon imgNum={imgNum} />
        <div>
          <p className="font-semibold">
            <span>{name}</span>
            <span className="text-gray-500">{tag && ` #${tag}`}</span>
          </p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>

      {children}
    </li>
  );
}
