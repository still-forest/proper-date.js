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
  if (period === Period.Month || period === Period.Months) {
    const baseDate = base.toDate();
    const targetDate = new Date(
      Date.UTC(
        baseDate.getFullYear(),
        baseDate.getMonth() + n,
        baseDate.getDate()
      )
    );

    // Handle cases where the target date overflows to the next month
    if (targetDate.getMonth() !== (baseDate.getMonth() + n + 12) % 12) {
      targetDate.setDate(0); // Set to the last day of the previous month
    }

    return new ProperDate(targetDate);
  }

  throw new Error(`Period ${period} is not supported`);
};
