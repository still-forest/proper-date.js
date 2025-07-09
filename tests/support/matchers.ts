import ProperDate from "../../lib";

export const expectEqualDates = (actual: ProperDate, expected: ProperDate) => {
  try {
    expect(actual.equals(expected)).toBe(true);
  } catch (error) {
    throw new Error(`Expected ${actual.toString()} to equal ${expected.toString()}`);
  }
};