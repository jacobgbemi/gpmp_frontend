import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,
  formatStatusLabel,
  formatVariance,
  toNumber,
  varianceTone,
} from "./format";

describe("toNumber", () => {
  it("parses a decimal string from the API", () => {
    expect(toNumber("1234.50")).toBe(1234.5);
  });

  it("returns 0 for null/undefined/invalid input", () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber("not-a-number")).toBe(0);
  });
});

describe("formatCurrency", () => {
  it("formats an NGN amount with the naira symbol", () => {
    expect(formatCurrency("500000000", "NGN")).toContain("500,000,000");
  });

  it("falls back gracefully for an unknown currency code", () => {
    expect(formatCurrency("1000", "XXX")).toContain("1,000");
  });
});

describe("formatCurrencyCompact", () => {
  it("compacts millions", () => {
    expect(formatCurrencyCompact(500_000_000, "NGN")).toBe("₦500.0M");
  });

  it("compacts billions", () => {
    expect(formatCurrencyCompact(2_500_000_000, "NGN")).toBe("₦2.5B");
  });

  it("handles small amounts without compacting", () => {
    expect(formatCurrencyCompact(500, "NGN")).toBe("₦500");
  });
});

describe("formatPercent", () => {
  it("does not multiply by 100 — backend values are already percentages", () => {
    expect(formatPercent("62.00")).toBe("62%");
  });
});

describe("formatVariance", () => {
  it("prefixes a positive variance with a plus sign", () => {
    expect(formatVariance(3)).toBe("+3%");
  });

  it("leaves a negative variance with its own minus sign", () => {
    expect(formatVariance(-7)).toBe("-7%");
  });

  it("shows zero with no sign", () => {
    expect(formatVariance(0)).toBe("0%");
  });
});

describe("varianceTone", () => {
  it("treats a positive variance as good when higher is favorable", () => {
    expect(varianceTone(5, "positive")).toBe("positive");
    expect(varianceTone(-5, "positive")).toBe("negative");
  });

  it("treats a positive variance as bad when lower is favorable (e.g. cost overrun)", () => {
    expect(varianceTone(5, "negative")).toBe("negative");
    expect(varianceTone(-5, "negative")).toBe("positive");
  });

  it("is neutral at exactly zero", () => {
    expect(varianceTone(0, "positive")).toBe("neutral");
  });
});

describe("formatStatusLabel", () => {
  it("humanizes an upper-snake-case backend status", () => {
    expect(formatStatusLabel("ON_HOLD")).toBe("On Hold");
  });

  it("humanizes a lower-snake-case value", () => {
    expect(formatStatusLabel("attention_required")).toBe("Attention Required");
  });

  it("returns an em dash for missing input", () => {
    expect(formatStatusLabel(undefined)).toBe("—");
  });
});