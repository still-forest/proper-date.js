import ProperDate from "../lib";
import { buildUtcDate, parseInput } from "../lib/utils";

describe("utils", () => {
  describe("buildUtcDate", () => {
    test("returns a UTC date", () => {
      expect(buildUtcDate(2023, 12, 25)).toStrictEqual(new Date("2023-12-25T00:00:00.000Z"));
      expect(buildUtcDate(2023, 12, 26)).toStrictEqual(new Date("2023-12-26T00:00:00.000Z"));
      expect(buildUtcDate(2023, 12, 31)).toStrictEqual(new Date("2023-12-31T00:00:00.000Z"));

      expect(buildUtcDate(2024, 2, 28)).toStrictEqual(new Date("2024-02-28T00:00:00.000Z"));
      expect(buildUtcDate(2024, 2, 29)).toStrictEqual(new Date("2024-02-29T00:00:00.000Z"));
      expect(buildUtcDate(2024, 3, 1)).toStrictEqual(new Date("2024-03-01T00:00:00.000Z"));
    });

    test("handles day wrapping", () => {
      expect(buildUtcDate(2023, 2, 35)).toStrictEqual(new Date("2023-03-07T00:00:00.000Z"));
      expect(buildUtcDate(2024, 1, 15 + 366)).toStrictEqual(new Date("2025-01-15T00:00:00.000Z"));
    });

    test("handles month wrapping", () => {
      expect(buildUtcDate(2023, 13, 2)).toStrictEqual(new Date("2024-01-02:00:00.000Z"));
      expect(buildUtcDate(2024, 0, 2)).toStrictEqual(new Date("2023-12-02:00:00.000Z"));
    });

    test("handles end of month utilities", () => {
      expect(buildUtcDate(2023, 12, 0)).toStrictEqual(new Date("2023-11-30:00:00.000Z"));
      expect(buildUtcDate(2024, 3, 0)).toStrictEqual(new Date("2024-02-29:00:00.000Z"));
    });
  });

  describe("parseInput", () => {
    test("with a ProperDate", () => {
      const input = new ProperDate("2023-12-25");
      const result = parseInput(input);
      expect(result.year).toStrictEqual(2023);
      expect(result.month).toStrictEqual(11);
      expect(result.day).toStrictEqual(25);
    });

    test("with a yyyy-mm-dd formatted string", () => {
      const result = parseInput("2023-12-25");
      expect(result.year).toStrictEqual(2023);
      expect(result.month).toStrictEqual(11);
      expect(result.day).toStrictEqual(25);
    });

    test("with a [year, month, day] array", () => {
      let result = parseInput([2023, 12, 25]);
      expect(result.year).toStrictEqual(2023);
      expect(result.month).toStrictEqual(11);
      expect(result.day).toStrictEqual(25);

      result = parseInput([2023, 1, 25]);
      expect(result.year).toStrictEqual(2023);
      expect(result.month).toStrictEqual(0);
      expect(result.day).toStrictEqual(25);

      result = parseInput([2023, 0, 25]);
      expect(result.year).toStrictEqual(2022);
      expect(result.month).toStrictEqual(11);
      expect(result.day).toStrictEqual(25);
    });

    describe("with a JavaScript date, without a specific timezone", () => {
      test("when constructed from a string", () => {
        const date = new Date("2023-12-25");
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(25);
      });

      test("when constructed numerically", () => {
        const date = new Date(Date.UTC(2023, 11, 25));
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(25);
      });
    });

    describe("with a JavaScript date and a specific timezone", () => {
      test("UTC/GMT", () => {
        const date = new Date("2023-12-25T00:00:00.000Z");
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(25);
      });

      test("before UTC/GMT", () => {
        const date = new Date("2023-12-25T16:00:00.000-13:00");

        // When 16:00 at 25th in the -13:00 timezone, it's already after 00:00 on the 26th in UTC.
        // TODO: is the desirable behavior?  Or should it be 25?
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(26);
      });

      test("ahead of UTC/GMT", () => {
        const date = new Date("2023-12-25T16:00:00.000+13:00");
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(25);
      });
    });

    test("throws error for invalid input types", () => {
      const expectedErrorMessage = "Date must be either a Date, ProperDate, or YYYY-MM-DD formatted string";

      expect(() => parseInput("my birthday last year")).toThrow(expectedErrorMessage);
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(123)).toThrow(expectedErrorMessage);
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(null)).toThrow(expectedErrorMessage);
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(undefined)).toThrow(expectedErrorMessage);
    });
  });
});
