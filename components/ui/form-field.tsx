import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

const controlClassName =
  "min-h-10 w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-orange-500/15 disabled:cursor-not-allowed disabled:opacity-60";

export function FieldShell({ label, hint, children, className }: FieldShellProps) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1 text-sm font-medium", className)}>
      <span className="text-xs uppercase tracking-normal text-[var(--color-muted-foreground)]">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="text-xs leading-5 text-[var(--color-muted-foreground)]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextField({ className, label, hint, ...props }: TextFieldProps) {
  return (
    <FieldShell hint={hint} label={label}>
      <input className={cn(controlClassName, className)} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  options: string[];
};

export function SelectField({
  className,
  label,
  hint,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell hint={hint} label={label}>
      <select className={cn(controlClassName, className)} {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function TextareaField({
  className,
  label,
  hint,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldShell hint={hint} label={label}>
      <textarea className={cn(controlClassName, "min-h-24 py-2", className)} {...props} />
    </FieldShell>
  );
}

