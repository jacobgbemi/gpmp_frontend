import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useCreateVariation } from "../api/useCreateVariation";
import {
  VARIATION_CATEGORY_OPTIONS,
  createVariationSchema,
  type CreateVariationFormValues,
} from "../schemas/variationSchema";

interface CreateVariationDialogProps {
  projectId: string;
}

export function CreateVariationDialog({
  projectId,
}: CreateVariationDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateVariation(projectId);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateVariationFormValues>({
    resolver: zodResolver(createVariationSchema),
    defaultValues: {
      variation_number: "",
      title: "",
      category: "OTHER",
      requested_amount: "",
      estimated_amount: "",
      requested_date: "",
      reason: "",
      description: "",
      notes: "",
    },
  });

  const onSubmit = async (values: CreateVariationFormValues) => {
    try {
      await mutation.mutateAsync({
        ...values,
        estimated_amount: values.estimated_amount || undefined,
        requested_date: values.requested_date || undefined,
      });
      reset();
      setOpen(false);
    } catch (error) {
      const message = applyServerErrors(error, setError);
      if (message) {
        setError("root", { type: "server", message });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" /> Propose variation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Propose a variation</DialogTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Variation number"
              htmlFor="variation_number"
              required
              error={errors.variation_number?.message}
            >
              <Input id="variation_number" {...register("variation_number")} />
            </FormField>

            <FormField
              label="Category"
              htmlFor="category"
              required
              error={errors.category?.message}
            >
              <Select id="category" {...register("category")}>
                {VARIATION_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <FormField
            label="Title"
            htmlFor="title"
            required
            error={errors.title?.message}
          >
            <Input id="title" {...register("title")} />
          </FormField>

          <FormField
            label="Reason"
            htmlFor="reason"
            error={errors.reason?.message}
          >
            <Textarea id="reason" rows={2} {...register("reason")} />
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
              label="Requested amount"
              htmlFor="requested_amount"
              required
              error={errors.requested_amount?.message}
            >
              <Input
                id="requested_amount"
                inputMode="decimal"
                placeholder="0.00"
                {...register("requested_amount")}
              />
            </FormField>

            <FormField
              label="Estimated amount"
              htmlFor="estimated_amount"
              error={errors.estimated_amount?.message}
            >
              <Input
                id="estimated_amount"
                inputMode="decimal"
                placeholder="0.00"
                {...register("estimated_amount")}
              />
            </FormField>
          </div>

          <FormField
            label="Requested date"
            htmlFor="requested_date"
            error={errors.requested_date?.message}
          >
            <Input
              id="requested_date"
              type="date"
              {...register("requested_date")}
            />
          </FormField>

          <FormField
            label="Notes"
            htmlFor="notes"
            error={errors.notes?.message}
          >
            <Textarea id="notes" rows={2} {...register("notes")} />
          </FormField>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit for review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
