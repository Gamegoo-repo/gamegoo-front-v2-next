const TIMES = [
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 30],
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
  ["second", 1000]
] as const;

const rtf = new Intl.RelativeTimeFormat("ko", {
  numeric: "auto"
});

export const formatTime = (input: string) => {
  const target = new Date(input).getTime();
  const now = Date.now();
  const diff = target - now;

  for (const [unit, ms] of TIMES) {
    const value = Math.trunc(diff / ms);
    if (Math.abs(value) >= 1) {
      return rtf.format(value, unit);
    }
  }

  return rtf.format(0, "second");
};
