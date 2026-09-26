import { describe, expect, it } from "vitest";
import { canApproveVariation, canWriteProject } from "./useProjectRole";

describe("canWriteProject", () => {
  it("allows PLATFORM_ADMIN, ORGANIZATION_ADMIN, PROJECT_MANAGER and PROJECT_CONTROLS", () => {
    expect(canWriteProject("PLATFORM_ADMIN")).toBe(true);
    expect(canWriteProject("ORGANIZATION_ADMIN")).toBe(true);
    expect(canWriteProject("PROJECT_MANAGER")).toBe(true);
    expect(canWriteProject("PROJECT_CONTROLS")).toBe(true);
  });

  it("disallows a viewer-level role and no role at all", () => {
    expect(canWriteProject("VIEWER")).toBe(false);
    expect(canWriteProject(null)).toBe(false);
  });
});

describe("canApproveVariation", () => {
  it("allows only PLATFORM_ADMIN, ORGANIZATION_ADMIN and PROJECT_CONTROLS", () => {
    expect(canApproveVariation("PLATFORM_ADMIN")).toBe(true);
    expect(canApproveVariation("ORGANIZATION_ADMIN")).toBe(true);
    expect(canApproveVariation("PROJECT_CONTROLS")).toBe(true);
  });

  it("disallows PROJECT_MANAGER — can write but not approve variations", () => {
    expect(canApproveVariation("PROJECT_MANAGER")).toBe(false);
  });

  it("disallows no role", () => {
    expect(canApproveVariation(null)).toBe(false);
  });
});
