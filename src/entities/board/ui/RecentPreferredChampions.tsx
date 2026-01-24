import Image from "next/image";

import { paths } from "@/shared/api/schema";

type ChampionStatsResponseList = NonNullable<
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["championStatsResponseList"];

export function RecentPreferredChampions({
  championStatsResponseList
}: {
  championStatsResponseList: ChampionStatsResponseList;
}) {
  return (
    <div className="flex gap-2">
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
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-violet-600
text-white"
            >
              {winRate.toFixed(0)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
