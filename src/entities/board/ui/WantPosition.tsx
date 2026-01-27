import { FC, SVGProps } from "react";

type WantPositionProps = {
  FirstWantPositionIcon: FC<SVGProps<SVGElement>>;
  SecondWantPositionIcon: FC<SVGProps<SVGElement>>;
};

export function WantPosition({ FirstWantPositionIcon, SecondWantPositionIcon }: WantPositionProps) {
  return (
    <div className="flex flex-col items-center bg-white px-[44px] py-[16px]">
      <h3>내가 찾는 포지션</h3>

      <div className="flex justify-center *:size-12">
        <FirstWantPositionIcon />
        {SecondWantPositionIcon && <SecondWantPositionIcon />}
      </div>
    </div>
  );
}
