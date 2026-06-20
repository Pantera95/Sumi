type BarComparisonChartProps = {
  values: number[];
  primaryLabel: string;
  secondaryLabel: string;
};

export function BarComparisonChart({
  values,
  primaryLabel,
  secondaryLabel,
}: BarComparisonChartProps) {
  return (
    <div>
      <div className="grid h-80 grid-cols-12 items-end gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-chart-backdrop)] p-4">
        {values.map((height, index) => (
          <div className="flex h-full items-end gap-1" key={height + index}>
            <div
              className="w-full rounded-t-sm bg-[var(--color-brand-orange)]"
              style={{ height: `${height}%` }}
            />
            <div
              className="w-full rounded-t-sm bg-[var(--color-brand-yellow)]"
              style={{ height: `${Math.max(18, height - 18)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--color-muted-foreground)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
          {primaryLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--color-brand-yellow)]" />
          {secondaryLabel}
        </span>
      </div>
    </div>
  );
}

