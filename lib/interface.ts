import type { Period } from "./types"

export interface ProperDateInterface {
  year: number
  month: number
  day: number
  formatted: string
  priorYearEnd: ProperDateInterface
  priorMonthEnd: ProperDateInterface
  equals(other: ProperDateInterface): boolean
  formatDateDifference(other: ProperDateInterface): string
  getTime(): number
  toString(): string
  toJSON(): string
  toDate(): Date
  toUTCDatetime(): Date // deprecated
  getTime(): number
  add(n: number, period: Period): ProperDateInterface
  subtract(n: number, period: Period): ProperDateInterface
  addDays(days: number): ProperDateInterface // deprecated
  getDateNDaysAgo(n: number): ProperDateInterface // deprecated
  getDateNMonthsAgo(n: number): ProperDateInterface // deprecated
  getDateNYearsAgo(n: number): ProperDateInterface // deprecated
  getEndOfNMonthsAgo(n: number): ProperDateInterface // deprecated
  getEndOfNYearsAgo(n: number): ProperDateInterface // deprecated
}
