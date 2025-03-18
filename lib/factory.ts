import ProperDate from "./model";

export const getToday = () => new ProperDate();
export const getYesterday = () => getToday().addDays(-1);
