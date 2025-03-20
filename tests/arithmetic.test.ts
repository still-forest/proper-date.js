import { describe, expect, test } from "vitest";
import ProperDate from "../lib";
import { add, subtract } from "../lib/arithmetic";
import type { Period } from "../lib/types";

describe("arithmetic", () => {
  // TODO: Review these results, particularly months-related logic: https://github.com/jszymanowski/proper-date.js/issues/22
  describe("add", () => {
    test("with days, returns ProperDate with days added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, "day")).toStrictEqual(new ProperDate("2023-12-26"));
      expect(add(base, 2, "days")).toStrictEqual(new ProperDate("2023-12-27"));
      expect(add(base, 10, "days")).toStrictEqual(new ProperDate("2024-01-04"));
      expect(add(base, 365, "days")).toStrictEqual(new ProperDate("2024-12-24"));
    });

    test("with months, returns ProperDate with months added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, "month")).toStrictEqual(new ProperDate("2024-01-25"));
      expect(add(base, 2, "months")).toStrictEqual(new ProperDate("2024-02-25"));
      expect(add(base, 10, "months")).toStrictEqual(new ProperDate("2024-10-25"));
      expect(add(base, 120, "months")).toStrictEqual(new ProperDate("2033-12-25"));
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-01-31");
      expect(add(base, 1, "month")).toStrictEqual(new ProperDate("2023-02-28"));
      expect(add(base, 13, "months")).toStrictEqual(new ProperDate("2024-02-29"));

      const thirtyDayMonth = new ProperDate("2023-04-30");
      expect(add(thirtyDayMonth, 1, "month")).toStrictEqual(new ProperDate("2023-05-30"));
    });

    test("with years, returns ProperDate with years added", () => {
      const base = new ProperDate("2023-12-25");
      expect(add(base, 1, "year")).toStrictEqual(new ProperDate("2024-12-25"));
      expect(add(base, 2, "years")).toStrictEqual(new ProperDate("2025-12-25"));
      expect(add(base, 10, "years")).toStrictEqual(new ProperDate("2033-12-25"));
      expect(add(base, 120, "years")).toStrictEqual(new ProperDate("2143-12-25"));
    });

    // TODO: Review this leap year handling: https://github.com/jszymanowski/proper-date.js/issues/23
    test("leap day as base handling", () => {
      const leapDay = new ProperDate("2020-02-29");

      expect(add(leapDay, 1, "day")).toStrictEqual(new ProperDate("2020-03-01"));
      expect(add(leapDay, 365, "days")).toStrictEqual(new ProperDate("2021-02-28"));
      expect(add(leapDay, 1461, "days")).toStrictEqual(new ProperDate("2024-02-29"));

      expect(add(leapDay, 1, "month")).toStrictEqual(new ProperDate("2020-03-29"));
      expect(add(leapDay, 12, "months")).toStrictEqual(new ProperDate("2021-02-28"));
      expect(add(leapDay, 48, "months")).toStrictEqual(new ProperDate("2024-02-29"));
      expect(add(leapDay, 60, "months")).toStrictEqual(new ProperDate("2025-02-28"));

      expect(add(leapDay, 1, "year")).toStrictEqual(new ProperDate("2021-03-01"));
      expect(add(leapDay, 4, "years")).toStrictEqual(new ProperDate("2024-02-29"));
      expect(add(leapDay, 5, "years")).toStrictEqual(new ProperDate("2025-03-01"));
    });

    test("leap year as result handling", () => {
      const dayBeforeLeapDay = new ProperDate("2020-02-28");
      const monthBeforeLeapDay = new ProperDate("2020-01-30");

      expect(add(dayBeforeLeapDay, 1, "day")).toStrictEqual(new ProperDate("2020-02-29"));

      expect(add(monthBeforeLeapDay, 1, "month")).toStrictEqual(new ProperDate("2020-02-29"));
      expect(add(monthBeforeLeapDay, 13, "months")).toStrictEqual(new ProperDate("2021-02-28"));
      expect(add(monthBeforeLeapDay, 49, "months")).toStrictEqual(new ProperDate("2024-02-29"));
      expect(add(monthBeforeLeapDay, 61, "months")).toStrictEqual(new ProperDate("2025-02-28"));
    });

    test("with zero and negative values", () => {
      const base = new ProperDate("2023-12-25");

      expect(add(base, 0, "days")).toStrictEqual(base);
      expect(add(base, 0, "months")).toStrictEqual(base);
      expect(add(base, 0, "years")).toStrictEqual(base);

      expect(add(base, -1, "days")).toStrictEqual(new ProperDate("2023-12-24"));
      expect(add(base, -1, "months")).toStrictEqual(new ProperDate("2023-11-25"));
      expect(add(base, -1, "years")).toStrictEqual(new ProperDate("2022-12-25"));
    });

    test("throws error for unsupported period", () => {
      const base = new ProperDate();
      expect(() => add(base, 1, "minutes" as Period)).toThrowError(
        "Period 'minutes' is not supported",
      );

      expect(() => add(base, 1.5, "days")).toThrowError("Value '1.5' is not an integer");
    });
  });

  // TODO: compare this to what ruby does
  describe("subtract", () => {
    test("with days, returns ProperDate with days subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, "day")).toStrictEqual(new ProperDate("2023-12-24"));
      expect(subtract(base, 2, "days")).toStrictEqual(new ProperDate("2023-12-23"));
      expect(subtract(base, 10, "days")).toStrictEqual(new ProperDate("2023-12-15"));
      expect(subtract(base, 365, "days")).toStrictEqual(new ProperDate("2022-12-25"));
    });

    test("with months, returns ProperDate with months subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, "month")).toStrictEqual(new ProperDate("2023-11-25"));
      expect(subtract(base, 2, "months")).toStrictEqual(new ProperDate("2023-10-25"));
      expect(subtract(base, 10, "months")).toStrictEqual(new ProperDate("2023-02-25"));
      expect(subtract(base, 120, "months")).toStrictEqual(new ProperDate("2013-12-25"));
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-03-31");
      expect(subtract(base, 1, "month")).toStrictEqual(new ProperDate("2023-02-28"));
      expect(subtract(base, 13, "months")).toStrictEqual(new ProperDate("2022-02-28"));

      const thirtyDayMonth = new ProperDate("2023-04-30");
      expect(subtract(thirtyDayMonth, 1, "month")).toStrictEqual(new ProperDate("2023-03-30"));
    });

    test("with years, returns ProperDate with years subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expect(subtract(base, 1, "year")).toStrictEqual(new ProperDate("2022-12-25"));
      expect(subtract(base, 2, "years")).toStrictEqual(new ProperDate("2021-12-25"));
      expect(subtract(base, 10, "years")).toStrictEqual(new ProperDate("2013-12-25"));
      expect(subtract(base, 120, "years")).toStrictEqual(new ProperDate("1903-12-25"));
    });

    // TODO: Review this leap year handling: https://github.com/jszymanowski/proper-date.js/issues/23
    test("leap day as base handling", () => {
      const leapDay = new ProperDate("2020-02-29");

      expect(subtract(leapDay, 1, "day")).toStrictEqual(new ProperDate("2020-02-28"));
      expect(subtract(leapDay, 365, "days")).toStrictEqual(new ProperDate("2019-03-01"));
      expect(subtract(leapDay, 1461, "days")).toStrictEqual(new ProperDate("2016-02-29"));

      expect(subtract(leapDay, 1, "month")).toStrictEqual(new ProperDate("2020-01-29"));
      expect(subtract(leapDay, 12, "months")).toStrictEqual(new ProperDate("2019-02-28"));
      expect(subtract(leapDay, 48, "months")).toStrictEqual(new ProperDate("2016-02-29"));
      expect(subtract(leapDay, 60, "months")).toStrictEqual(new ProperDate("2015-02-28"));

      expect(subtract(leapDay, 1, "year")).toStrictEqual(new ProperDate("2019-03-01"));
      expect(subtract(leapDay, 4, "years")).toStrictEqual(new ProperDate("2016-02-29"));
      expect(subtract(leapDay, 5, "years")).toStrictEqual(new ProperDate("2015-03-01"));
    });

    test("leap year as result handling", () => {
      const dayAfterLeapDay = new ProperDate("2020-03-01");
      const monthAfterLeapDay = new ProperDate("2020-03-29");

      expect(subtract(dayAfterLeapDay, 1, "day")).toStrictEqual(new ProperDate("2020-02-29"));

      expect(subtract(monthAfterLeapDay, 1, "month")).toStrictEqual(new ProperDate("2020-02-29"));
      expect(subtract(monthAfterLeapDay, 13, "months")).toStrictEqual(new ProperDate("2019-02-28"));
      expect(subtract(monthAfterLeapDay, 49, "months")).toStrictEqual(new ProperDate("2016-02-29"));
      expect(subtract(monthAfterLeapDay, 61, "months")).toStrictEqual(new ProperDate("2015-02-28"));
    });

    test("with zero and negative values", () => {
      const base = new ProperDate("2023-12-25");

      expect(subtract(base, 0, "days")).toStrictEqual(base);
      expect(subtract(base, 0, "months")).toStrictEqual(base);
      expect(subtract(base, 0, "years")).toStrictEqual(base);

      expect(subtract(base, -1, "days")).toStrictEqual(new ProperDate("2023-12-26"));
      expect(subtract(base, -1, "months")).toStrictEqual(new ProperDate("2024-01-25"));
      expect(subtract(base, -1, "years")).toStrictEqual(new ProperDate("2024-12-25"));
    });

    test("throws error for unsupported period", () => {
      const base = new ProperDate();
      expect(() => subtract(base, 1, "minutes" as Period)).toThrowError(
        "Period 'minutes' is not supported",
      );
    });
  });
});
