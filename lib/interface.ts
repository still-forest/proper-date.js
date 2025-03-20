import type { Period } from "./types";

export interface ProperDateInterface {
  year: number;
  month: number;
  day: number;
  formatted: string;
  priorYearEnd: ProperDateInterface;
  priorMonthEnd: ProperDateInterface;
  equals(other: ProperDateInterface): boolean;
  getTime(): number; // deprecated
  toString(): string;
  toJSON(): string;
  toDate(): Date;
  add(n: number, period: Period): ProperDateInterface;
  subtract(n: number, period: Period): ProperDateInterface;
}
