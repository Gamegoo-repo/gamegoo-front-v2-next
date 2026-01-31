import Image from "next/image";

import { paths } from "@/shared/api/schema";
import { cn } from "@/shared/libs/cn";

type ChampionStatsResponseList = NonNullable<
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["championStatsResponseList"];

export function RecentPreferredChampions({
  championStatsResponseList
}: {
  championStatsResponseList: ChampionStatsResponseList;
}) {
  return (
    <div className="flex h-[56px] gap-2">
      {championStatsResponseList.map(({ championName, winRate, championId }) => {
        return (
          <div
            key={championId}
            className="relative"
          >
            <Image
              src={`/champions/${championName.replaceAll(" ", "")}.png`}
              width={52}
              height={52}
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
