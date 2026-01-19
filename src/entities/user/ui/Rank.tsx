import { FC, SVGProps } from "react";

type RankProps = {
  Icon: FC<SVGProps<SVGElement>>;
  soloTier: string;
  soloRank: number;
};

export function Rank({ Icon, soloTier, soloRank }: RankProps) {
  return (
    <div>
      <div>
        <p>솔로랭크</p>

        <div className="ml-6 flex items-center">
          <Icon />
          <span>{`${soloTier.at(0)}${soloRank}`}</span>
        </div>
      </div>
    </div>
  );
}
