import Image from "next/image";

import { cn } from "@/shared/libs/cn";

import { ChampionStatsResponseList } from "@/entities/board";

export function RecentPreferredChampions({
  championStatsResponseList
}: {
  championStatsResponseList: ChampionStatsResponseList;
}) {
  return (
    <div
      className="flex h-16 items-center justify-center gap-2 rounded-xl border border-gray-300
bg-white"
    >
      {championStatsResponseList.map(({ championName, winRate, championId }) => {
        return (
          <div key={championId}>
            <Image
              src={`/champions/${championName.replaceAll(" ", "")}.png`}
              width={42}
              height={42}
              alt={championName}
            />
            <div
              className={cn(
                `bold-12 relative left-1/2 z-10 -mt-2 w-[34px] -translate-x-1/2 rounded-full
bg-violet-600 text-center text-white`,
                winRate < 50 && "bg-gray-700",
                winRate >= 50 && winRate < 70 && "bg-violet-600",
                winRate >= 70 && "bg-[#CB1FCF]"
              )}
            >
              {winRate.toFixed(0)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
