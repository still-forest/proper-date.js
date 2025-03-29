import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { getToday, getYesterday } from "../lib/factory";
import ProperDate from "../lib/model";

describe("factory", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2025-01-02T00:00:00Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("today", () => {
    test("returns a ProperDate instance for today's date", () => {
      const subject = getToday();
      expect(subject.equals(new ProperDate("2025-01-02"))).toStrictEqual(true);
    });
  });

  describe("yesterday", () => {
    test("returns a ProperDate instance for yesterday's date", () => {
      const subject = getYesterday();
      expect(subject.equals(new ProperDate("2025-01-01"))).toStrictEqual(true);
    });
  });
});
