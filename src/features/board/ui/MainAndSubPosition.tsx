"use client";

import { SelectPosition } from "@/entities/board";

export function MainAndSubPosition() {
  return (
    <div className="flex justify-center gap-8 rounded-xl border border-gray-300 bg-white py-4">
      <div className="flex flex-col items-center gap-2">
        <h4 className="bold-12">주 포지션</h4>
        <SelectPosition
          label="주 포지션"
          position="mainPosition"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h4 className="bold-12">부 포지션</h4>
        <SelectPosition
          label="부 포지션"
          position="subPosition"
        />
      </div>
    </div>
  );
}
