import { differenceInDays, format, isToday, isYesterday } from "date-fns";
import { ko } from "date-fns/locale";

// 한국어 로케일 임포트

export const getDisplayDate = (dateString: string | number) => {
  const date = new Date(dateString);

  if (isToday(date)) return "오늘";
  if (isYesterday(date)) return "어제";

  const diffDays = differenceInDays(new Date(), date);

  if (diffDays < 7) {
    return format(date, "EEEE", { locale: ko });
  }

  return format(date, "yyyy.MM.dd");
};
