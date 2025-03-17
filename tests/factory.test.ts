import { describe, expect, test } from "vitest";
import ProperDate from "../lib/model";
import { getToday, getYesterday } from "../lib/factory";

describe("factory", () => {
  describe("today", () => {
    test("returns a ProperDate instance for today's date", () => {
      // TODO: freeze time, making these more deterministic
      const subject = getToday();
      const now = new Date();
      const otherDate = new Date("1963-03-15");

      expect(subject.equals(new ProperDate(now))).toStrictEqual(true);
      expect(subject.equals(new ProperDate(otherDate))).toStrictEqual(false);
    });
  });

  describe("yesterday", () => {
    test("returns a ProperDate instance for yesterday's date", () => {
      // TODO: freeze time, making these more deterministic
      const subject = getYesterday();
      const now = new Date();
      const yesterdayDate = new Date(now);
      yesterdayDate.setDate(now.getDate() - 1);

      expect(subject.equals(new ProperDate(yesterdayDate))).toStrictEqual(true);
      expect(subject.equals(new ProperDate(now))).toStrictEqual(false);
    });
  });
});
