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
import { useCreateIssue } from "../api/useCreateIssue";
import { OwnerSelect } from "./OwnerSelect";
import {
  ISSUE_SEVERITY_OPTIONS,
  createIssueSchema,
  type CreateIssueFormValues,
} from "../schemas/issueSchema";

interface CreateIssueDialogProps {
  projectId: string;
  organizationId: string | undefined;
}

export function CreateIssueDialog({
  projectId,
  organizationId,
}: CreateIssueDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateIssue(projectId);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateIssueFormValues>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      severity: "MEDIUM",
      owner: "",
      target_date: "",
    },
  });

  const onSubmit = async (values: CreateIssueFormValues) => {
    try {
      await mutation.mutateAsync({
        ...values,
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
          <Plus className="h-4 w-4" /> Log issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log an issue</DialogTitle>
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
            <Textarea id="description" rows={3} {...register("description")} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Severity"
              htmlFor="severity"
              required
              error={errors.severity?.message}
            >
              <Select id="severity" {...register("severity")}>
                {ISSUE_SEVERITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FormField>
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
          </div>

          <FormField
            label="Target date"
            htmlFor="target_date"
            error={errors.target_date?.message}
          >
            <Input id="target_date" type="date" {...register("target_date")} />
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
              {isSubmitting ? "Saving…" : "Log issue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
