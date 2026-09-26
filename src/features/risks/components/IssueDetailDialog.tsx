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
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/FormField";
import { formatDate, formatStatusLabel } from "@/lib/format";
import { applyServerErrors } from "@/lib/applyServerErrors";
import { toast } from "@/components/ui/sonner";
import { useUpdateIssue } from "../api/useUpdateIssue";
import {
  issueStatusRequiresResolution,
  nextIssueStatuses,
} from "../lib/transitions";
import {
  resolveIssueSchema,
  type ResolveIssueFormValues,
} from "../schemas/issueSchema";
import { IssueSeverityBadge } from "./IssueSeverityBadge";
import { IssueStatusBadge } from "./IssueStatusBadge";
import type { Issue, IssueStatus } from "../types";

interface IssueDetailDialogProps {
  issue: Issue | null;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  canTransition: boolean;
}

export function IssueDetailDialog({
  issue,
  onOpenChange,
  projectId,
  canTransition,
}: IssueDetailDialogProps) {
  const [resolving, setResolving] = useState(false);
  const updateIssue = useUpdateIssue(projectId);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResolveIssueFormValues>({
    resolver: zodResolver(resolveIssueSchema),
    defaultValues: { resolution: issue?.resolution ?? "" },
  });

  if (!issue) return null;

  const handleTransition = async (status: IssueStatus) => {
    if (issueStatusRequiresResolution(status)) {
      setResolving(true);
      return;
    }
    try {
      await updateIssue.mutateAsync({ id: issue.id, input: { status } });
      toast.success(`Marked as ${formatStatusLabel(status)}`);
    } catch {
      toast.error("Couldn't update the status. Please try again.");
    }
  };

  const onResolve = async (values: ResolveIssueFormValues) => {
    try {
      await updateIssue.mutateAsync({
        id: issue.id,
        input: { status: "RESOLVED", resolution: values.resolution },
      });
      toast.success("Issue resolved");
      setResolving(false);
      reset();
    } catch (error) {
      const message = applyServerErrors(error, setError);
      if (message) setError("root", { type: "server", message });
    }
  };

  return (
    <Dialog open={Boolean(issue)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <IssueStatusBadge status={issue.status} />
            <IssueSeverityBadge severity={issue.severity} />
          </div>

          {issue.description && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="text-sm text-foreground">{issue.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="text-foreground">{issue.owner_email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Target date</p>
              <p className="text-foreground">{formatDate(issue.target_date)}</p>
            </div>
          </div>

          {issue.resolution && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Resolution
              </p>
              <p className="text-sm text-foreground">{issue.resolution}</p>
            </div>
          )}

          {canTransition &&
            (nextIssueStatuses(issue.status).length > 0 || resolving) && (
              <div className="flex flex-col gap-3 border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Actions
                </p>

                {!resolving && (
                  <div className="flex flex-wrap gap-2">
                    {nextIssueStatuses(issue.status).map((next) => (
                      <Button
                        key={next}
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={updateIssue.isPending}
                        onClick={() => handleTransition(next)}
                      >
                        Mark as {formatStatusLabel(next)}
                      </Button>
                    ))}
                  </div>
                )}

                {resolving && (
                  <form
                    onSubmit={handleSubmit(onResolve)}
                    noValidate
                    className="flex flex-col gap-3 rounded-md border border-border p-3"
                  >
                    {errors.root?.message && (
                      <p role="alert" className="text-sm text-destructive">
                        {errors.root.message}
                      </p>
                    )}
                    <FormField
                      label="Resolution"
                      htmlFor="resolution"
                      required
                      error={errors.resolution?.message}
                    >
                      <Textarea
                        id="resolution"
                        rows={3}
                        {...register("resolution")}
                      />
                    </FormField>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setResolving(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" disabled={isSubmitting}>
                        {isSubmitting ? "Resolving…" : "Confirm resolution"}
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
