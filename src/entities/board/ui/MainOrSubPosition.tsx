import { FC, SVGProps } from "react";

type MainOrSubPositionProps = {
  MainPositionIcon: FC<SVGProps<SVGElement>>;
  SubPositionIcon: FC<SVGProps<SVGElement>>;
};

export function MainOrSubPosition({ MainPositionIcon, SubPositionIcon }: MainOrSubPositionProps) {
  return (
    <div
      className="flex items-center justify-center gap-8 rounded-xl border border-gray-300 bg-white
py-4"
    >
      <div>
        <h4>주 포지션</h4>
        <MainPositionIcon className="size-12" />
      </div>

      <div>
        <h4>부 포지션</h4>
        <SubPositionIcon className="size-12" />
      </div>
    </div>
  );
}
