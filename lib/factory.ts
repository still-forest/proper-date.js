import ProperDate from "./model"

export const getToday = () => new ProperDate()
export const getYesterday = () => getToday().subtract(1, "day")
