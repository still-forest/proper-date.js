import { describe, expect, test, vi } from "vitest";
import ProperDate from "../lib";

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

  describe(".compare", () => {
    test("should warn for experimental ProperDate.compare()", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      ProperDate.compare(new ProperDate(), new ProperDate());

      expect(warnSpy).toHaveBeenCalledWith(
        "EXPERIMENTAL: ProperDate.compare() is experimental and may be removed in a future release.",
      );
      warnSpy.mockRestore();
    });
  });

  describe("#equals", () => {
    test("returns true if the dates are equal", () => {
      const subject = new ProperDate("2023-12-25");

      expect(subject.equals(new ProperDate("2023-12-25"))).toStrictEqual(true);
      expect(subject.equals(new ProperDate(new Date("2023-12-25")))).toStrictEqual(true);
      expect(subject.equals(new ProperDate(new Date(Date.UTC(2023, 11, 25))))).toStrictEqual(true);
    });

    test("returns false when the dates are not equal", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.equals(new ProperDate("2023-12-24"))).toStrictEqual(false);
      expect(subject.equals(new ProperDate(new Date("2023-12-24")))).toStrictEqual(false);
      expect(subject.equals(new ProperDate(new Date(Date.UTC(2023, 11, 24))))).toStrictEqual(false);
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

  describe("#getTime", () => {
    test("should warn method is deprecated", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const date = new ProperDate("2022-12-31");
      expect(date.getTime()).toBe(1672444800000);

      expect(warnSpy).toHaveBeenCalledWith(
        "DEPRECATION WARNING: getTime() is deprecated and will be removed in a future release. Use toDate().getTime() instead.",
      );
      warnSpy.mockRestore();
    });
  });

  describe("#add", () => {
    test("adds days, months, or years to the date, returning a new ProperDate", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.add(1, "day")).toStrictEqual(new ProperDate("2023-12-26"));
      expect(subject.add(2, "months")).toStrictEqual(new ProperDate("2024-02-25"));
      expect(subject.add(10, "years")).toStrictEqual(new ProperDate("2033-12-25"));
    });

    test("accepts an option object", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.add(1, { period: "day" })).toStrictEqual(new ProperDate("2023-12-26"));
      expect(subject.add(2, { period: "months" })).toStrictEqual(new ProperDate("2024-02-25"));
      expect(subject.add(10, { period: "years" })).toStrictEqual(new ProperDate("2033-12-25"));
    });
  });

  describe("#subtract", () => {
    test("subtracts days, months, or years to the date, returning a new ProperDate", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.subtract(1, "day")).toStrictEqual(new ProperDate("2023-12-24"));
      expect(subject.subtract(2, "months")).toStrictEqual(new ProperDate("2023-10-25"));
      expect(subject.subtract(10, "years")).toStrictEqual(new ProperDate("2013-12-25"));
    });

    test("accepts an option object", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.subtract(1, { period: "day" })).toStrictEqual(new ProperDate("2023-12-24"));
      expect(subject.subtract(2, { period: "months" })).toStrictEqual(new ProperDate("2023-10-25"));
      expect(subject.subtract(10, { period: "years" })).toStrictEqual(new ProperDate("2013-12-25"));
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
      expect(() => subject.difference(new ProperDate(), { period: "hours" })).toThrowError(
        "Unsupported option: period=hours",
      );
    });
  });

  describe("#priorYearEnd", () => {
    test("returns a ProperDate for 12/31 of the prior year", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.priorYearEnd).toStrictEqual(new ProperDate("2022-12-31"));
    });
  });

  describe("#priorMonthEnd", () => {
    test("returns a ProperDate for the end of the prior month", () => {
      const subject = new ProperDate("2023-12-25");
      expect(subject.priorMonthEnd).toStrictEqual(new ProperDate("2023-11-30"));
    });
  });

  describe("#endOfMonth", () => {
    test("returns a ProperDate for the last day of the given month", () => {
      expect(new ProperDate("2023-12-25").endOfMonth).toStrictEqual(new ProperDate("2023-12-31"));
      expect(new ProperDate("2023-12-31").endOfMonth).toStrictEqual(new ProperDate("2023-12-31"));
      expect(new ProperDate("2025-11-11").endOfMonth).toStrictEqual(new ProperDate("2025-11-30"));
      
      // February
      expect(new ProperDate("2024-02-01").endOfMonth).toStrictEqual(new ProperDate("2024-02-29"));
      expect(new ProperDate("2023-02-01").endOfMonth).toStrictEqual(new ProperDate("2023-02-28"));
    });
  });

  describe("#endOfYear", () => {
    test("returns a ProperDate for 12/31 of the given year", () => {
      expect(new ProperDate("2023-12-25").endOfYear).toStrictEqual(new ProperDate("2023-12-31"));
      expect(new ProperDate("2023-12-31").endOfYear).toStrictEqual(new ProperDate("2023-12-31"));
      expect(new ProperDate("2025-11-11").endOfYear).toStrictEqual(new ProperDate("2025-12-31"));
      expect(new ProperDate("1981-01-01").endOfYear).toStrictEqual(new ProperDate("1981-12-31"));      
    });
  });

  describe("#getEndOfNMonthsAgo", () => {
    test("returns a ProperDate for 12/31 of the prior year", () => {
      const subject = new ProperDate("2023-12-25");

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      subject.getEndOfNMonthsAgo(1)
      expect(warnSpy).toHaveBeenCalledWith(
        "DEPRECATION WARNING: getEndOfNMonthsAgo() is deprecated and will be removed in a future release. Use subtract(n, 'months').endOfMonth instead.",
      );
      warnSpy.mockRestore();

      expect(subject.getEndOfNMonthsAgo(1)).toStrictEqual(new ProperDate("2023-11-30"));
      expect(subject.getEndOfNMonthsAgo(2)).toStrictEqual(new ProperDate("2023-10-31"));
      expect(subject.getEndOfNMonthsAgo(10)).toStrictEqual(new ProperDate("2023-02-28"));
      
      const postLeapDay = new ProperDate("2024-03-01");
      expect(postLeapDay.getEndOfNMonthsAgo(1)).toStrictEqual(new ProperDate("2024-02-29"));
      expect(postLeapDay.getEndOfNMonthsAgo(13)).toStrictEqual(new ProperDate("2023-02-28"));

      // new pattern
      expect(subject.subtract(2, 'months').endOfMonth).toStrictEqual(new ProperDate("2023-10-31"));
      expect(postLeapDay.subtract(1, 'months').endOfMonth).toStrictEqual(new ProperDate("2024-02-29"));
    });
  });

  describe("#getEndOfNYearsAgo", () => {
    test("returns a ProperDate for 12/31 of the prior year", () => {
      const subject = new ProperDate("2023-12-25");

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      subject.getEndOfNYearsAgo(1)
      expect(warnSpy).toHaveBeenCalledWith(
        "DEPRECATION WARNING: getEndOfNYearsAgo() is deprecated and will be removed in a future release. Use subtract(n, 'years').endOfYear instead.",
      );
      warnSpy.mockRestore();

      expect(subject.getEndOfNYearsAgo(1)).toStrictEqual(new ProperDate("2022-12-31"));
      expect(subject.getEndOfNYearsAgo(2)).toStrictEqual(new ProperDate("2021-12-31"));
      expect(subject.getEndOfNYearsAgo(10)).toStrictEqual(new ProperDate("2013-12-31"));

      // new pattern
      expect(subject.subtract(2, 'years').endOfYear).toStrictEqual(new ProperDate("2021-12-31"));
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
