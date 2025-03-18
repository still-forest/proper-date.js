import type { Period } from "./types";

export interface ProperDateInterface {
  year: number;
  month: number;
  day: number;
  formatted: string;
  priorYearEnd: ProperDateInterface;
  priorMonthEnd: ProperDateInterface;
  equals(other: ProperDateInterface): boolean;
  formatDateDifference(other: ProperDateInterface): string;
  getTime(): number;
  toString(): string;
  toJSON(): string;
  toDate(): Date;
  toUTCDatetime(): Date;
  getTime(): number;
  add(n: number, period: Period): ProperDateInterface;
  subtract(n: number, period: Period): ProperDateInterface;
  addDays(days: number): ProperDateInterface;
  getDateNDaysAgo(n: number): ProperDateInterface;
  getDateNMonthsAgo(n: number): ProperDateInterface;
  getDateNYearsAgo(n: number): ProperDateInterface;
  getEndOfNMonthsAgo(n: number): ProperDateInterface;
  getEndOfNYearsAgo(n: number): ProperDateInterface;
}
