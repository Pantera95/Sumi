import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-orange)] text-white shadow-sm shadow-orange-900/15 hover:bg-[var(--color-brand-orange-strong)]",
  secondary:
    "border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-raised)]",
  ghost:
    "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-foreground)]",
  danger:
    "bg-red-600 text-white shadow-sm shadow-red-900/15 hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-2 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  icon: "h-10 w-10 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-yellow)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
