import { describe, expect, it } from "vitest";
import {
  issueStatusRequiresResolution,
  nextIssueStatuses,
  nextRiskStatuses,
} from "./transitions";

describe("nextRiskStatuses", () => {
  it("mirrors the backend's RISK_STATUS_TRANSITIONS exactly", () => {
    expect(nextRiskStatuses("OPEN")).toEqual([
      "MITIGATING",
      "MONITORING",
      "CLOSED",
    ]);
    expect(nextRiskStatuses("MITIGATING")).toEqual(["MONITORING", "CLOSED"]);
    expect(nextRiskStatuses("MONITORING")).toEqual(["MITIGATING", "CLOSED"]);
    expect(nextRiskStatuses("CLOSED")).toEqual([]);
  });
});

describe("nextIssueStatuses", () => {
  it("mirrors the backend's ISSUE_STATUS_TRANSITIONS exactly", () => {
    expect(nextIssueStatuses("OPEN")).toEqual([
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED",
    ]);
    expect(nextIssueStatuses("IN_PROGRESS")).toEqual(["RESOLVED", "CLOSED"]);
    expect(nextIssueStatuses("RESOLVED")).toEqual(["IN_PROGRESS", "CLOSED"]);
    expect(nextIssueStatuses("CLOSED")).toEqual([]);
  });
});

describe("issueStatusRequiresResolution", () => {
  it("requires a resolution only when moving to RESOLVED", () => {
    expect(issueStatusRequiresResolution("RESOLVED")).toBe(true);
    expect(issueStatusRequiresResolution("OPEN")).toBe(false);
    expect(issueStatusRequiresResolution("IN_PROGRESS")).toBe(false);
    expect(issueStatusRequiresResolution("CLOSED")).toBe(false);
  });
});
