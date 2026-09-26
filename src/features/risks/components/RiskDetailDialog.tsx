import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate, formatStatusLabel } from "@/lib/format";
import { toast } from "@/components/ui/sonner";
import { useUpdateRisk } from "../api/useUpdateRisk";
import { nextRiskStatuses } from "../lib/transitions";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { RiskStatusBadge } from "./RiskStatusBadge";
import type { Risk, RiskStatus } from "../types";

interface RiskDetailDialogProps {
  risk: Risk | null;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  canTransition: boolean;
}

export function RiskDetailDialog({
  risk,
  onOpenChange,
  projectId,
  canTransition,
}: RiskDetailDialogProps) {
  const updateRisk = useUpdateRisk(projectId);

  if (!risk) return null;

  const handleTransition = async (status: RiskStatus) => {
    try {
      await updateRisk.mutateAsync({ id: risk.id, input: { status } });
      toast.success(`Marked as ${formatStatusLabel(status)}`);
    } catch {
      toast.error("Couldn't update the status. Please try again.");
    }
  };

  return (
    <Dialog open={Boolean(risk)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{risk.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <RiskStatusBadge status={risk.status} />
            <RiskLevelBadge level={risk.risk_level} />
            <span className="text-sm text-muted-foreground">
              {formatStatusLabel(risk.category)}
            </span>
          </div>

          {risk.description && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="text-sm text-foreground">{risk.description}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 rounded-md border border-border p-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Probability</p>
              <p className="font-medium text-foreground">{risk.probability}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Impact</p>
              <p className="font-medium text-foreground">{risk.impact}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Score</p>
              <p className="font-medium text-foreground">{risk.risk_score}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Response</p>
              <p className="text-foreground">
                {formatStatusLabel(risk.response)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="text-foreground">{risk.owner_email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Target date</p>
              <p className="text-foreground">{formatDate(risk.target_date)}</p>
            </div>
          </div>

          {risk.mitigation && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Mitigation
              </p>
              <p className="text-sm text-foreground">{risk.mitigation}</p>
            </div>
          )}

          {risk.contingency && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contingency
              </p>
              <p className="text-sm text-foreground">{risk.contingency}</p>
            </div>
          )}

          {canTransition && nextRiskStatuses(risk.status).length > 0 && (
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Actions
              </p>
              <div className="flex flex-wrap gap-2">
                {nextRiskStatuses(risk.status).map((next) => (
                  <Button
                    key={next}
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={updateRisk.isPending}
                    onClick={() => handleTransition(next)}
                  >
                    Mark as {formatStatusLabel(next)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
