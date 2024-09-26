import dayjs from "dayjs";

export const formatDateToTime = (date?: Date | string) => {
  if (!date) return "";
  return dayjs(date).format("HH:mm");
};
