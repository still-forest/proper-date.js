import ProperDate from "./model";

export const getToday = () => new ProperDate();
export const getYesterday = () => getToday().subtract(1, "day");

export const buildFromDate = (date: Date) => {
  return new ProperDate([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
};
