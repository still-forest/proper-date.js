import ProperDate from "./model";
import { Period } from "./types";

export const add = (
  base: ProperDate,
  n: number,
  period: Period
): ProperDate => {
  if (period === Period.Day || period === Period.Days) {
    const baseDate = base.toDate();
    const newDate = baseDate;
    newDate.setDate(baseDate.getDate() + n);
    return new ProperDate(newDate);
  }

  throw new Error(`Period ${period} is not supported`);
};
