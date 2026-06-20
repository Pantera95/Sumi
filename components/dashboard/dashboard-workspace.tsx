"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  FileSpreadsheet,
  PackageCheck,
  Truck,
  WalletCards,
} from "lucide-react";
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart";
import { OperationsList } from "@/components/dashboard/operations-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  FilterBar,
  FilterField,
  filterControlClassName,
} from "@/components/ui/filter-bar";
import { MetricCard } from "@/components/ui/metric-card";
import {
  dashboardAlerts,
  dashboardChartValues,
  dashboardMetrics,
  dashboardOperations,
  uiFoundations,
  type DashboardAlert,
  type DashboardMetric,
} from "@/lib/demo-data/admin";

const metricIcons = {
  sales: <CircleDollarSign size={20} />,
  finance: <WalletCards size={20} />,
  inventory: <Boxes size={20} />,
  cylinders: <Truck size={20} />,
} satisfies Record<DashboardMetric["area"], React.ReactNode>;

const alertColumns: DataTableColumn<DashboardAlert>[] = [
  {
    key: "title",
    header: "Alerta",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{row.module}</p>
      </div>
    ),
  },
  { key: "owner", header: "Owner", render: (row) => row.owner },
  {
    key: "priority",
    header: "Prioridad",
    render: (row) => (
      <Badge tone={row.priority === "Alta" ? "danger" : "warning"}>{row.priority}</Badge>
    ),
  },
];

export function DashboardWorkspace() {
  const [company, setCompany] = useState("Sumigases");
  const [period, setPeriod] = useState("Junio 2026");

  const filteredMetrics = useMemo(
    () =>
      dashboardMetrics.filter(
        (metric) => metric.company === company && metric.period === period,
      ),
    [company, period],
  );

  const filteredOperations = useMemo(
    () =>
      dashboardOperations.filter(
        (operation) => operation.company === company && operation.period === period,
      ),
    [company, period],
  );

  const filteredAlerts = useMemo(
    () =>
      dashboardAlerts.filter(
        (alert) => alert.company === company && alert.period === period,
      ),
    [company, period],
  );

  const visibleMetrics =
    filteredMetrics.length > 0
      ? filteredMetrics
      : dashboardMetrics.filter((metric) => metric.company === "Consolidado");

  return (
    <>
      <FilterBar className="xl:grid-cols-[220px_220px_1fr]">
        <FilterField label="Empresa">
          <select
            className={filterControlClassName}
            onChange={(event) => setCompany(event.target.value)}
            value={company}
          >
            <option>Sumigases</option>
            <option>Sudematin</option>
            <option>Consolidado</option>
          </select>
        </FilterField>
        <FilterField label="Periodo">
          <select
            className={filterControlClassName}
            onChange={(event) => setPeriod(event.target.value)}
            value={period}
          >
            <option>Junio 2026</option>
            <option>Mayo 2026</option>
            <option>2024 importado</option>
          </select>
        </FilterField>
        <div className="flex items-end">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm text-[var(--color-muted-foreground)]">
            Vista demo filtrada para {company} / {period}
          </div>
        </div>
      </FilterBar>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleMetrics.map((metric) => (
          <MetricCard
            detail={metric.detail}
            icon={metricIcons[metric.area]}
            key={`${metric.label}-${metric.company}-${metric.period}-${metric.area}`}
            label={metric.label}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            value={metric.value}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Ventas vs utilidad
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Base visual preparada para conectar Recharts y data real.
              </p>
            </div>
            <Badge tone="info">Dashboard-ready</Badge>
          </CardHeader>
          <CardContent>
            <BarComparisonChart
              primaryLabel="Ventas"
              secondaryLabel="Utilidad"
              values={dashboardChartValues}
            />
          </CardContent>
        </Card>

        <OperationsList
          items={
            filteredOperations.length > 0
              ? filteredOperations
              : dashboardOperations.filter((operation) => operation.company === "Consolidado")
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Alertas ejecutivas
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Riesgos visibles por empresa y periodo.
              </p>
            </div>
            <AlertTriangle className="text-[var(--color-brand-yellow)]" size={20} />
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={alertColumns}
              emptyState="No hay alertas activas para esta vista."
              getRowKey={(row) => row.id}
              rows={filteredAlerts}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Reportes
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Preparado para ROI y matrices.
              </p>
            </div>
            <FileSpreadsheet size={20} className="text-[var(--color-brand-orange)]" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge tone="warning">ROI / Rentabilidad</Badge>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
              <p className="text-sm font-medium">Matrices 2024</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
                El layout ya reserva espacio para importaciones, filtros y graficos.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Base reutilizable
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Componentes listos para que dashboard y reportes crezcan sin duplicar UI.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {uiFoundations.map((item) => (
                <div
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm font-medium"
                  key={item}
                >
                  <PackageCheck
                    className="shrink-0 text-[var(--color-brand-orange)]"
                    size={18}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

