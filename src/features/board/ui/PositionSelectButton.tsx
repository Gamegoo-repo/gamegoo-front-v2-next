"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { POSITION_ICONS } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";

export function PositionSelectButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(searchParams.get("position"));

  return (
    <div>
      {Object.keys(POSITION_ICONS).map((v) => {
        const Icon = POSITION_ICONS[v as keyof typeof POSITION_ICONS];

        return (
          <button
            key={v}
            className={cn(
              "border-r border-gray-400 bg-gray-200 p-2 last:border-none hover:bg-gray-300",
              selected === v && "bg-gray-500 hover:bg-gray-500"
            )}
            onClick={() => {
              setSelected(v);

              const params = new URLSearchParams(searchParams.toString());
              params.set("position", v);
              router.push(`?${params.toString()}`);
            }}
          >
            <Icon className="size-8" />
          </button>
        );
      })}
    </div>
  );
}
