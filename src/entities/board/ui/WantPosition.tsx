import { FC, SVGProps } from "react";

type WantPositionProps = {
  FirstWantPositionIcon: FC<SVGProps<SVGElement>>;
  SecondWantPositionIcon: FC<SVGProps<SVGElement>>;
};

export function WantPosition({ FirstWantPositionIcon, SecondWantPositionIcon }: WantPositionProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-gray-300
bg-white py-4"
    >
      <h4>내가 찾는 포지션</h4>

      <div className="flex *:size-12">
        <FirstWantPositionIcon />
        {SecondWantPositionIcon && <SecondWantPositionIcon />}
      </div>
    </div>
  );
}
