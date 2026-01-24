import { FC, SVGProps } from "react";

type RankProps = {
  Icon: FC<SVGProps<SVGElement>>;
  tier: string;
  rank: number;
  gameType: "솔로랭크" | "자유랭크";
};

export function Rank({ Icon, tier, rank, gameType }: RankProps) {
  return (
    <div>
      <h2>{gameType}</h2>

      <div className="ml-4 flex items-center">
        <Icon />
        <p>
          {tier} {rank}
        </p>
      </div>
    </div>
  );
}
