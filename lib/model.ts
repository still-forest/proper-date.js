import type { ProperDateInterface } from "./interface";
import { parseInput } from "./utils";
import { add, subtract } from "./arithmetic";
import type { Period } from "./types";

export default class ProperDate implements ProperDateInterface {
  year: number;
  month: number;
  day: number;

  constructor(date: Date | ProperDate | string = new Date()) {
    const { year, month, day } = parseInput(date);
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static compare(a: ProperDate, b: ProperDate) {
    return a.getTime() - b.getTime();
  }

  get formatted() {
    return this.toString();
  }

  get priorYearEnd(): ProperDate {
    return this.getEndOfNYearsAgo(1);
  }

  get priorMonthEnd(): ProperDate {
    return this.getEndOfNMonthsAgo(1);
  }

  equals(other: ProperDate): boolean {
    return this.toString() === other.toString();
  }

  // TODO: deprecated
  formatDateDifference(other: ProperDate): string {
    console.warn(
      "Warning: formatDateDifference() is deprecated and will be removed prior to v1.0.0.",
    );

    const baseDate = this.toDate();
    const pastDate = other.toDate();

    const diffMs = baseDate.getTime() - pastDate.getTime();
    const numDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (numDays === 0) {
      return "today";
    }
    if (numDays === 1) {
      return "yesterday";
    }
    if (numDays > 30) {
      const numMonths = Math.floor(numDays / 30.42); // Approximation for months
      return `${numMonths} month${numMonths > 1 ? "s" : ""} ago`;
    }

    return `${numDays} day${numDays > 1 ? "s" : ""} ago`;
  }

  toString(): string {
    return this.jsDate.toISOString().split("T")[0];
  }

  toJSON(): string {
    // serialize to JSON
    return this.toString();
  }

  toDate(): Date {
    return new Date(this.toString());
  }

  // TODO: This is used to sort ProperDate objects.  Can we do something better?
  getTime(): number {
    return this.toDate().getTime();
  }

  add(n: number, period: Period): ProperDate {
    return add(this, n, period);
  }

  subtract(n: number, period: Period): ProperDate {
    return subtract(this, n, period);
  }

  // TODO: Refactor to use the new period-based arithmetic. See https://github.com/jszymanowski/proper-date.js/issues/20
  getEndOfNMonthsAgo(n: number): ProperDate {
    return new ProperDate(
      // `0` gives the last day of the previous month.
      new Date(Date.UTC(this.year, this.month - n + 1, 0)),
    );
  }

  // TODO: Refactor to use the new period-based arithmetic. See https://github.com/jszymanowski/proper-date.js/issues/20
  getEndOfNYearsAgo(n: number): ProperDate {
    const priorYear = this.toDate().getFullYear() - n;
    const priorYearEndDate = new Date(Date.UTC(priorYear, 11, 31));
    return new ProperDate(priorYearEndDate);
  }

  private get jsDate(): Date {
    return new Date(Date.UTC(this.year, this.month, this.day));
  }
}
