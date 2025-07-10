import ProperDate from "../lib";
import { add, difference, subtract } from "../lib/arithmetic";
import { expectEqualProperDates } from "./support/matchers";

describe("arithmetic", () => {
  // TODO: Review these results, particularly months-related logic: https://github.com/still-forest/proper-date.js/issues/22
  describe("add", () => {
    test("by default, returns ProperDate with days added", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(add(base, 1), new ProperDate("2023-12-26"));
      expectEqualProperDates(add(base, 2), new ProperDate("2023-12-27"));
      expectEqualProperDates(add(base, 10), new ProperDate("2024-01-04"));
      expectEqualProperDates(add(base, 365), new ProperDate("2024-12-24"));
    });

    test("with days, returns ProperDate with days added", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(add(base, 1, { period: "day" }), new ProperDate("2023-12-26"));
      expectEqualProperDates(add(base, 2, { period: "days" }), new ProperDate("2023-12-27"));
      expectEqualProperDates(add(base, 10, { period: "days" }), new ProperDate("2024-01-04"));
      expectEqualProperDates(add(base, 365, { period: "days" }), new ProperDate("2024-12-24"));
    });

    test("with months, returns ProperDate with months added", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(add(base, 1, { period: "month" }), new ProperDate("2024-01-25"));
      expectEqualProperDates(add(base, 2, { period: "months" }), new ProperDate("2024-02-25"));
      expectEqualProperDates(add(base, 10, { period: "months" }), new ProperDate("2024-10-25"));
      expectEqualProperDates(add(base, 120, { period: "months" }), new ProperDate("2033-12-25"));
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-01-31");
      expectEqualProperDates(add(base, 1, { period: "month" }), new ProperDate("2023-02-28"));
      expectEqualProperDates(add(base, 13, { period: "months" }), new ProperDate("2024-02-29"));

      const thirtyDayMonth = new ProperDate("2023-04-30");
      expectEqualProperDates(add(thirtyDayMonth, 1, { period: "month" }), new ProperDate("2023-05-30"));
    });

    test("with years, returns ProperDate with years added", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(add(base, 1, { period: "year" }), new ProperDate("2024-12-25"));
      expectEqualProperDates(add(base, 2, { period: "years" }), new ProperDate("2025-12-25"));
      expectEqualProperDates(add(base, 10, { period: "years" }), new ProperDate("2033-12-25"));
      expectEqualProperDates(add(base, 120, { period: "years" }), new ProperDate("2143-12-25"));
    });

    // TODO: Review this leap year handling: https://github.com/still-forest/proper-date.js/issues/23
    test("leap day as base handling", () => {
      const leapDay = new ProperDate("2020-02-29");

      expectEqualProperDates(add(leapDay, 1, { period: "day" }), new ProperDate("2020-03-01"));
      expectEqualProperDates(add(leapDay, 365, { period: "days" }), new ProperDate("2021-02-28"));
      expectEqualProperDates(add(leapDay, 1461, { period: "days" }), new ProperDate("2024-02-29"));

      expectEqualProperDates(add(leapDay, 1, { period: "month" }), new ProperDate("2020-03-29"));
      expectEqualProperDates(add(leapDay, 12, { period: "months" }), new ProperDate("2021-02-28"));
      expectEqualProperDates(add(leapDay, 48, { period: "months" }), new ProperDate("2024-02-29"));
      expectEqualProperDates(add(leapDay, 60, { period: "months" }), new ProperDate("2025-02-28"));

      expectEqualProperDates(add(leapDay, 1, { period: "year" }), new ProperDate("2021-03-01"));
      expectEqualProperDates(add(leapDay, 4, { period: "years" }), new ProperDate("2024-02-29"));
      expectEqualProperDates(add(leapDay, 5, { period: "years" }), new ProperDate("2025-03-01"));
    });

    test("leap year as result handling", () => {
      const dayBeforeLeapDay = new ProperDate("2020-02-28");
      const monthBeforeLeapDay = new ProperDate("2020-01-30");

      expectEqualProperDates(add(dayBeforeLeapDay, 1, { period: "day" }), new ProperDate("2020-02-29"));

      expectEqualProperDates(add(monthBeforeLeapDay, 1, { period: "month" }), new ProperDate("2020-02-29"));
      expectEqualProperDates(add(monthBeforeLeapDay, 13, { period: "months" }), new ProperDate("2021-02-28"));
      expectEqualProperDates(add(monthBeforeLeapDay, 49, { period: "months" }), new ProperDate("2024-02-29"));
      expectEqualProperDates(add(monthBeforeLeapDay, 61, { period: "months" }), new ProperDate("2025-02-28"));
    });

    test("with zero and negative values", () => {
      const base = new ProperDate("2023-12-25");

      expectEqualProperDates(add(base, 0, { period: "days" }), base);
      expectEqualProperDates(add(base, 0, { period: "months" }), base);
      expectEqualProperDates(add(base, 0, { period: "years" }), base);

      expectEqualProperDates(add(base, -1, { period: "days" }), new ProperDate("2023-12-24"));
      expectEqualProperDates(add(base, -1, { period: "months" }), new ProperDate("2023-11-25"));
      expectEqualProperDates(add(base, -1, { period: "year" }), new ProperDate("2022-12-25"));
    });

    test("throws error for unsupported period", () => {
      const base = new ProperDate();
      // @ts-expect-error Testing invalid input
      expect(() => add(base, 1, { period: "minutes" })).toThrow("Period 'minutes' is not supported");

      expect(() => add(base, 1.5, { period: "days" })).toThrow("Value '1.5' is not an integer");
    });
  });

  // TODO: compare this to what ruby does
  describe("subtract", () => {
    test("by default, returns ProperDate with days subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(subtract(base, 1), new ProperDate("2023-12-24"));
      expectEqualProperDates(subtract(base, 2), new ProperDate("2023-12-23"));
      expectEqualProperDates(subtract(base, 10), new ProperDate("2023-12-15"));
      expectEqualProperDates(subtract(base, 365), new ProperDate("2022-12-25"));
    });

    test("with days, returns ProperDate with days subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(subtract(base, 1, { period: "day" }), new ProperDate("2023-12-24"));
      expectEqualProperDates(subtract(base, 2, { period: "days" }), new ProperDate("2023-12-23"));
      expectEqualProperDates(subtract(base, 10, { period: "days" }), new ProperDate("2023-12-15"));
      expectEqualProperDates(subtract(base, 365, { period: "days" }), new ProperDate("2022-12-25"));
    });

    test("with months, returns ProperDate with months subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(subtract(base, 1, { period: "month" }), new ProperDate("2023-11-25"));
      expectEqualProperDates(subtract(base, 2, { period: "months" }), new ProperDate("2023-10-25"));
      expectEqualProperDates(subtract(base, 10, { period: "months" }), new ProperDate("2023-02-25"));
      expectEqualProperDates(subtract(base, 120, { period: "months" }), new ProperDate("2013-12-25"));
    });

    test("with months, overlaps months properly", () => {
      const base = new ProperDate("2023-03-31");
      expectEqualProperDates(subtract(base, 1, { period: "month" }), new ProperDate("2023-02-28"));
      expectEqualProperDates(subtract(base, 13, { period: "months" }), new ProperDate("2022-02-28"));

      const thirtyDayMonth = new ProperDate("2023-04-30");
      expectEqualProperDates(subtract(thirtyDayMonth, 1, { period: "month" }), new ProperDate("2023-03-30"));
    });

    test("with years, returns ProperDate with years subtracted", () => {
      const base = new ProperDate("2023-12-25");
      expectEqualProperDates(subtract(base, 1, { period: "year" }), new ProperDate("2022-12-25"));
      expectEqualProperDates(subtract(base, 2, { period: "years" }), new ProperDate("2021-12-25"));
      expectEqualProperDates(subtract(base, 10, { period: "years" }), new ProperDate("2013-12-25"));
      expectEqualProperDates(subtract(base, 120, { period: "years" }), new ProperDate("1903-12-25"));
    });

    // TODO: Review this leap year handling: https://github.com/still-forest/proper-date.js/issues/23
    test("leap day as base handling", () => {
      const leapDay = new ProperDate("2020-02-29");

      expectEqualProperDates(subtract(leapDay, 1, { period: "day" }), new ProperDate("2020-02-28"));
      expectEqualProperDates(subtract(leapDay, 365, { period: "days" }), new ProperDate("2019-03-01"));
      expectEqualProperDates(subtract(leapDay, 1461, { period: "days" }), new ProperDate("2016-02-29"));

      expectEqualProperDates(subtract(leapDay, 1, { period: "month" }), new ProperDate("2020-01-29"));
      expectEqualProperDates(subtract(leapDay, 12, { period: "months" }), new ProperDate("2019-02-28"));
      expectEqualProperDates(subtract(leapDay, 48, { period: "months" }), new ProperDate("2016-02-29"));
      expectEqualProperDates(subtract(leapDay, 60, { period: "months" }), new ProperDate("2015-02-28"));

      expectEqualProperDates(subtract(leapDay, 1, { period: "year" }), new ProperDate("2019-03-01"));
      expectEqualProperDates(subtract(leapDay, 4, { period: "years" }), new ProperDate("2016-02-29"));
      expectEqualProperDates(subtract(leapDay, 5, { period: "years" }), new ProperDate("2015-03-01"));
    });

    test("leap year as result handling", () => {
      const dayAfterLeapDay = new ProperDate("2020-03-01");
      const monthAfterLeapDay = new ProperDate("2020-03-29");

      expectEqualProperDates(subtract(dayAfterLeapDay, 1, { period: "day" }), new ProperDate("2020-02-29"));

      expectEqualProperDates(subtract(monthAfterLeapDay, 1, { period: "month" }), new ProperDate("2020-02-29"));
      expectEqualProperDates(subtract(monthAfterLeapDay, 13, { period: "months" }), new ProperDate("2019-02-28"));
      expectEqualProperDates(subtract(monthAfterLeapDay, 49, { period: "months" }), new ProperDate("2016-02-29"));
      expectEqualProperDates(subtract(monthAfterLeapDay, 61, { period: "months" }), new ProperDate("2015-02-28"));
    });

    test("with zero and negative values", () => {
      const base = new ProperDate("2023-12-25");

      expectEqualProperDates(subtract(base, 0, { period: "days" }), base);
      expectEqualProperDates(subtract(base, 0, { period: "months" }), base);
      expectEqualProperDates(subtract(base, 0, { period: "years" }), base);

      expectEqualProperDates(subtract(base, -1, { period: "days" }), new ProperDate("2023-12-26"));
      expectEqualProperDates(subtract(base, -1, { period: "months" }), new ProperDate("2024-01-25"));
      expectEqualProperDates(subtract(base, -1, { period: "year" }), new ProperDate("2024-12-25"));
    });

    test("throws error for unsupported period", () => {
      const base = new ProperDate();
      // @ts-expect-error Testing invalid input
      expect(() => subtract(base, 1, { period: "minutes" })).toThrow("Period 'minutes' is not supported");
    });
  });

  describe(".difference", () => {
    const base = new ProperDate("2023-12-25");

    test("returns the number of days between two dates", () => {
      expect(difference(base, new ProperDate(base))).toBe(0);
      expect(difference(base, new ProperDate("2023-12-25"))).toBe(0);
      expect(difference(base, new ProperDate("2023-12-26"))).toBe(1);
      expect(difference(base, new ProperDate("2023-12-24"))).toBe(1);

      expect(difference(base, new ProperDate("2024-01-24"))).toBe(30);
      expect(difference(base, new ProperDate("2022-12-25"))).toBe(365);

      // leap year
      const dayAfterLeapDay = new ProperDate("2020-03-01");
      expect(difference(dayAfterLeapDay, new ProperDate("2021-03-01"))).toBe(365);
      expect(difference(dayAfterLeapDay, new ProperDate("2019-03-01"))).toBe(366);
    });

    test("including daylight savings time shifts", () => {
      const start = new ProperDate("2024-12-25");
      const end = new ProperDate("2025-04-10");
      expect(difference(start, end)).toBe(106);
    });

    test("throws an error for unsupported units", () => {
      // @ts-expect-error Testing invalid input
      expect(() => difference(base, new ProperDate(), { period: "hours" })).toThrow("Unsupported option: period=hours");
    });
  });
});
