import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "info" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  neutral:
    "border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-muted-foreground)]",
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-yellow-500/30 bg-yellow-500/12 text-yellow-700 dark:text-yellow-200",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  danger: "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
