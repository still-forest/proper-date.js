import ProperDate from "../lib";
import { buildLocalDate, buildUTCDate, parseInput } from "../lib/utils";
import { expectEqualDates } from "./support/matchers";

describe("utils", () => {
  describe("buildLocalDate", () => {
    test("returns a date in the local timezone", () => {
      expectEqualDates(buildLocalDate(2023, 12, 25), new Date(2023, 11, 25));
      expectEqualDates(buildLocalDate(2023, 12, 26), new Date(2023, 11, 26));
      expectEqualDates(buildLocalDate(2023, 12, 31), new Date(2023, 11, 31));

      expectEqualDates(buildLocalDate(2024, 2, 28), new Date(2024, 1, 28));
      expectEqualDates(buildLocalDate(2024, 2, 29), new Date(2024, 1, 29));
      expectEqualDates(buildLocalDate(2024, 3, 1), new Date(2024, 2, 1));
    });

    test("handles day wrapping", () => {
      expectEqualDates(buildLocalDate(2023, 2, 35), new Date(2023, 2, 7));
      expectEqualDates(buildLocalDate(2024, 1, 15 + 366), new Date(2025, 0, 15));
    });

    test("handles month wrapping", () => {
      expectEqualDates(buildLocalDate(2023, 13, 2), new Date(2024, 0, 2));
      expectEqualDates(buildLocalDate(2024, 0, 2), new Date(2023, 11, 2));
    });

    test("handles end of month utilities", () => {
      expectEqualDates(buildLocalDate(2023, 12, 0), new Date(2023, 10, 30));
      expectEqualDates(buildLocalDate(2024, 3, 0), new Date(2024, 1, 29));
    });
  });

  describe("buildUTCDate", () => {
    test("returns a date in the UTC timezone", () => {
      expectEqualDates(buildUTCDate(2023, 12, 25), new Date(Date.UTC(2023, 11, 25)));
      expectEqualDates(buildUTCDate(2023, 12, 26), new Date(Date.UTC(2023, 11, 26)));
      expectEqualDates(buildUTCDate(2023, 12, 31), new Date(Date.UTC(2023, 11, 31)));

      expectEqualDates(buildUTCDate(2024, 2, 28), new Date(Date.UTC(2024, 1, 28)));
      expectEqualDates(buildUTCDate(2024, 2, 29), new Date(Date.UTC(2024, 1, 29)));
      expectEqualDates(buildUTCDate(2024, 3, 1), new Date(Date.UTC(2024, 2, 1)));
    });

    test("handles day wrapping", () => {
      expectEqualDates(buildUTCDate(2023, 2, 35), new Date(Date.UTC(2023, 2, 7)));
      expectEqualDates(buildUTCDate(2024, 1, 15 + 366), new Date(Date.UTC(2025, 0, 15)));
    });

    test("handles month wrapping", () => {
      expectEqualDates(buildUTCDate(2023, 13, 2), new Date(Date.UTC(2024, 0, 2)));
      expectEqualDates(buildUTCDate(2024, 0, 2), new Date(Date.UTC(2023, 11, 2)));
    });

    test("handles end of month utilities", () => {
      expectEqualDates(buildUTCDate(2023, 12, 0), new Date(Date.UTC(2023, 10, 30)));
      expectEqualDates(buildUTCDate(2024, 3, 0), new Date(Date.UTC(2024, 1, 29)));
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

    test("throws error for invalid input types", () => {
      const buildExpectedErrorMessage = (input: string, type: string) =>
        `[proper-date.js] Input must be either a ProperDate, YYYY-MM-DD formatted string, or an array of [year, month, day]. Received: ${input} of type ${type}`;

      expect(() => parseInput("my birthday last year")).toThrow(
        buildExpectedErrorMessage("my birthday last year", "string"),
      );
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(123)).toThrow(buildExpectedErrorMessage("123", "number"));
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(null)).toThrow(buildExpectedErrorMessage("null", "object"));
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(undefined)).toThrow(buildExpectedErrorMessage("undefined", "undefined"));
    });
  });
});
