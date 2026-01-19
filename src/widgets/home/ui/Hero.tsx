import { GamegooLogo } from "@/shared/ui/logo";

export function Hero() {
  return (
    <div className="relative w-full bg-violet-100 px-10 py-10">
      <p>겜구 커뮤니티에 오신 것을 환영해요 🎉</p>
      <p>게임 친구를 쉽고 빠르게 구해줄게요!</p>

      <GamegooLogo className="absolute right-10 bottom-10 w-2xs" />
    </div>
  );
}
