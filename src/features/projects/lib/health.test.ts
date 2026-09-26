import { describe, expect, it } from "vitest";
import { deriveProjectHealth } from "./health";
import type { ProjectDashboard } from "../types";

function dashboard(
  overrides: Partial<ProjectDashboard> = {},
): ProjectDashboard {
  return {
    original_budget: "0.00",
    approved_budget: "0.00",
    actual_spend: "0.00",
    committed_cost: "0.00",
    forecast_final_cost: "0.00",
    cost_variance: "0.00",
    planned_progress_percent: "0.00",
    actual_progress_percent: "0.00",
    schedule_variance: "0.00",
    pending_payments_count: 0,
    pending_payments_total: "0.00",
    as_of_reporting_date: null,
    ...overrides,
  };
}

describe("deriveProjectHealth", () => {
  it("is NO_DATA with no budget and no progress reported", () => {
    expect(deriveProjectHealth(dashboard())).toBe("NO_DATA");
  });

  it("is ON_TRACK when within budget and on or ahead of schedule", () => {
    expect(
      deriveProjectHealth(
        dashboard({
          approved_budget: "100",
          forecast_final_cost: "90",
          cost_variance: "10",
          as_of_reporting_date: "2026-09-01",
          schedule_variance: "2",
        }),
      ),
    ).toBe("ON_TRACK");
  });

  it("is AT_RISK when over budget at all", () => {
    expect(
      deriveProjectHealth(
        dashboard({
          approved_budget: "100",
          forecast_final_cost: "102",
          cost_variance: "-2",
        }),
      ),
    ).toBe("AT_RISK");
  });

  it("is AT_RISK when 5+ points behind schedule", () => {
    expect(
      deriveProjectHealth(
        dashboard({
          as_of_reporting_date: "2026-09-01",
          schedule_variance: "-6",
        }),
      ),
    ).toBe("AT_RISK");
  });

  it("is CRITICAL when more than 10% over budget", () => {
    expect(
      deriveProjectHealth(
        dashboard({
          approved_budget: "100",
          forecast_final_cost: "115",
          cost_variance: "-15",
        }),
      ),
    ).toBe("CRITICAL");
  });

  it("is CRITICAL when 20+ points behind schedule", () => {
    expect(
      deriveProjectHealth(
        dashboard({
          as_of_reporting_date: "2026-09-01",
          schedule_variance: "-25",
        }),
      ),
    ).toBe("CRITICAL");
  });
});
