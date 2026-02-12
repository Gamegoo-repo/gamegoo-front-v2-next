import { GAME_STYLE } from "@/shared/constants";
import { Button } from "@/shared/ui/button";

export function GameStyle({ gameStyles }: { gameStyles: number[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {GAME_STYLE.map(
        (v) =>
          gameStyles.includes(v.gameStyleId) && (
            <Button
              key={v.gameStyleId}
              className="cursor-default rounded-full border border-gray-300 bg-white hover:bg-white"
              variant="ghost"
              tabIndex={-1}
            >
              {v.gameStyleName}
            </Button>
          )
      )}
    </div>
  );
}
