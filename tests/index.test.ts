import ProperDate, { getToday, getYesterday } from "../lib";

describe("ProperDate", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-01-02T00:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("exports as expected", () => {
    const sampleProperDate = new ProperDate("1776-07-04");
    expect(sampleProperDate.toString()).toBe("1776-07-04");

    const today = getToday();
    expect(today instanceof ProperDate).toBe(true);
    expect(today.toString()).toBe("2025-01-02");

    const yesterday = getYesterday();
    expect(yesterday instanceof ProperDate).toBe(true);
    expect(yesterday.toString()).toBe("2025-01-01");
  });
});
