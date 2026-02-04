import { cn } from "@/shared/libs/cn";
import { characters } from "@/shared/model";

type ProfileIconProps = {
  imgNum: number;
  size?: string;
};

export function ProfileIcon({ imgNum, size }: ProfileIconProps) {
  const ProfileIcon = characters[imgNum];

  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-violet-300 p-1.5",
        size && `size-[${size}]`
      )}
    >
      <ProfileIcon />
    </div>
  );
}
