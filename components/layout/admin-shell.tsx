"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  Gauge,
  LayoutDashboard,
  Menu,
  Package,
  ReceiptText,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CompanySelector, type CompanyOption } from "@/components/layout/CompanySelector";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Productos", href: "/admin/products", icon: Package },
  { label: "Inventario", href: "/admin/inventory", icon: Boxes },
  { label: "POS interno", href: "/admin/pos", icon: ShoppingCart },
  { label: "Cotizaciones", href: "/admin/quotes", icon: ClipboardList },
  { label: "Notas de entrega", href: "/admin/delivery-notes", icon: Truck },
  { label: "Ventas internas", href: "/admin/sales", icon: ReceiptText },
  { label: "Caja", href: "/admin/cash", icon: WalletCards },
  { label: "Cuentas", href: "/admin/accounts", icon: CreditCard },
  { label: "Cilindros", href: "/admin/cylinders", icon: Gauge },
  { label: "Reportes", href: "/admin/reports", icon: BarChart3 },
  { label: "Importaciones", href: "/admin/imports", icon: FileText },
  { label: "Configuracion", href: "/admin/settings", icon: Settings },
];

const demoCompanies: CompanyOption[] = [
  { id: "sumigases", name: "Sumigases", slug: "sumigases" },
  { id: "sudematin", name: "Sudematin", slug: "sudematin" },
];

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>("sumigases");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const canSeeConsolidated = true;

  const renderNavigation = () => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {navigation.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === item.href || pathname === "/admin/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white",
              isActive &&
                "bg-white text-[var(--color-brand-navy)] hover:bg-white hover:text-[var(--color-brand-navy)]",
            )}
            href={item.href}
            key={item.href}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Icon size={18} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[var(--color-border)] bg-[var(--color-sidebar)] lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-orange)] text-sm font-bold text-white">
            SC
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">SumiControl</p>
            <p className="truncate text-xs text-slate-300">Admin operativo</p>
          </div>
        </div>

        <div className="border-b border-white/10 px-4 py-4">
          <div className="rounded-lg border border-white/10 bg-white/7 px-3 py-3 text-sm text-white">
            <p className="font-semibold">Vista administrativa</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              Empresa activa desde el header.
            </p>
          </div>
        </div>

        {renderNavigation()}

        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg border border-yellow-400/25 bg-yellow-400/10 p-3 text-yellow-50">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Demo en progreso</p>
                <p className="mt-1 text-xs leading-5 text-yellow-50/80">
                  Base UI lista para conectar auth, datos y permisos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Cerrar navegacion"
            className="absolute inset-0 bg-slate-950/70"
            onClick={() => setIsMobileNavOpen(false)}
            type="button"
          />
          <aside className="relative flex h-full w-[min(22rem,88vw)] flex-col border-r border-[var(--color-border)] bg-[var(--color-sidebar)] shadow-2xl shadow-black/30">
            <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-orange)] text-sm font-bold text-white">
                SC
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">SumiControl</p>
                <p className="truncate text-xs text-slate-300">Admin operativo</p>
              </div>
            </div>
            <div className="border-b border-white/10 px-4 py-4 sm:hidden">
              <CompanySelector
                activeCompanyId={activeCompanyId}
                canSeeConsolidated={canSeeConsolidated}
                companies={demoCompanies}
                onChange={setActiveCompanyId}
              />
            </div>
            {renderNavigation()}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-topbar)] backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 md:px-6">
            <Button
              aria-label="Abrir navegacion"
              className="lg:hidden"
              onClick={() => setIsMobileNavOpen(true)}
              size="icon"
              variant="secondary"
            >
              <Menu size={18} />
            </Button>

            <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 md:flex">
              <Search
                className="shrink-0 text-[var(--color-muted-foreground)]"
                size={18}
              />
              <input
                className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted-foreground)]"
                placeholder="Buscar modulo, cliente o documento"
                type="search"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:block">
                <CompanySelector
                  activeCompanyId={activeCompanyId}
                  canSeeConsolidated={canSeeConsolidated}
                  companies={demoCompanies}
                  onChange={setActiveCompanyId}
                />
              </div>
              <Button aria-label="Notificaciones" size="icon" variant="secondary">
                <Bell size={18} />
              </Button>
              <button className="flex h-10 items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-left text-sm">
                <span className="hidden md:block">
                  <span className="block font-semibold text-[var(--color-foreground)]">
                    Salem
                  </span>
                  <span className="block text-xs text-[var(--color-muted-foreground)]">
                    Owner UI
                  </span>
                </span>
                <ChevronDown
                  className="text-[var(--color-muted-foreground)]"
                  size={16}
                />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
