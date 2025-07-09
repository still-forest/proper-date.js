import { add, difference, subtract } from "./arithmetic";
import type { ArithmeticOptions, Period } from "./types";
import { parseInput } from "./utils";

export default class ProperDate {
  year: number;
  month: number;
  day: number;

  constructor(date: Date | ProperDate | string | number[]= new Date().toISOString().split("T")[0]) {
    const { year, month, day } = parseInput(date);
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

  get endOfMonth(): ProperDate {
    return this;
    return new ProperDate(new Date(Date.UTC(this.year, this.month + 1, 0)));
  }

  get endOfYear(): ProperDate {
    return this;
    return new ProperDate(new Date(Date.UTC(this.year, 11, 31)));
  }

  equals(other: ProperDate): boolean {
    return this.toString() === other.toString();
  }

  toString(): string {
    return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")}`;
  }

  toJSON(): string {
    return this.toString();
  }

  toUtcDate(): Date {
    // TODO: can toString() be used here?
    return new Date(Date.UTC(this.year, this.month - 1, this.day));
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

  getEndOfNMonthsAgo(n: number): ProperDate {
    console.warn(
      "DEPRECATION WARNING: getEndOfNMonthsAgo() is deprecated and will be removed in a future release. Use subtract(n, 'months').endOfMonth instead.",
    );
    return this.subtract(n, "months").endOfMonth;
  }

  // TODO: Refactor to use the new period-based arithmetic. See https://github.com/still-forest/proper-date.js/issues/20
  getEndOfNYearsAgo(n: number): ProperDate {
    console.warn(
      "DEPRECATION WARNING: getEndOfNYearsAgo() is deprecated and will be removed in a future release. Use subtract(n, 'years').endOfYear instead.",
    );
    return this.subtract(n, "years").endOfYear;
  }
}
