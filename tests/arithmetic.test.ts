import { describe, expect, test } from "vitest";
import ProperDate from "../lib";
import { add } from "../lib/arithmetic";
import { Period } from "../lib/types";

describe("arithmetic", () => {
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
  });
});
