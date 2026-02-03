"use client";

import { Search, Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/libs/cn";
import { characters } from "@/shared/model";
import { Button } from "@/shared/ui/button";

import { useLikeFriendMutation } from "@/features/chat";
import { FriendList } from "@/features/profile";

export function Friends({ friendList }: { friendList: FriendList }) {
  const [input, setInput] = useState("");
  const likedFriends = friendList.filter((v) => v.liked);

  return (
    <div className="space-y-4">
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
        <div className="space-y-4 *:space-y-2">
          <p className="medium-11 text-gray-500">친구 목록</p>
          <FriendListMap
            friendList={friendList.filter((v) => v.name.includes(input.trim().replaceAll(" ", "")))}
          />
        </div>
      ) : (
        <div className="space-y-4 *:space-y-2">
          <div>
            {likedFriends.length !== 0 && (
              <p className="medium-11 text-gray-500">친구 {friendList.length}</p>
            )}
            <FriendListMap friendList={likedFriends} />
          </div>

          <div>
            <p className="medium-11 text-gray-500">친구 {friendList.length}</p>
            <FriendListMap friendList={friendList} />
          </div>
        </div>
      )}
    </div>
  );
}

function FriendListMap({ friendList }: { friendList: FriendList }) {
  const likeFriend = useLikeFriendMutation();

  return (
    <ul>
      {friendList.map((v) => {
        const ProfileIcon = characters[v.profileImg];

        return (
          <li
            key={v.memberId}
            className="flex items-center justify-between"
          >
            <div className="flex gap-2">
              <div className="size-12 rounded-full bg-violet-300 p-1.5">
                <ProfileIcon />
              </div>
              <div>
                <p className="font-semibold">{v.name}</p>
                <p className="text-sm text-gray-500">#{v.tag}</p>
              </div>
            </div>

            <Button
              className="p-1!"
              onClick={() => likeFriend.mutate({ memberId: v.memberId })}
            >
              <Star className={cn("stroke-[1.5] text-violet-600", v.liked && "fill-violet-300")} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
