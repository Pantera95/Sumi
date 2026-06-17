import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
  trendDirection?: "up" | "down" | "flat";
  icon?: ReactNode;
};

export function MetricCard({
  label,
  value,
  detail,
  trend,
  trendDirection = "flat",
  icon,
}: MetricCardProps) {
  const TrendIcon = trendDirection === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="min-h-36 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
            {label}
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-normal text-[var(--color-foreground)]">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-navy)] text-white">
            {icon}
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="truncate text-sm text-[var(--color-muted-foreground)]">
          {detail}
        </span>
        {trend ? (
          <Badge
            className={cn(
              "shrink-0 gap-1",
              trendDirection === "up" &&
                "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
              trendDirection === "down" &&
                "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300",
            )}
          >
            {trendDirection === "flat" ? null : <TrendIcon size={14} />}
            {trend}
          </Badge>
        ) : null}
      </div>
    </Card>
  );
}
