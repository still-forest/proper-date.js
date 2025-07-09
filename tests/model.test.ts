import ProperDate from "../lib";
import { expectEqualDates } from "./support/matchers";

describe("model", () => {
  describe("constructor", () => {
    test("with a yyyy-mm-dd formatted string", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.toString()).toStrictEqual("2023-12-25");
      expect(subject.toDate()).toStrictEqual(new Date("2023-12-25T00:00:00.000Z"));
      expect(subject.year).toStrictEqual(2023);
      expect(subject.month).toStrictEqual(11);
      expect(subject.day).toStrictEqual(25);
    });

    test("with a JavaScript date", () => {
      const date = new Date("2023-12-25");
      const subject = new ProperDate(date);
      expect(subject.toString()).toStrictEqual("2023-12-25");
      expect(subject.toDate()).toStrictEqual(new Date("2023-12-25T00:00:00.000Z"));
      expect(subject.year).toStrictEqual(2023);
      expect(subject.month).toStrictEqual(11);
      expect(subject.day).toStrictEqual(25);
    });

    test("with a ProperDate", () => {
      const properDate = new ProperDate("2023-12-25");
      const subject = new ProperDate(properDate);
      expect(subject.toString()).toStrictEqual("2023-12-25");
      expect(subject.toDate()).toStrictEqual(new Date("2023-12-25T00:00:00.000Z"));
      expect(subject.year).toStrictEqual(2023);
      expect(subject.month).toStrictEqual(11);
      expect(subject.day).toStrictEqual(25);
    });
  });

  describe("comparison", () => {
    test("sorts in order", () => {
      const dates = [
        new ProperDate("2023-12-25"),
        new ProperDate("2024-12-20"),
        new ProperDate("2023-12-24"),
        new ProperDate("2023-12-26"),
      ];
      expect(dates.sort()).toEqual([
        new ProperDate("2023-12-24"),
        new ProperDate("2023-12-25"),
        new ProperDate("2023-12-26"),
        new ProperDate("2024-12-20"),
      ]);
    });

    test("compares correctly", () => {
      const dec_25_2023 = new ProperDate("2023-12-25");
      const dec_24_2023 = new ProperDate("2023-12-24");
      const dec_20_2024 = new ProperDate("2024-12-20");

      expect(dec_24_2023 > dec_25_2023).toBe(false);
      expect(dec_24_2023 < dec_25_2023).toBe(true);

      expect(dec_20_2024 < dec_25_2023).toBe(false);
      expect(dec_20_2024 > dec_25_2023).toBe(true);
    });
  });

  describe("#equals", () => {
    test("returns true if the dates are equal", () => {
      const subject = new ProperDate("2023-12-25");

      expectEqualDates(subject, new ProperDate("2023-12-25"))
      expect(subject.equals(new ProperDate(new Date("2023-12-25")))).toStrictEqual(true);
      expect(subject.equals(new ProperDate(new Date(Date.UTC(2023, 11, 25))))).toStrictEqual(true);
    });

    test("returns false when the dates are not equal", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.equals(new ProperDate("2023-12-24"))).toBe(false);
      expect(subject.equals(new ProperDate(new Date("2023-12-24")))).toBe(false);
      expect(subject.equals(new ProperDate(new Date(Date.UTC(2023, 11, 24))))).toBe(false);
    });
  });

  describe("#formatted", () => {
    test("returns the date as a string", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.formatted).toStrictEqual("2023-12-25");
    });
  });

  describe("#toJSON", () => {
    test("returns the date as a string", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.toJSON()).toStrictEqual("2023-12-25");
    });
  });

  describe("#add", () => {
    test("adds days, months, or years to the date, returning a new ProperDate", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.add(1, "day"), new ProperDate("2023-12-26"));
      expectEqualDates(subject.add(2, "months"), new ProperDate("2024-02-25"));
      expectEqualDates(subject.add(10, "years"), new ProperDate("2033-12-25"));
    });

    test("accepts an option object", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.add(1, { period: "day" }), new ProperDate("2023-12-26"));
      expectEqualDates(subject.add(2, { period: "months" }), new ProperDate("2024-02-25"));
      expectEqualDates(subject.add(10, { period: "years" }), new ProperDate("2033-12-25"));
    });
  });

  describe("#subtract", () => {
    test("subtracts days, months, or years to the date, returning a new ProperDate", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.subtract(1, "day"), new ProperDate("2023-12-24"));
      expectEqualDates(subject.subtract(2, "months"), new ProperDate("2023-10-25"));
      expectEqualDates(subject.subtract(10, "years"), new ProperDate("2013-12-25"));
    });

    test("accepts an option object", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.subtract(1, { period: "day" }), new ProperDate("2023-12-24"));
      expectEqualDates(subject.subtract(2, { period: "months" }), new ProperDate("2023-10-25"));
      expectEqualDates(subject.subtract(10, { period: "years" }), new ProperDate("2013-12-25"));
    });
  });

  describe("#difference", () => {
    const subject = new ProperDate("2023-12-25");

    test("returns the number of days between another dates", () => {
      expect(subject.difference(new ProperDate(subject))).toBe(0);
      expect(subject.difference(new ProperDate("2023-12-26"))).toBe(1);
      expect(subject.difference(new ProperDate("2023-12-24"))).toBe(1);
    });

    test("throws an error for unsupported units", () => {
      // @ts-expect-error Testing invalid input
      expect(() => subject.difference(new ProperDate(), { period: "hours" })).toThrow(
        "Unsupported option: period=hours",
      );
    });
  });

  describe("#priorYearEnd", () => {
    test("returns a ProperDate for 12/31 of the prior year", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.priorYearEnd, new ProperDate("2022-12-31"));
    });
  });

  describe("#priorMonthEnd", () => {
    test("returns a ProperDate for the end of the prior month", () => {
      const subject = new ProperDate("2023-12-25");
      expectEqualDates(subject.priorMonthEnd, new ProperDate("2023-11-30"));
    });
  });

  describe("#endOfMonth", () => {
    test("returns a ProperDate for the last day of the given month", () => {
      expectEqualDates(new ProperDate("2023-12-25").endOfMonth, new ProperDate("2023-12-31"));
      expectEqualDates(new ProperDate("2023-12-31").endOfMonth, new ProperDate("2023-12-31"));
      expectEqualDates(new ProperDate("2025-11-11").endOfMonth, new ProperDate("2025-11-30"));

      // February
      expectEqualDates(new ProperDate("2024-02-01").endOfMonth, new ProperDate("2024-02-29"));
      expectEqualDates(new ProperDate("2023-02-01").endOfMonth, new ProperDate("2023-02-28"));
    });
  });

  describe("#endOfYear", () => {
    test("returns a ProperDate for 12/31 of the given year", () => {
      expectEqualDates(new ProperDate("2023-12-25").endOfYear, new ProperDate("2023-12-31"));
      expectEqualDates(new ProperDate("2023-12-31").endOfYear, new ProperDate("2023-12-31"));
      expectEqualDates(new ProperDate("2025-11-11").endOfYear, new ProperDate("2025-12-31"));
      expectEqualDates(new ProperDate("1981-01-01").endOfYear, new ProperDate("1981-12-31"));
      expectEqualDates(new ProperDate("1981-01-01").endOfYear, new ProperDate("1981-12-31"));
    });
  });
});

describe("ProperDate collection", () => {
  test("sort() works as expected", () => {
    const dates = [
      new ProperDate("2021-07-22"),
      new ProperDate("2023-01-01"),
      new ProperDate("2024-10-15"),
      new ProperDate("2023-02-01"),
      new ProperDate("2022-12-31"),
    ];
    const expectedDates = [
      new ProperDate("2021-07-22"),
      new ProperDate("2022-12-31"),
      new ProperDate("2023-01-01"),
      new ProperDate("2023-02-01"),
      new ProperDate("2024-10-15"),
    ];

    expect(dates.slice().sort()).toEqual(expectedDates);
  });
});
