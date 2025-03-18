import { describe, expect, test } from "vitest";
import ProperDate from "../lib";
import { parseInput } from "../lib/utils";

describe("utils", () => {
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

    describe("with a JavaScript date, without a specific timezone", () => {
      test("when constructed from a string without time", () => {
        const date = new Date("2023-12-25");
        const result = parseInput(date);
        expect(result.year).toStrictEqual(2023);
        expect(result.month).toStrictEqual(11);
        expect(result.day).toStrictEqual(25);
      });

      test.skip("when constructed from a string with time", () => {
        // TODO: this is timezone dependent, needs to be stubbed

        const date = new Date("2023-12-25 00:00:00");
        expect(date.toString()).toStrictEqual(
          "Mon Dec 25 2023 00:00:00 GMT+0800 (Singapore Standard Time)"
        );

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
      const expectedErrorMessage =
        "Date must be either a Date, ProperDate, or YYYY-MM-DD formatted string";

      expect(() => parseInput("my birthday last year")).toThrowError(
        expectedErrorMessage
      );
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(123)).toThrow(expectedErrorMessage);
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(null)).toThrow(expectedErrorMessage);
      // @ts-expect-error Testing invalid input
      expect(() => parseInput(undefined)).toThrow(expectedErrorMessage);
    });
  });
});
