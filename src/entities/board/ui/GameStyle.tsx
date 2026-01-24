import { GAME_STYLE } from "@/shared/constants/gameStyle";

export function GameStyle({ gameStyles }: { gameStyles: number[] }) {
  return (
    <div className="flex gap-2">
      {gameStyles.map((v, i) => {
        return (
          <div
            key={`${v}-${i}`}
            className="w-fit rounded-full bg-white px-2 py-1"
          >
            {GAME_STYLE[v].gameStyleName}
          </div>
        );
      })}
    </div>
  );
}
