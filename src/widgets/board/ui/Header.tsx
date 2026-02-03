import { GAME_MODE, TIERS, VOICE } from "@/shared/constants";
import { DropdownType1RequiredQueryString } from "@/shared/ui/dropdown";

import { Bump, PositionSelectButton, Post, RefetchButton } from "@/features/board";

export function Header({ refetch }: { refetch: () => void }) {
  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <h2 className="bold-32">게시판</h2>
        <RefetchButton refetch={refetch} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex h-20 items-center gap-[8px]">
          <DropdownType1RequiredQueryString
            values={GAME_MODE}
            queryString="mode"
          />
          <DropdownType1RequiredQueryString
            values={TIERS}
            queryString="tier"
          />
          <DropdownType1RequiredQueryString
            values={VOICE}
            queryString="voice"
          />
          <PositionSelectButton />
        </div>

        <div className="flex items-center gap-[24px]">
          <Bump />

          <Post />
        </div>
      </div>
    </div>
  );
}
