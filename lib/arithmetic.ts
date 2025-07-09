import ProperDate from "./model";
import type { ArithmeticOptions } from "./types";
import { buildUtcDate } from "./utils";

const DEFAULT_OPTIONS: ArithmeticOptions = { period: "days" };

export const add = (base: ProperDate, n: number, options: ArithmeticOptions = DEFAULT_OPTIONS): ProperDate => {
  // TODO: Refactor this to not use Date: https://github.com/still-forest/proper-date.js/issues/21

  const { period = "days" } = options;

  if (n !== Math.round(n)) {
    throw new Error(`Value '${n}' is not an integer`);
  }

  if (period === "day" || period === "days") {
    const baseDate = base.toDate();
    const newDate = buildUtcDate(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + n);
    newDate.setDate(baseDate.getDate() + n);
    return new ProperDate(newDate);
  }
  if (period === "month" || period === "months") {
    const baseDate = base.toDate();
    const targetDate = buildUtcDate(baseDate.getFullYear(), baseDate.getMonth() + n, baseDate.getDate());

    // Handle cases where the target date overflows to the next month
    // // Calculate expected month: original month + n, then take modulo 12
    const expectedMonth = (((baseDate.getMonth() + n) % 12) + 12) % 12;
    if (targetDate.getMonth() !== expectedMonth) {
      targetDate.setDate(0); // Set to the last day of the previous month
    }

    return new ProperDate(targetDate);
  }
  if (period === "year" || period === "years") {
    const baseDate = base.toDate();
    return new ProperDate(new Date(Date.UTC(baseDate.getFullYear() + n, baseDate.getMonth(), baseDate.getDate())));
  }

  throw new Error(`Period '${period}' is not supported`);
};

export const subtract = (base: ProperDate, n: number, options: ArithmeticOptions = DEFAULT_OPTIONS): ProperDate => {
  return add(base, -1 * n, options);
};

/**
 * Calculates the absolute difference in days between two ProperDate objects.
 * @param base - The first date for comparison
 * @param other - The second date for comparison
 * @param options - An optional object specifying the desired `period` / unit of measurement for the difference (currently only 'days' is supported)
 * @returns The absolute difference in days between the two dates
 * @throws Error when a unit other than 'days' is provided
 */
export const difference = (
  base: ProperDate,
  other: ProperDate,
  options: ArithmeticOptions = DEFAULT_OPTIONS,
): number => {
  const { period = "days" } = options;

  if (period !== "days") {
    throw new Error(`Unsupported option: period=${period}`);
  }
  const diffInMilliseconds = Math.abs(base.toDate().getTime() - other.toDate().getTime());
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays;
};
