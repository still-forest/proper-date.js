import { describe, expect, test } from "vitest";
import ProperDate from "../lib";
import { add, subtract } from "../lib/arithmetic";
import { Period } from "../lib/types";

describe("arithmetic", () => {
  // TODO: Review these results, particularly months-related logic: https://github.com/jszymanowski/proper-date.js/issues/22
  describe("add", () => {
    test("with days, returns ProperDate with days added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, Period.Day)).toStrictEqual(
        new ProperDate("2023-12-26")
      );
      expect(add(base, 2, Period.Days)).toStrictEqual(
        new ProperDate("2023-12-27")
      );
      expect(add(base, 10, Period.Days)).toStrictEqual(
        new ProperDate("2024-01-04")
      );
      expect(add(base, 365, Period.Days)).toStrictEqual(
        new ProperDate("2024-12-24")
      );
    });

    test("with months, returns ProperDate with months added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, Period.Month)).toStrictEqual(
        new ProperDate("2024-01-25")
      );
      expect(add(base, 2, Period.Months)).toStrictEqual(
        new ProperDate("2024-02-25")
      );
      expect(add(base, 10, Period.Months)).toStrictEqual(
        new ProperDate("2024-10-25")
      );
      expect(add(base, 120, Period.Months)).toStrictEqual(
        new ProperDate("2033-12-25")
      );
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-01-31");
      expect(add(base, 1, Period.Month)).toStrictEqual(
        new ProperDate("2023-02-28")
      );
      expect(add(base, 13, Period.Months)).toStrictEqual(
        new ProperDate("2024-02-29")
      );
    });

    test("with years, returns ProperDate with years added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, Period.Year)).toStrictEqual(
        new ProperDate("2024-12-25")
      );
      expect(add(base, 2, Period.Years)).toStrictEqual(
        new ProperDate("2025-12-25")
      );
      expect(add(base, 10, Period.Years)).toStrictEqual(
        new ProperDate("2033-12-25")
      );
      expect(add(base, 120, Period.Years)).toStrictEqual(
        new ProperDate("2143-12-25")
      );
    });
  });

  // TODO: compare this to what ruby does
  describe("subtract", () => {
    test("with days, returns ProperDate with days subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, Period.Day)).toStrictEqual(
        new ProperDate("2023-12-24")
      );
      expect(subtract(base, 2, Period.Days)).toStrictEqual(
        new ProperDate("2023-12-23")
      );
      expect(subtract(base, 10, Period.Days)).toStrictEqual(
        new ProperDate("2023-12-15")
      );
      expect(subtract(base, 365, Period.Days)).toStrictEqual(
        new ProperDate("2022-12-25")
      );
    });

    test("with months, returns ProperDate with months subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, Period.Month)).toStrictEqual(
        new ProperDate("2023-11-25")
      );
      expect(subtract(base, 2, Period.Months)).toStrictEqual(
        new ProperDate("2023-10-25")
      );
      expect(subtract(base, 10, Period.Months)).toStrictEqual(
        new ProperDate("2023-02-25")
      );
      expect(subtract(base, 120, Period.Months)).toStrictEqual(
        new ProperDate("2013-12-25")
      );
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-03-31");
      expect(subtract(base, 1, Period.Month)).toStrictEqual(
        new ProperDate("2023-02-28")
      );
      expect(subtract(base, 13, Period.Months)).toStrictEqual(
        new ProperDate("2022-02-28")
      );
    });

    test("with years, returns ProperDate with years subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, Period.Year)).toStrictEqual(
        new ProperDate("2022-12-25")
      );
      expect(subtract(base, 2, Period.Years)).toStrictEqual(
        new ProperDate("2021-12-25")
      );
      expect(subtract(base, 10, Period.Years)).toStrictEqual(
        new ProperDate("2013-12-25")
      );
      expect(subtract(base, 120, Period.Years)).toStrictEqual(
        new ProperDate("1903-12-25")
      );
    });
  });
});
