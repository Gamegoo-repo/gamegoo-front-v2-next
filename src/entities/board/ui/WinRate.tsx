import { Progress } from "@/shared/ui/progress/progress";

export function WinRate({ winRate }: { winRate: number }) {
  return (
    <Progress
      className="h-3 bg-gray-400 [&>div]:bg-gray-800"
      value={winRate}
    />
  );
}
