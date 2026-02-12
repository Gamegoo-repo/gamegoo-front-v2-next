import { FC, SVGProps } from "react";

type RankProps = {
  Icon: FC<SVGProps<SVGElement>>;
  tier: string;
  rank: number;
  gameType: "솔로랭크" | "자유랭크";
};

export function Rank({ Icon, tier, rank, gameType }: RankProps) {
  return (
    <div className="space-y-2">
      <h3 className="semibold-14">{gameType}</h3>

      <div className="flex items-center gap-1">
        <Icon />
        <p className="bold-20">
          {tier} {tier !== "UNRANKED" && rank}
        </p>
      </div>
    </div>
  );
}
