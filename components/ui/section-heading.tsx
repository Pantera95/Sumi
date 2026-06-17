import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-normal text-[var(--color-brand-orange)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-2xl font-semibold tracking-normal text-[var(--color-foreground)]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
