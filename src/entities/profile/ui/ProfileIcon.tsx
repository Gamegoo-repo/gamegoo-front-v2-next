import { characters } from "@/shared/model";

type ProfileIconProps = {
  imgNum: number;
  size?: number;
  padding?: number;
};

export function ProfileIcon({ imgNum, size, padding }: ProfileIconProps) {
  const Icon = characters[imgNum - 1];

  return (
    <div
      className="flex size-12 items-center justify-center rounded-full bg-violet-300 p-1.5"
      style={{ height: `${size}px`, width: `${size}px`, padding: `${padding}px` }}
    >
      <Icon />
    </div>
  );
}
