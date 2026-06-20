"use client";

import { useMemo, useState } from "react";
import { BarChart3, Download, Filter, Search, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import {
  FilterBar,
  FilterField,
  filterControlClassName,
} from "@/components/ui/filter-bar";
import { MetricCard } from "@/components/ui/metric-card";
import { roiMatrix, reportRows, type ReportRow } from "@/lib/demo-data/admin";

const columns: DataTableColumn<ReportRow>[] = [
  {
    key: "name",
    header: "Reporte",
    render: (row) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{row.area}</p>
      </div>
    ),
  },
  { key: "company", header: "Empresa", render: (row) => row.company },
  { key: "owner", header: "Owner", render: (row) => row.owner },
  { key: "cadence", header: "Frecuencia", render: (row) => row.cadence },
  {
    key: "status",
    header: "Estado",
    render: (row) => (
      <Badge
        tone={
          row.status === "Listo demo"
            ? "success"
            : row.status === "Pendiente data"
              ? "warning"
              : "info"
        }
      >
        {row.status}
      </Badge>
    ),
  },
];

const toCsv = (rows: ReportRow[]) => {
  const headers = ["Reporte", "Area", "Empresa", "Owner", "Frecuencia", "Periodo", "Estado"];
  const body = rows.map((row) =>
    [row.name, row.area, row.company, row.owner, row.cadence, row.period, row.status]
      .map((cell) => `"${cell.replaceAll('"', '""')}"`)
      .join(","),
  );

  return [headers.join(","), ...body].join("\n");
};

export function ReportsWorkspace() {
  const [company, setCompany] = useState("Todas");
  const [area, setArea] = useState("Todas");
  const [period, setPeriod] = useState("Todos");
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return reportRows.filter((row) => {
      const matchesCompany = company === "Todas" || row.company === company;
      const matchesArea = area === "Todas" || row.area === area;
      const matchesPeriod = period === "Todos" || row.period === period;
      const matchesQuery =
        !normalizedQuery ||
        row.name.toLowerCase().includes(normalizedQuery) ||
        row.area.toLowerCase().includes(normalizedQuery) ||
        row.owner.toLowerCase().includes(normalizedQuery);

      return matchesCompany && matchesArea && matchesPeriod && matchesQuery;
    });
  }, [area, company, period, query]);

  const readyCount = filteredRows.filter((row) => row.status === "Listo demo").length;
  const pendingCount = filteredRows.filter((row) => row.status === "Pendiente data").length;
  const averageRoi = Math.round(
    roiMatrix.reduce((sum, item) => sum + item.value, 0) / roiMatrix.length,
  );

  const reportMetrics = [
    {
      label: "Reportes visibles",
      value: String(filteredRows.length),
      detail: `${readyCount} listos para demo`,
      trend: "+3",
      trendDirection: "up" as const,
      icon: <BarChart3 size={20} />,
    },
    {
      label: "ROI promedio",
      value: `${averageRoi}%`,
      detail: "Data simulada para demo",
      trend: "+6%",
      trendDirection: "up" as const,
      icon: <TrendingUp size={20} />,
    },
    {
      label: "Pendientes data",
      value: String(pendingCount),
      detail: "Esperan importador/modelos",
      trend: "mock",
      trendDirection: "flat" as const,
      icon: <Filter size={20} />,
    },
  ];

  const handleExport = () => {
    const blob = new Blob([toCsv(filteredRows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sumicontrol-reportes-demo.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        {reportMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <FilterBar>
        <FilterField label="Buscar">
          <div className="flex h-10 items-center gap-2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-3">
            <Search className="shrink-0 text-[var(--color-muted-foreground)]" size={16} />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted-foreground)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Reporte, area u owner"
              value={query}
            />
          </div>
        </FilterField>
        <FilterField label="Empresa">
          <select
            className={filterControlClassName}
            onChange={(event) => setCompany(event.target.value)}
            value={company}
          >
            <option>Todas</option>
            <option>Sumigases</option>
            <option>Sudematin</option>
            <option>Consolidado</option>
          </select>
        </FilterField>
        <FilterField label="Area">
          <select
            className={filterControlClassName}
            onChange={(event) => setArea(event.target.value)}
            value={area}
          >
            <option>Todas</option>
            <option>Ventas</option>
            <option>Inventario</option>
            <option>Finanzas</option>
            <option>Rentabilidad</option>
            <option>Cilindros</option>
            <option>Importaciones</option>
          </select>
        </FilterField>
        <FilterField label="Periodo">
          <select
            className={filterControlClassName}
            onChange={(event) => setPeriod(event.target.value)}
            value={period}
          >
            <option>Todos</option>
            <option>Junio 2026</option>
            <option>Mayo 2026</option>
            <option>2024 importado</option>
          </select>
        </FilterField>
      </FilterBar>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Biblioteca de reportes
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {filteredRows.length} resultados filtrados para la vista actual.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge tone="info">MVP</Badge>
              <Button onClick={handleExport} size="sm" variant="secondary">
                <Download size={14} />
                CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              emptyState="No hay reportes que coincidan con esos filtros."
              getRowKey={(row) => `${row.name}-${row.company}-${row.period}`}
              rows={filteredRows}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Matriz ROI
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Base visual para rentabilidad transversal.
              </p>
            </div>
            <Badge tone="warning">Demo</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roiMatrix.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-semibold text-[var(--color-brand-yellow)]">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[var(--color-brand-orange)]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

