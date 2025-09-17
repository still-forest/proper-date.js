import { add, difference, subtract } from "./arithmetic";
import { getProperDateFromDate } from "./factory";
import type { ArithmeticOptions, Period } from "./types";
import { buildLocalDate, buildUTCDate, parseInput } from "./utils";

const getDefaultDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

export default class ProperDate {
  year: number;
  month: number; // TODO: follows JS data convention of 0-11 for months; change this to 1-12
  day: number;

  constructor(date: ProperDate | string | number[] | undefined = undefined) {
    const inputDate = date ?? getDefaultDate();

    const { year, month, day } = parseInput(inputDate);
    this.year = year;
    this.month = month;
    this.day = day;
  }

  get formatted() {
    return this.toString();
  }

  get priorMonthEnd(): ProperDate {
    return this.subtract(1, "month").endOfMonth;
  }

  get priorYearEnd(): ProperDate {
    return this.subtract(1, "year").endOfYear;
  }

  get actualMonth(): number {
    return this.month + 1;
  }

  get endOfMonth(): ProperDate {
    const date = new Date(this.year, this.month + 1, 0);
    return getProperDateFromDate(date);
  }

  get endOfYear(): ProperDate {
    const date = new Date(this.year, 11, 31);
    return getProperDateFromDate(date);
  }

  equals(other: ProperDate): boolean {
    return this.toString() === other.toString();
  }

  isBefore(other: ProperDate): boolean {
    return this.toUTCDate() < other.toUTCDate();
  }

  isAfter(other: ProperDate): boolean {
    return this.toUTCDate() > other.toUTCDate();
  }

  toString(): string {
    return `${this.year}-${this.actualMonth.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")}`;
  }

  toJSON(): string {
    return this.toString();
  }

  toLocalDate(): Date {
    return buildLocalDate(this.year, this.actualMonth, this.day);
  }

  toUTCDate(): Date {
    return buildUTCDate(this.year, this.actualMonth, this.day);
  }

  /**
   * Adds a specified number of units to the current date.
   * @param n - The number of units to add.
   * @param periodOrOptions - The period specifying the unit of measurement (e.g., 'days', 'months', 'years'), or an object containing the period.
   * @returns A new ProperDate instance with the added units.
   */
  add(n: number, periodOrOptions: Period | ArithmeticOptions): ProperDate {
    return add(this, n, typeof periodOrOptions === "string" ? { period: periodOrOptions } : periodOrOptions);
  }

  /**
   * Subtracts a specified number of units from the current date.
   * @param n - The number of units to subtract.
   * @param periodOrOptions - The period specifying the unit of measurement (e.g., 'days', 'months', 'years'), or an object containing the period.
   * @returns A new ProperDate instance with the subtracted units.
   */
  subtract(n: number, periodOrOptions: Period | ArithmeticOptions): ProperDate {
    return subtract(this, n, typeof periodOrOptions === "string" ? { period: periodOrOptions } : periodOrOptions);
  }

  /**
   * Calculates the absolute difference in days between this date and another date.
   * @param other - The date to compare against
   * @param period - The unit of measurement (currently only 'days' is supported)
   * @param options - An optional object specifying the desired `period` / unit of measurement for the difference (currently only 'days' is supported)
   * @returns The number of days between the dates
   * @throws Error when a period other than 'days' is provided
   */
  difference(other: ProperDate, options?: ArithmeticOptions): number {
    return difference(this, other, options);
  }
}
