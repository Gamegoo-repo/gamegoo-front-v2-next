import { GAME_STYLE } from "@/shared/constants";
import { Button } from "@/shared/ui/button";

export function GameStyle({ gameStyles }: { gameStyles: number[] }) {
  return (
    <div className="flex flex-wrap gap-[12px]">
      {GAME_STYLE.map(
        (v) =>
          gameStyles.includes(v.gameStyleId) && (
            <Button
              key={v.gameStyleId}
              className="w-fit rounded-full bg-white px-[12px] py-[4px]"
            >
              {v.gameStyleName}
            </Button>
          )
      )}
    </div>
  );
}
