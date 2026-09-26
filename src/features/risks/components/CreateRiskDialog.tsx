import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/FormField";
import { applyServerErrors } from "@/lib/applyServerErrors";
import { useCreateRisk } from "../api/useCreateRisk";
import { computeRiskScore, deriveRiskLevel } from "../lib/riskLevel";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { OwnerSelect } from "./OwnerSelect";
import {
  RISK_CATEGORY_OPTIONS,
  RISK_RESPONSE_OPTIONS,
  createRiskSchema,
  type CreateRiskFormValues,
} from "../schemas/riskSchema";

interface CreateRiskDialogProps {
  projectId: string;
  organizationId: string | undefined;
}

export function CreateRiskDialog({
  projectId,
  organizationId,
}: CreateRiskDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateRisk(projectId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateRiskFormValues>({
    resolver: zodResolver(createRiskSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "OTHER",
      probability: "3",
      impact: "3",
      response: "MITIGATE",
      mitigation: "",
      contingency: "",
      owner: "",
      target_date: "",
    },
  });

  const probability = Number(useWatch({ control, name: "probability" }) || 0);
  const impact = Number(useWatch({ control, name: "impact" }) || 0);
  const previewScore = computeRiskScore(probability, impact);

  const onSubmit = async (values: CreateRiskFormValues) => {
    try {
      await mutation.mutateAsync({
        ...values,
        probability: Number(values.probability),
        impact: Number(values.impact),
        target_date: values.target_date || undefined,
      });
      reset();
      setOpen(false);
    } catch (error) {
      const message = applyServerErrors(error, setError);
      if (message) setError("root", { type: "server", message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" /> Log risk
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log a risk</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          {errors.root?.message && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              {errors.root.message}
            </div>
          )}

          <FormField
            label="Title"
            htmlFor="title"
            required
            error={errors.title?.message}
          >
            <Input id="title" {...register("title")} />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            error={errors.description?.message}
          >
            <Textarea id="description" rows={2} {...register("description")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Category"
              htmlFor="category"
              required
              error={errors.category?.message}
            >
              <Select id="category" {...register("category")}>
                {RISK_CATEGORY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Response"
              htmlFor="response"
              required
              error={errors.response?.message}
            >
              <Select id="response" {...register("response")}>
                {RISK_RESPONSE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Probability (1–5)"
              htmlFor="probability"
              required
              error={errors.probability?.message}
            >
              <Input
                id="probability"
                type="number"
                min={1}
                max={5}
                {...register("probability")}
              />
            </FormField>
            <FormField
              label="Impact (1–5)"
              htmlFor="impact"
              required
              error={errors.impact?.message}
            >
              <Input
                id="impact"
                type="number"
                min={1}
                max={5}
                {...register("impact")}
              />
            </FormField>
          </div>

          {probability >= 1 && impact >= 1 && (
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm">
              <span className="text-muted-foreground">
                Score {previewScore} →
              </span>
              <RiskLevelBadge level={deriveRiskLevel(previewScore)} />
            </div>
          )}

          <FormField
            label="Mitigation"
            htmlFor="mitigation"
            error={errors.mitigation?.message}
          >
            <Textarea id="mitigation" rows={2} {...register("mitigation")} />
          </FormField>

          <FormField
            label="Contingency"
            htmlFor="contingency"
            error={errors.contingency?.message}
          >
            <Textarea id="contingency" rows={2} {...register("contingency")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Owner"
              htmlFor="owner"
              required
              error={errors.owner?.message}
            >
              <OwnerSelect
                id="owner"
                organizationId={organizationId}
                {...register("owner")}
              />
            </FormField>
            <FormField
              label="Target date"
              htmlFor="target_date"
              error={errors.target_date?.message}
            >
              <Input
                id="target_date"
                type="date"
                {...register("target_date")}
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Log risk"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
