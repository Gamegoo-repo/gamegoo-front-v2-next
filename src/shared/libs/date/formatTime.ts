import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const formatTime = (input: string) => {
  const target = new Date(input);

  return formatDistanceToNow(target, {
    addSuffix: true,
    locale: ko
  });
};
