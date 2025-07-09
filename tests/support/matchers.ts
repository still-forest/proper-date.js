import type ProperDate from "../../lib";

export const expectEqualProperDates = (actual: ProperDate, expected: ProperDate) => {
  try {
    expect(actual.equals(expected)).toBe(true);
  } catch (_error) {
    throw new Error(`Expected ${actual.toString()} to equal ${expected.toString()}`);
  }
};

export const expectEqualDates = (actual: Date, expected: Date) => {
  try {
    const actualDateString = actual.toISOString().split("T")[0];
    const expectedDateString = expected.toISOString().split("T")[0];
    expect(actualDateString).toBe(expectedDateString);
  } catch (_error) {
    throw new Error(`Expected ${actual.toISOString()} to equal ${expected.toISOString()}`);
  }
};
