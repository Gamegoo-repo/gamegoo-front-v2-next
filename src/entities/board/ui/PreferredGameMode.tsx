import { Check } from "lucide-react";

import { GameMode } from "@/features/board";

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
    <div className="flex h-16 items-center gap-1 rounded-xl border border-gray-300 bg-white px-4">
      <Check className="text-violet-600" />
      <span className="medium-16">{preferredGameMode(gameMode)}</span>
    </div>
  );
}
