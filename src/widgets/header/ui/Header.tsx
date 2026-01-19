import { GamegooLogo } from "@/shared/ui/logo";

import { LoginButton } from "@/features/auth";

import { Nav } from "@/widgets/header";

export async function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex gap-8">
        <GamegooLogo
          className="w-32"
          asLink
        />
        <Nav />
      </div>

      <LoginButton />
    </header>
  );
}
