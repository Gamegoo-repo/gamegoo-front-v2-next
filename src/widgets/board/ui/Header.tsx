import { GAME_MODE, TIERS, VOICE } from "@/shared/constants";
import { DropdownType1 } from "@/shared/ui/select";

import { PositionSelectButton, RefetchButton } from "@/features/board";

export function Header() {
  return (
    <header className="mt-20">
      <div className="flex justify-between">
        <h2 className="bold-32">게시판</h2>
        <RefetchButton />
      </div>

      <div className="flex h-20 items-center gap-4">
        <DropdownType1
          values={GAME_MODE}
          queryString="mode"
        />
        <DropdownType1
          values={TIERS}
          queryString="tier"
        />
        <DropdownType1
          values={VOICE}
          queryString="voice"
        />
        <PositionSelectButton />
      </div>
    </header>
  );
}
