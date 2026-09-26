import { Card, CardContent } from "@/components/ui/card";
import { formatStatusLabel } from "@/lib/format";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { RiskStatusBadge } from "./RiskStatusBadge";
import type { Risk } from "../types";

export function RiskCard({
  risk,
  onSelect,
}: {
  risk: Risk;
  onSelect: (risk: Risk) => void;
}) {
  return (
    <Card
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(risk)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(risk)}
    >
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-foreground">{risk.title}</p>
            <p className="text-xs text-muted-foreground">
              {formatStatusLabel(risk.category)}
            </p>
          </div>
          <RiskLevelBadge level={risk.risk_level} />
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">
            P{risk.probability} × I{risk.impact} = {risk.risk_score}
          </span>
          <RiskStatusBadge status={risk.status} />
        </div>
        <p className="text-xs text-muted-foreground">{risk.owner_email}</p>
      </CardContent>
    </Card>
  );
}
