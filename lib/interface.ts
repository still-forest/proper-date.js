import type { PeriodType } from "./types";

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
  add(n: number, period: PeriodType): ProperDateInterface;
  subtract(n: number, period: PeriodType): ProperDateInterface;
  addDays(days: number): ProperDateInterface;
  getDateNDaysAgo(n: number): ProperDateInterface;
  getDateNMonthsAgo(n: number): ProperDateInterface;
  getDateNYearsAgo(n: number): ProperDateInterface;
  getEndOfNMonthsAgo(n: number): ProperDateInterface;
  getEndOfNYearsAgo(n: number): ProperDateInterface;
}
