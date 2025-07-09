import type ProperDate from "../../lib";

export const expectEqualDates = (actual: ProperDate, expected: ProperDate) => {
  try {
    expect(actual.equals(expected)).toBe(true);
  } catch (_error) {
    throw new Error(`Expected ${actual.toString()} to equal ${expected.toString()}`);
  }
};
