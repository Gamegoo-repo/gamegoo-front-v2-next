import { Mic } from "lucide-react";
import { FC, SVGProps } from "react";

type ProfileProps = {
  ProfileIcon: FC<SVGProps<SVGElement>>;
  gameName: string;
  tag: string;
};

export function Profile({ ProfileIcon, gameName, tag }: ProfileProps) {
  return (
    <>
      <div className="rounded-full bg-white p-1">
        <ProfileIcon className="size-14" />
      </div>

      <div>
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold">{gameName}</h1>

          <div className="flex items-center rounded-full border-2 p-1 text-sm">
            <Mic />
            마이크 ON
          </div>
        </div>

        <p>#{tag}</p>
      </div>
    </>
  );
}
