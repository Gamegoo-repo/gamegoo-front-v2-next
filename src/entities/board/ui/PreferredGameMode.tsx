import { Check } from "lucide-react";

import { paths } from "@/shared/api/schema";

type GameMode = NonNullable<
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["gameMode"];

export function PreferredGameMode({ gameMode }: { gameMode: GameMode }) {
  const preferredGameMode = (gameMode: string) => {
    switch (gameMode) {
      case "SOLO":
        return "솔로랭크";
      case "FREE":
        return "자유랭크";
      case "FAST":
        return "빠른 대전";
      case "ARAM":
        return "칼바람 나락";
    }
  };

  return (
    <div className="flex w-1/2 bg-white">
      <Check /> <span>{preferredGameMode(gameMode)}</span>
    </div>
  );
}
