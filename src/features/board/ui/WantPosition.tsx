"use client";

import { SelectPosition } from "@/entities/board";

export function WantPosition() {
  return (
    <div className="flex flex-col items-center gap-[12px] rounded-[10px] bg-white py-[16px]">
      <p className="bold-12">내가 찾는 포지션</p>

      <div className="flex gap-[16px]">
        <SelectPosition
          position="wantMainPosition"
          label="주 포지션"
        />
        <SelectPosition
          position="wantSubPosition"
          label="부 포지션"
        />
      </div>
    </div>
  );
}
