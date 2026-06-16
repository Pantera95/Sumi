"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CompanySelector } from "@/components/ui/CompanySelector";
import { findNavItem } from "@/lib/ux/nav";

export function Header({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const current = findNavItem(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-border bg-surface/90 px-4 backdrop-blur">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Abrir menú"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text hover:bg-surface-2 lg:hidden"
      >
        <Icon name="menu" />
      </button>

      <p className="truncate text-sm font-medium text-text">{current?.label ?? "SumiControl"}</p>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:block">
          <CompanySelector />
        </div>
        <button
          type="button"
          aria-label="Alertas"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text hover:bg-surface-2"
        >
          <Icon name="bell" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
        </button>
        <ThemeToggle />
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-2 py-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-xs font-semibold text-white">
            GV
          </span>
          <div className="hidden leading-tight md:block">
            <p className="text-xs font-medium text-text">Greeg V.</p>
            <p className="text-[10px] text-muted">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
