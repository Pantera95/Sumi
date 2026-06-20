import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  children: ReactNode;
  className?: string;
};

type FilterFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "grid gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FilterField({ label, children, className }: FilterFieldProps) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1 text-sm font-medium", className)}>
      <span className="text-xs uppercase tracking-normal text-[var(--color-muted-foreground)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export const filterControlClassName =
  "h-10 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-3 text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-orange-500/15";

