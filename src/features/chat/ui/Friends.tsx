"use client";

import { Search, Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { ProfileIcon } from "@/entities/profile";

import { useLikeFriendMutation, useStartChatMutation } from "@/features/chat";
import { FriendList } from "@/features/profile";

type FriendsProps = {
  friendList: FriendList;
};

export function Friends({ friendList }: FriendsProps) {
  const [input, setInput] = useState("");

  const likedFriends = friendList.filter((v) => v.liked);

  return (
    <div className="space-y-2 px-4">
      <div className="relative flex items-center pt-2">
        <Search className="absolute left-2 size-5" />
        <input
          className="w-full rounded-xl border-transparent bg-gray-200 py-2 pr-2 pl-8 outline-none
focus:ring-2 focus:ring-violet-600"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="친구 검색하기"
        />
      </div>

      {input.length > 0 ? (
        <FriendListMap
          friendList={friendList.filter((v) => v.name.includes(input.trim().replaceAll(" ", "")))}
          label="친구"
        />
      ) : (
        <>
          <FriendListMap
            friendList={likedFriends}
            label="즐겨찾기"
          />

          <FriendListMap
            friendList={friendList}
            label="친구"
          />
        </>
      )}
    </div>
  );
}

type FriendListMapProps = {
  friendList: FriendList;
  label: "즐겨찾기" | "친구";
};

function FriendListMap({ friendList, label }: FriendListMapProps) {
  const likeFriend = useLikeFriendMutation();
  const startChat = useStartChatMutation();

  return (
    <div className="space-y-1">
      {label === "즐겨찾기" && friendList.length !== 0 && (
        <p className="medium-11 pl-2 text-gray-500">
          {label} {friendList.length}
        </p>
      )}
      {label === "친구" && (
        <p className="medium-11 pl-2 text-gray-500">
          {label} {friendList.length}
        </p>
      )}

      <ul>
        {friendList.map((v) => {
          return (
            <li
              key={v.memberId}
              className="flex cursor-pointer items-center justify-between rounded-lg p-2
hover:bg-gray-200"
              onClick={() => startChat.mutate({ memberId: v.memberId })}
            >
              <div className="flex gap-2">
                <ProfileIcon imgNum={v.profileImg} />
                <div>
                  <p className="font-semibold">{v.name}</p>
                  <p className="text-sm text-gray-500">#{v.tag}</p>
                </div>
              </div>

              <Button
                className="p-1!"
                onClick={() => likeFriend.mutate({ memberId: v.memberId })}
              >
                <Star
                  className={cn("stroke-[1.5] text-violet-600", v.liked && "fill-violet-300")}
                />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
