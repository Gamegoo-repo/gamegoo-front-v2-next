"use client";

import { Search, Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { Friend, useLikeFriendMutation } from "@/features/chat";
import { FriendList } from "@/features/profile";

/**
 * 친구 목록을 렌더링하는 컴포넌트
 */
export function Friends({ friendList }: { friendList: FriendList }) {
  const [input, setInput] = useState("");

  const likedFriends = friendList.filter((v) => v.liked);

  return (
    <div className="space-y-2 px-4">
      <div className="relative flex items-center pt-2">
        <Search className="absolute left-2 size-5" />

        <Input
          className="pr-2 pl-8"
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
            <Friend
              name={v.name}
              key={v.memberId}
              type="친구 목록"
              memberId={v.memberId}
              imgNum={v.profileImg}
              label={`#${v.tag}`}
            >
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  likeFriend.mutate({ memberId: v.memberId });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    likeFriend.mutate({ memberId: v.memberId });
                  }
                }}
              >
                <Star
                  className={cn("stroke-[1.5] text-violet-600", v.liked && "fill-violet-300")}
                />
              </Button>
            </Friend>
          );
        })}
      </ul>
    </div>
  );
}
