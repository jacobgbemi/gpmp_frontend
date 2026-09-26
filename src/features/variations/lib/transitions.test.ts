import { describe, expect, it } from "vitest";
import { isVariationApprovable, nextVariationStatuses } from "./transitions";

describe("nextVariationStatuses", () => {
  it("mirrors the backend's VARIATION_STATUS_TRANSITIONS exactly", () => {
    expect(nextVariationStatuses("PROPOSED")).toEqual([
      "UNDER_REVIEW",
      "REJECTED",
    ]);
    expect(nextVariationStatuses("UNDER_REVIEW")).toEqual(["REJECTED"]);
    expect(nextVariationStatuses("APPROVED")).toEqual([
      "IMPLEMENTED",
      "CLOSED",
    ]);
    expect(nextVariationStatuses("REJECTED")).toEqual(["CLOSED"]);
    expect(nextVariationStatuses("IMPLEMENTED")).toEqual(["CLOSED"]);
    expect(nextVariationStatuses("CLOSED")).toEqual([]);
  });

  it("never lists APPROVED as a generic transition target", () => {
    for (const status of [
      "PROPOSED",
      "UNDER_REVIEW",
      "APPROVED",
      "REJECTED",
      "IMPLEMENTED",
      "CLOSED",
    ] as const) {
      expect(nextVariationStatuses(status)).not.toContain("APPROVED");
    }
  });
});

describe("isVariationApprovable", () => {
  it("is approvable only from PROPOSED or UNDER_REVIEW", () => {
    expect(isVariationApprovable("PROPOSED")).toBe(true);
    expect(isVariationApprovable("UNDER_REVIEW")).toBe(true);
    expect(isVariationApprovable("APPROVED")).toBe(false);
    expect(isVariationApprovable("REJECTED")).toBe(false);
    expect(isVariationApprovable("IMPLEMENTED")).toBe(false);
    expect(isVariationApprovable("CLOSED")).toBe(false);
  });
});
