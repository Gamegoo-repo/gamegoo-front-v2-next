"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { POSITION_ICONS } from "@/shared/constants";
import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

export function PositionSelectButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(searchParams.get("position") ?? "ANY");

  return (
    <div className="shrink-0">
      {Object.keys(POSITION_ICONS).map((v) => {
        const Icon = POSITION_ICONS[v as keyof typeof POSITION_ICONS];

        return (
          <Button
            key={v}
            className={cn(
              `h-14 w-12 items-center justify-center rounded-none border-r border-gray-300
bg-gray-200 p-2 first:rounded-l-[10px] last:rounded-r-[10px] last:border-none hover:bg-gray-300`,
              selected === v && "bg-gray-700 text-gray-100 hover:bg-gray-500"
            )}
            variant="ghost"
            onClick={() => {
              setSelected(v);

              const params = new URLSearchParams(searchParams.toString());
              params.set("position", v);
              router.push(`?${params.toString()}`);
            }}
          >
            <Icon className="size-[24px]" />
          </Button>
        );
      })}
    </div>
  );
}
