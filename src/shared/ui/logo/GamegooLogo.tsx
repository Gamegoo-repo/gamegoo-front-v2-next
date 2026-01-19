import Link from "next/link";

import Logo from "@/shared/assets/gamegoo-logo.svg";

type GamegooLogoProps = {
  className?: string;
  asLink?: boolean;
};

export function GamegooLogo({ className, asLink = false }: GamegooLogoProps) {
  if (asLink)
    return (
      <Link href="/">
        <Logo className={className} />
      </Link>
    );

  return <Logo className={className} />;
}
