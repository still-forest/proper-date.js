import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import ProperDate, { getToday, getYesterday } from "../lib";

describe("ProperDate", () => {
  beforeEach(() => {
    // TODO: this doesn't seem to work
    vi.setSystemTime(new Date("2025-01-02T00:00:00Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
