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
  getTime(): number;
  add(n: number, period: Period): ProperDateInterface;
  subtract(n: number, period: Period): ProperDateInterface;
}
