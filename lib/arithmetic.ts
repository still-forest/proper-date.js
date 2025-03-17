import ProperDate from "./model";
import { Period, type PeriodType } from "./types";

// TODO: refactor this to not use Date
export const add = (
  base: ProperDate,
  n: number,
  period: Period | PeriodType
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
  if (period === Period.Year || period === Period.Years) {
    const baseDate = base.toDate();
    return new ProperDate(
      new Date(
        Date.UTC(
          baseDate.getFullYear() + n,
          baseDate.getMonth(),
          baseDate.getDate()
        )
      )
    );
  }

  throw new Error(`Period ${period} is not supported`);
};

export const subtract = (
  base: ProperDate,
  n: number,
  period: Period | PeriodType
): ProperDate => {
  return add(base, -1 * n, period);
};
