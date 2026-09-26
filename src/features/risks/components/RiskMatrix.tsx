import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { deriveRiskLevel } from "../lib/riskLevel";
import type { Risk } from "../types";

const CELL_TONE_CLASSES: Record<string, string> = {
  LOW: "bg-accent-soft text-primary-dark",
  MEDIUM: "bg-primary-light text-primary",
  HIGH: "bg-amber-50 text-amber-700",
  CRITICAL: "bg-destructive/10 text-destructive",
};

interface RiskMatrixProps {
  risks: Risk[];
}

/**
 * Standard 5×5 probability × impact matrix. Only counts risks that
 * are still active (not CLOSED) — this is exposure right now, not a
 * historical record. Impact runs top (5, most severe) to bottom (1);
 * probability runs left (1) to right (5, most likely).
 */
export function RiskMatrix({ risks }: RiskMatrixProps) {
  const active = risks.filter((r) => r.status !== "CLOSED");

  const countAt = (probability: number, impact: number) =>
    active.filter((r) => r.probability === probability && r.impact === impact)
      .length;

  const impactRows = [5, 4, 3, 2, 1];
  const probabilityCols = [1, 2, 3, 4, 5];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl]">
              Impact
            </span>
          </div>
          <div className="flex-1">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
            >
              {impactRows.map((impact) =>
                probabilityCols.map((probability) => {
                  const score = probability * impact;
                  const level = deriveRiskLevel(score);
                  const count = countAt(probability, impact);
                  return (
                    <div
                      key={`${probability}-${impact}`}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center rounded-md text-sm font-semibold",
                        CELL_TONE_CLASSES[level],
                      )}
                      title={`Probability ${probability} × Impact ${impact} = ${score}`}
                    >
                      {count > 0 ? count : ""}
                    </div>
                  );
                }),
              )}
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Less likely</span>
              <span className="text-center">Probability</span>
              <span>More likely</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
