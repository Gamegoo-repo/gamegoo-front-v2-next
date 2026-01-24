"use client";

import Bronze from "@/shared/assets/tier/bronze.svg";
import Challenger from "@/shared/assets/tier/challenger.svg";
import Diamond from "@/shared/assets/tier/diamond.svg";
import Gold from "@/shared/assets/tier/gold.svg";
import Grandmaster from "@/shared/assets/tier/grandmaster.svg";
import Master from "@/shared/assets/tier/master.svg";
import Platinum from "@/shared/assets/tier/platinum.svg";
import Silver from "@/shared/assets/tier/silver.svg";
import Unranked from "@/shared/assets/tier/unranked.svg";
import { characters } from "@/shared/model";

import { SelectGameStyleButton, ToggleMicButton } from "@/features/profile";
import { useFetchProfileQuery } from "@/features/profile/model/hooks/queries/useFetchProfileQuery";
import { ProfileNameAndTag } from "@/features/profile/ui/ProfileNameAndTag";
import { Rank } from "@/features/profile/ui/Rank";

export const TIER_ICONS = {
  UNRANKED: Unranked,
  BRONZE: Bronze,
  SILVER: Silver,
  GOLD: Gold,
  PLATINUM: Platinum,
  DIAMOND: Diamond,
  MASTER: Master,
  GRANDMASTER: Grandmaster,
  CHALLENGER: Challenger
} as const;

export function Profile() {
  const { data: userInfo } = useFetchProfileQuery();

  if (!userInfo) return null;

  const ProfileIcon = characters[userInfo.profileImg - 1];
  const SoloTierIcon = TIER_ICONS[userInfo.soloTier as keyof typeof TIER_ICONS];
  const FreeTierIcon = TIER_ICONS[userInfo.freeTier as keyof typeof TIER_ICONS];

  return (
    <div
      key={userInfo.id}
      className="flex gap-4 bg-gray-100 p-4"
    >
      <div className="h-fit w-fit rounded-full bg-violet-200 p-6">
        <ProfileIcon className="h-32 w-32" />
      </div>

      <div className="flex-1">
        <ProfileNameAndTag
          gameName={userInfo.gameName}
          tag={userInfo.tag}
        />

        <div className="mt-6 flex gap-8">
          <Rank
            Icon={SoloTierIcon}
            soloTier={userInfo.soloTier}
            soloRank={userInfo.soloRank}
          />

          <Rank
            Icon={FreeTierIcon}
            soloTier={userInfo.freeTier}
            soloRank={userInfo.freeRank}
          />
        </div>

        <hr className="my-8 w-full border-gray-500" />

        <div className="space-y-4">
          <p>게임 스타일</p>
          <SelectGameStyleButton />
        </div>

        <div className="mt-8 flex space-x-4">
          <p>마이크</p>
          <ToggleMicButton />
        </div>
      </div>
    </div>
  );
}
