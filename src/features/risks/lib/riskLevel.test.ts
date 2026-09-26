import { describe, expect, it } from "vitest";
import { computeRiskScore, deriveRiskLevel } from "./riskLevel";

describe("computeRiskScore", () => {
  it("multiplies probability by impact", () => {
    expect(computeRiskScore(3, 4)).toBe(12);
    expect(computeRiskScore(1, 1)).toBe(1);
    expect(computeRiskScore(5, 5)).toBe(25);
  });
});

describe("deriveRiskLevel", () => {
  it("bands scores exactly per the backend thresholds", () => {
    expect(deriveRiskLevel(1)).toBe("LOW");
    expect(deriveRiskLevel(3)).toBe("LOW");
    expect(deriveRiskLevel(4)).toBe("MEDIUM");
    expect(deriveRiskLevel(7)).toBe("MEDIUM");
    expect(deriveRiskLevel(8)).toBe("HIGH");
    expect(deriveRiskLevel(14)).toBe("HIGH");
    expect(deriveRiskLevel(15)).toBe("CRITICAL");
    expect(deriveRiskLevel(25)).toBe("CRITICAL");
  });
});
