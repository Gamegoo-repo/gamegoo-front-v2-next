"use client";

import { SelectPosition } from "@/entities/board";

export function MainAndSubPosition() {
  return (
    <div className="space-y-[6px]">
      <div className="flex justify-between rounded-[10px] bg-white px-[44px] py-[16px]">
        <div className="flex flex-col items-center gap-[12px]">
          <p className="bold-12">주 포지션</p>
          <SelectPosition
            label="주 포지션"
            position="mainPosition"
          />
        </div>

        <div className="flex flex-col items-center gap-[12px]">
          <p className="bold-12">부 포지션</p>
          <SelectPosition
            label="부 포지션"
            position="subPosition"
          />
        </div>
      </div>
    </div>
  );
}
