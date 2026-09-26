import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/FormField";
import {
  formatCurrencyOrDash,
  formatDate,
  formatStatusLabel,
} from "@/lib/format";
import { applyServerErrors } from "@/lib/applyServerErrors";
import { toast } from "@/components/ui/sonner";
import { useApproveVariation } from "../api/useApproveVariation";
import { useUpdateVariationStatus } from "../api/useUpdateVariationStatus";
import { VariationStatusBadge } from "./VariationStatusBadge";
import {
  isVariationApprovable,
  nextVariationStatuses,
} from "../lib/transitions";
import {
  approveVariationSchema,
  type ApproveVariationFormValues,
} from "../schemas/variationSchema";
import type { Variation } from "../types";

interface VariationDetailDialogProps {
  variation: Variation | null;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  currency: string;
  canApprove: boolean;
  canTransition: boolean;
}

export function VariationDetailDialog({
  variation,
  onOpenChange,
  projectId,
  currency,
  canApprove,
  canTransition,
}: VariationDetailDialogProps) {
  const [approving, setApproving] = useState(false);
  const updateStatus = useUpdateVariationStatus(projectId);
  const approve = useApproveVariation(projectId);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ApproveVariationFormValues>({
    resolver: zodResolver(approveVariationSchema),
    defaultValues: { approved_amount: "", notes: "" },
  });

  if (!variation) return null;

  const handleTransition = async (status: string) => {
    try {
      await updateStatus.mutateAsync({
        id: variation.id,
        input: { status: status as Variation["status"] },
      });
      toast.success(`Marked as ${formatStatusLabel(status)}`);
    } catch {
      toast.error("Couldn't update the status. Please try again.");
    }
  };

  const onApprove = async (values: ApproveVariationFormValues) => {
    try {
      await approve.mutateAsync({ id: variation.id, input: values });
      toast.success("Variation approved");
      setApproving(false);
      reset();
    } catch (error) {
      const message = applyServerErrors(error, setError);
      if (message) setError("root", { type: "server", message });
    }
  };

  return (
    <Dialog open={Boolean(variation)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {variation.variation_number} — {variation.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <VariationStatusBadge status={variation.status} />
            <span className="text-sm text-muted-foreground">
              {formatStatusLabel(variation.category)}
            </span>
          </div>

          {variation.reason && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Reason
              </p>
              <p className="text-sm text-foreground">{variation.reason}</p>
            </div>
          )}

          {variation.description && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="text-sm text-foreground">{variation.description}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 rounded-md border border-border p-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Requested</p>
              <p className="font-medium text-foreground">
                {formatCurrencyOrDash(variation.requested_amount, currency)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated</p>
              <p className="font-medium text-foreground">
                {formatCurrencyOrDash(variation.estimated_amount, currency)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved</p>
              <p className="font-medium text-foreground">
                {formatCurrencyOrDash(variation.approved_amount, currency)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Requested date</p>
              <p className="text-foreground">
                {formatDate(variation.requested_date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved date</p>
              <p className="text-foreground">
                {formatDate(variation.approved_date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Proposed by</p>
              <p className="text-foreground">{variation.created_by_email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved by</p>
              <p className="text-foreground">
                {variation.approved_by_email || "—"}
              </p>
            </div>
          </div>

          {variation.notes && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </p>
              <p className="text-sm text-foreground">{variation.notes}</p>
            </div>
          )}

          {(canTransition ||
            (canApprove && isVariationApprovable(variation.status))) && (
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Actions
              </p>

              <div className="flex flex-wrap gap-2">
                {canTransition &&
                  nextVariationStatuses(variation.status).map((next) => (
                    <Button
                      key={next}
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={updateStatus.isPending}
                      onClick={() => handleTransition(next)}
                    >
                      Mark as {formatStatusLabel(next)}
                    </Button>
                  ))}

                {canApprove &&
                  isVariationApprovable(variation.status) &&
                  !approving && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setApproving(true)}
                    >
                      Approve…
                    </Button>
                  )}
              </div>

              {approving && (
                <form
                  onSubmit={handleSubmit(onApprove)}
                  noValidate
                  className="flex flex-col gap-3 rounded-md border border-border p-3"
                >
                  {errors.root?.message && (
                    <p role="alert" className="text-sm text-destructive">
                      {errors.root.message}
                    </p>
                  )}
                  <FormField
                    label="Approved amount"
                    htmlFor="approved_amount"
                    required
                    error={errors.approved_amount?.message}
                  >
                    <Input
                      id="approved_amount"
                      inputMode="decimal"
                      placeholder="0.00"
                      defaultValue={
                        variation.estimated_amount ?? variation.requested_amount
                      }
                      {...register("approved_amount")}
                    />
                  </FormField>
                  <FormField
                    label="Approval notes"
                    htmlFor="approve_notes"
                    error={errors.notes?.message}
                  >
                    <Textarea
                      id="approve_notes"
                      rows={2}
                      {...register("notes")}
                    />
                  </FormField>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setApproving(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={isSubmitting}>
                      {isSubmitting ? "Approving…" : "Confirm approval"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
