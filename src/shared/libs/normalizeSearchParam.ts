export const normalizeSearchParam = (value: string | null) => {
  const num = Number(value);

  if (!value || Number.isNaN(num) || num < 1) return 1;

  return Math.floor(num);
};
