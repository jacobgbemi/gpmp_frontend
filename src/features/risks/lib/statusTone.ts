import type { Tone } from "@/features/projects/lib/statusTone";
import type {
  IssueSeverity,
  IssueStatus,
  RiskLevel,
  RiskStatus,
} from "../types";

export function riskLevelTone(level: RiskLevel): Tone {
  switch (level) {
    case "CRITICAL":
      return "negative";
    case "HIGH":
      return "warning";
    case "MEDIUM":
      return "info";
    case "LOW":
    default:
      return "positive";
  }
}

export function riskStatusTone(status: RiskStatus): Tone {
  switch (status) {
    case "CLOSED":
      return "neutral";
    case "MONITORING":
      return "info";
    case "MITIGATING":
      return "warning";
    case "OPEN":
    default:
      return "neutral";
  }
}

export function issueSeverityTone(severity: IssueSeverity): Tone {
  switch (severity) {
    case "CRITICAL":
      return "negative";
    case "HIGH":
      return "warning";
    case "MEDIUM":
      return "info";
    case "LOW":
    default:
      return "positive";
  }
}

export function issueStatusTone(status: IssueStatus): Tone {
  switch (status) {
    case "RESOLVED":
    case "CLOSED":
      return "positive";
    case "IN_PROGRESS":
      return "warning";
    case "OPEN":
    default:
      return "neutral";
  }
}
