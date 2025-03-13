import { describe, expect, test } from "vitest";
import { SimpleDate } from "../lib/model";

describe("SimpleDate", () => {
  describe("constructor", () => {
    test("with a yyyy-mm-dd formatted string", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.toString()).toStrictEqual("2023-12-25");
      expect(subject.toUTCDatetime()).toStrictEqual(
        new Date("2023-12-25T00:00:00.000Z"),
      );
      expect(subject.year).toStrictEqual(2023);
      expect(subject.month).toStrictEqual(11);
      expect(subject.day).toStrictEqual(25);
    });

    describe("with a JavaScript date, without a specific timezone", () => {
      test("when constructed from a string without time", () => {
        const date = new Date("2023-12-25");
        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-25");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-25T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(25);
      });

      test.skip("when constructed from a string with time", () => {
        // TODO: this is timezone dependent, needs to be stubbed

        const date = new Date("2023-12-25 00:00:00");
        expect(date.toString()).toStrictEqual(
          "Mon Dec 25 2023 00:00:00 GMT+0800 (Singapore Standard Time)",
        );

        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-25");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-25T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(25);
      });

      test("when constructed numerically", () => {
        const date = new Date(Date.UTC(2023, 11, 25));
        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-25");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-25T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(25);
      });
    });

    describe("with a JavaScript date and a specific timezone", () => {
      test("UTC/GMT", () => {
        const date = new Date("2023-12-25T00:00:00.000Z");
        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-25");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-25T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(25);
      });

      test("before UTC/GMT", () => {
        const date = new Date("2023-12-25T16:00:00.000-13:00");

        // When 16:00 at 25th in the -13:00 timezone, it's already after 00:00 on the 26th in UTC.
        // TODO: is the desirable behavior?  Or should it be 25?
        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-26");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-26T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(26);
      });

      test("ahead of UTC/GMT", () => {
        const date = new Date("2023-12-25T16:00:00.000+13:00");
        const subject = new SimpleDate(date);
        expect(subject.toString()).toStrictEqual("2023-12-25");
        expect(subject.toUTCDatetime()).toStrictEqual(
          new Date("2023-12-25T00:00:00.000Z"),
        );
        expect(subject.year).toStrictEqual(2023);
        expect(subject.month).toStrictEqual(11);
        expect(subject.day).toStrictEqual(25);
      });
    });

    test("with a SimpleDate", () => {
      const simpleDate = new SimpleDate("2023-12-25");
      const subject = new SimpleDate(simpleDate);
      expect(subject.toString()).toStrictEqual("2023-12-25");
      expect(subject.toUTCDatetime()).toStrictEqual(
        new Date("2023-12-25T00:00:00.000Z"),
      );
      expect(subject.year).toStrictEqual(2023);
      expect(subject.month).toStrictEqual(11);
      expect(subject.day).toStrictEqual(25);
    });
  });

  describe(".Today", () => {
    test("returns an instance for today's date", () => {
      const subject = SimpleDate.Today;
      const now = new Date();
      const otherDate = new Date("1963-03-15");

      expect(subject.equals(new SimpleDate(now))).toStrictEqual(true);
      expect(subject.equals(new SimpleDate(otherDate))).toStrictEqual(false);
    });
  });

  describe(".Yesterday", () => {
    test("returns an instance for yesterday's date", () => {
      const subject = SimpleDate.Yesterday;
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);

      expect(subject.equals(new SimpleDate(yesterday))).toStrictEqual(true);
      expect(subject.equals(new SimpleDate(now))).toStrictEqual(false);
    });
  });

  describe("#equals", () => {
    test("returns true if the dates are equal", () => {
      const subject = new SimpleDate("2023-12-25");

      expect(subject.equals(new SimpleDate("2023-12-25"))).toStrictEqual(true);
      expect(
        subject.equals(new SimpleDate(new Date("2023-12-25"))),
      ).toStrictEqual(true);
      expect(
        subject.equals(new SimpleDate(new Date(Date.UTC(2023, 11, 25)))),
      ).toStrictEqual(true);
    });

    test("returns false when the dates are not equal", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.equals(new SimpleDate("2023-12-24"))).toStrictEqual(false);
      expect(
        subject.equals(new SimpleDate(new Date("2023-12-24"))),
      ).toStrictEqual(false);
      expect(
        subject.equals(new SimpleDate(new Date(Date.UTC(2023, 11, 24)))),
      ).toStrictEqual(false);
    });
  });

  describe("#priorYearEnd", () => {
    test("returns a SimpleDate for 12/31 of the prior year", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.priorYearEnd).toStrictEqual(new SimpleDate("2022-12-31"));
    });
  });

  describe("#priorMonthEnd", () => {
    test("returns a SimpleDate for the end of the prior month", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.priorMonthEnd).toStrictEqual(new SimpleDate("2023-11-30"));
    });
  });

  describe("#addDays", () => {
    test("returns a SimpleDate with time advanced by provided number of days", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.addDays(1)).toStrictEqual(new SimpleDate("2023-12-26"));
      expect(subject.addDays(2)).toStrictEqual(new SimpleDate("2023-12-27"));
      expect(subject.addDays(10)).toStrictEqual(new SimpleDate("2024-01-04"));
      expect(subject.addDays(365)).toStrictEqual(new SimpleDate("2024-12-24"));
    });
  });

  describe("#getDateNDaysAgo", () => {
    test("returns a SimpleDate for 12/31 of the prior year", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.getDateNDaysAgo(1)).toStrictEqual(
        new SimpleDate("2023-12-24"),
      );
      expect(subject.getDateNDaysAgo(2)).toStrictEqual(
        new SimpleDate("2023-12-23"),
      );
      expect(subject.getDateNDaysAgo(10)).toStrictEqual(
        new SimpleDate("2023-12-15"),
      );
      expect(subject.getDateNDaysAgo(365)).toStrictEqual(
        new SimpleDate("2022-12-25"),
      );
    });
  });

  describe("#getDateNMonthsAgo", () => {
    test("returns a SimpleDate for 12/31 of the prior year", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.getDateNMonthsAgo(1)).toStrictEqual(
        new SimpleDate("2023-11-25"),
      );
      expect(subject.getDateNMonthsAgo(2)).toStrictEqual(
        new SimpleDate("2023-10-25"),
      );
      expect(subject.getDateNMonthsAgo(10)).toStrictEqual(
        new SimpleDate("2023-02-25"),
      );
      expect(subject.getDateNMonthsAgo(12)).toStrictEqual(
        new SimpleDate("2022-12-25"),
      );
    });
  });

  describe("#getDateNYearsAgo", () => {
    test("returns a SimpleDate for 12/31 of the prior year", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.getDateNYearsAgo(1)).toStrictEqual(
        new SimpleDate("2022-12-25"),
      );
      expect(subject.getDateNYearsAgo(2)).toStrictEqual(
        new SimpleDate("2021-12-25"),
      );
      expect(subject.getDateNYearsAgo(10)).toStrictEqual(
        new SimpleDate("2013-12-25"),
      );
    });
  });

  describe("#getEndOfNYearsAgo", () => {
    test("returns a SimpleDate for 12/31 of the prior year", () => {
      const subject = new SimpleDate("2023-12-25");
      expect(subject.getEndOfNYearsAgo(1)).toStrictEqual(
        new SimpleDate("2022-12-31"),
      );
      expect(subject.getEndOfNYearsAgo(2)).toStrictEqual(
        new SimpleDate("2021-12-31"),
      );
      expect(subject.getEndOfNYearsAgo(10)).toStrictEqual(
        new SimpleDate("2013-12-31"),
      );
    });
  });
});

describe("SimpleDate collection", () => {
  test("sort() works as expected", () => {
    const dates = [
      new SimpleDate("2021-07-22"),
      new SimpleDate("2023-01-01"),
      new SimpleDate("2024-10-15"),
      new SimpleDate("2023-02-01"),
      new SimpleDate("2022-12-31"),
    ];
    const expectedDates = [
      new SimpleDate("2021-07-22"),
      new SimpleDate("2022-12-31"),
      new SimpleDate("2023-01-01"),
      new SimpleDate("2023-02-01"),
      new SimpleDate("2024-10-15"),
    ];

    expect(dates.slice().sort()).toEqual(expectedDates);
  });
});
