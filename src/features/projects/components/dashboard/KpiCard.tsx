import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Tone } from "../../lib/statusTone";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "text-foreground",
  positive: "text-primary-dark",
  warning: "text-amber-700",
  negative: "text-destructive",
  info: "text-primary",
};

interface KpiCardProps {
  label: string;
  value: ReactNode;
  tone?: Tone;
  hint?: string;
}

export function KpiCard({
  label,
  value,
  tone = "neutral",
  hint,
}: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className={cn("text-xl font-semibold", TONE_CLASSES[tone])}>
          {value}
        </p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
