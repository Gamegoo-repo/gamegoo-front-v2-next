import { FC, SVGProps } from "react";

type MainOrSubPositionProps = {
  MainPositionIcon: FC<SVGProps<SVGElement>>;
  SubPositionIcon: FC<SVGProps<SVGElement>>;
};

export function MainOrSubPosition({ MainPositionIcon, SubPositionIcon }: MainOrSubPositionProps) {
  return (
    <div className="flex justify-between bg-white px-[44px] py-[16px]">
      <div>
        <h3>주 포지션</h3>
        <MainPositionIcon className="size-12" />
      </div>

      <div>
        <h3>부 포지션</h3>
        <SubPositionIcon className="size-12" />
      </div>
    </div>
  );
}
