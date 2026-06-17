"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Globe2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CompanyOption = {
  id: string;
  name: string;
  slug: string;
};

export type CompanySelectorProps = {
  companies: CompanyOption[];
  activeCompanyId: string | null;
  canSeeConsolidated: boolean;
  onChange: (companyId: string | null) => void;
  isChanging?: boolean;
  disabled?: boolean;
};

type SelectorOption = {
  id: string;
  label: string;
  value: string | null;
  kind: "company" | "consolidated";
};

export function CompanySelector({
  companies,
  activeCompanyId,
  canSeeConsolidated,
  onChange,
  isChanging = false,
  disabled = false,
}: CompanySelectorProps) {
  const listboxId = useId();
  const listboxRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const isInteractiveDisabled = disabled || isChanging;

  const options = useMemo<SelectorOption[]>(() => {
    const companyOptions = companies.map((company) => ({
      id: company.id,
      label: company.name,
      value: company.id,
      kind: "company" as const,
    }));

    if (!canSeeConsolidated) {
      return companyOptions;
    }

    return [
      {
        id: "consolidated",
        label: "Consolidado",
        value: null,
        kind: "consolidated" as const,
      },
      ...companyOptions,
    ];
  }, [canSeeConsolidated, companies]);

  const activeCompany = companies.find((company) => company.id === activeCompanyId);
  const selectedOption = options.find((option) => option.value === activeCompanyId);
  const shouldRenderStatic = companies.length <= 1 && !canSeeConsolidated;
  const hasCompanies = companies.length > 0;

  const displayLabel =
    selectedOption?.label ??
    (activeCompanyId === null && canSeeConsolidated
      ? "Consolidado"
      : hasCompanies
        ? "Selecciona empresa"
        : "Sin empresa asignada");

  useEffect(() => {
    if (isOpen) {
      listboxRef.current?.focus();
    }
  }, [isOpen]);

  function closeListbox() {
    setIsOpen(false);
    setFocusedIndex(Math.max(0, options.findIndex((option) => option.value === activeCompanyId)));
  }

  function openListbox() {
    if (isInteractiveDisabled || options.length === 0) {
      return;
    }

    const selectedIndex = options.findIndex((option) => option.value === activeCompanyId);
    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  }

  function selectOption(option: SelectorOption) {
    if (isInteractiveDisabled || option.value === activeCompanyId) {
      closeListbox();
      return;
    }

    onChange(option.value);
    closeListbox();
  }

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openListbox();
      return;
    }

    if (event.key === "Escape") {
      closeListbox();
    }
  }

  function handleListboxKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeListbox();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((index) => Math.min(index + 1, options.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[focusedIndex];
      if (option) {
        selectOption(option);
      }
    }
  }

  if (shouldRenderStatic) {
    return (
      <div className="flex h-10 items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm">
        <Building2
          className="shrink-0 text-[var(--color-brand-orange)]"
          size={18}
        />
        <span className="max-w-40 truncate font-semibold text-[var(--color-foreground)]">
          {activeCompany?.name ?? displayLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-disabled={isInteractiveDisabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Empresa activa"
        className={cn(
          "flex h-10 min-w-0 items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-left text-sm transition-colors hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-yellow)]",
          isInteractiveDisabled && "cursor-not-allowed opacity-60 hover:bg-[var(--color-surface)]",
        )}
        disabled={disabled}
        onClick={() => (isOpen ? closeListbox() : openListbox())}
        onKeyDown={handleButtonKeyDown}
        type="button"
      >
        {activeCompanyId === null && canSeeConsolidated ? (
          <Globe2
            className="shrink-0 text-[var(--color-brand-yellow)]"
            size={18}
          />
        ) : (
          <Building2
            className="shrink-0 text-[var(--color-brand-orange)]"
            size={18}
          />
        )}
        <span className="min-w-0">
          <span className="block max-w-40 truncate font-semibold text-[var(--color-foreground)]">
            {displayLabel}
          </span>
          {activeCompanyId === null && canSeeConsolidated ? (
            <span className="block text-xs text-[var(--color-muted-foreground)]">
              Todas las empresas
            </span>
          ) : null}
        </span>
        {isChanging ? (
          <Loader2
            className="shrink-0 animate-spin text-[var(--color-muted-foreground)]"
            size={16}
          />
        ) : (
          <ChevronDown
            className={cn(
              "shrink-0 text-[var(--color-muted-foreground)] transition-transform",
              isOpen && "rotate-180",
            )}
            size={16}
          />
        )}
      </button>

      {isOpen ? (
        <>
          <button
            aria-label="Cerrar selector de empresa"
            className="fixed inset-0 z-30 cursor-default"
            onClick={closeListbox}
            tabIndex={-1}
            type="button"
          />
          <ul
            aria-label="Empresas disponibles"
            className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 shadow-xl shadow-slate-950/15"
            id={listboxId}
            onKeyDown={handleListboxKeyDown}
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
          >
            {options.map((option, index) => {
              const isSelected = option.value === activeCompanyId;
              const isFocused = index === focusedIndex;

              return (
                <li aria-selected={isSelected} key={option.id} role="option">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors",
                      isFocused && "bg-[var(--color-surface-raised)]",
                      isSelected
                        ? "text-[var(--color-brand-orange)]"
                        : "text-[var(--color-foreground)] hover:bg-[var(--color-surface-raised)]",
                    )}
                    disabled={isInteractiveDisabled}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    type="button"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {option.kind === "consolidated" ? (
                        <Globe2 className="shrink-0" size={17} />
                      ) : (
                        <Building2 className="shrink-0" size={17} />
                      )}
                      <span className="truncate">{option.label}</span>
                      {option.kind === "consolidated" ? (
                        <Badge className="shrink-0" tone="warning">
                          Todas
                        </Badge>
                      ) : null}
                    </span>
                    {isSelected ? <Check className="shrink-0" size={16} /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
