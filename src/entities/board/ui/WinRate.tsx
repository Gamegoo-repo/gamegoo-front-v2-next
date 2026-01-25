import { cn } from "@/shared/libs/cn";
import { Progress } from "@/shared/ui/progress/progress";

export function WinRate({ winRate }: { winRate: number }) {
  return (
    <Progress
      className={cn(
        "h-3 bg-gray-400 [&>div]:bg-gray-800",
        winRate < 50 && "[&>div]:bg-gray-700",
        winRate >= 50 && winRate < 70 && "[&>div]:bg-violet-600",
        winRate >= 70 && "[&>div]:bg-[#CB1FCF]"
      )}
      value={winRate}
    />
  );
}
