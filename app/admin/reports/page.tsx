import {
  BarChart3,
  CalendarDays,
  Download,
  FileSpreadsheet,
  Filter,
  TrendingUp,
} from "lucide-react";
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
import { SectionHeading } from "@/components/ui/section-heading";

type ReportRow = {
  name: string;
  area: string;
  owner: string;
  cadence: string;
  status: "Listo demo" | "Pendiente data" | "En diseno";
};

const reportMetrics = [
  {
    label: "Reportes demo",
    value: "8",
    detail: "Ventas, caja, inventario y ROI",
    trend: "+3",
    trendDirection: "up" as const,
    icon: <FileSpreadsheet size={20} />,
  },
  {
    label: "ROI promedio",
    value: "34%",
    detail: "Data simulada para demo",
    trend: "+6%",
    trendDirection: "up" as const,
    icon: <TrendingUp size={20} />,
  },
  {
    label: "Matrices listas",
    value: "4",
    detail: "Excel / Valery / Profit",
    trend: "mock",
    trendDirection: "flat" as const,
    icon: <BarChart3 size={20} />,
  },
];

const reportRows: ReportRow[] = [
  {
    name: "Ventas por producto",
    area: "Ventas",
    owner: "Admin",
    cadence: "Diario",
    status: "Listo demo",
  },
  {
    name: "Stock critico por almacen",
    area: "Inventario",
    owner: "Almacen",
    cadence: "Diario",
    status: "Listo demo",
  },
  {
    name: "ROI por categoria",
    area: "Rentabilidad",
    owner: "Owner",
    cadence: "Semanal",
    status: "Pendiente data",
  },
  {
    name: "Cuentas por cobrar vencidas",
    area: "Finanzas",
    owner: "Caja",
    cadence: "Diario",
    status: "En diseno",
  },
  {
    name: "Cilindros pendientes por cliente",
    area: "Cilindros",
    owner: "Operaciones",
    cadence: "Semanal",
    status: "Pendiente data",
  },
];

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

export default function ReportsPage() {
  return (
    <>
      <SectionHeading
        actions={
          <>
            <Button variant="secondary">
              <CalendarDays size={16} />
              Mes actual
            </Button>
            <Button>
              <Download size={16} />
              Exportar
            </Button>
          </>
        }
        description="Centro de reportes basicos para demo: ventas, inventario, caja, ROI y matrices importadas."
        eyebrow="Reportes"
        title="Reportes operativos"
      />

      <section className="grid gap-4 md:grid-cols-3">
        {reportMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <FilterBar>
        <FilterField label="Empresa">
          <select className={filterControlClassName} defaultValue="Sumigases">
            <option>Sumigases</option>
            <option>Sudematin</option>
            <option>Consolidado</option>
          </select>
        </FilterField>
        <FilterField label="Area">
          <select className={filterControlClassName} defaultValue="Todas">
            <option>Todas</option>
            <option>Ventas</option>
            <option>Inventario</option>
            <option>Finanzas</option>
            <option>Rentabilidad</option>
          </select>
        </FilterField>
        <FilterField label="Periodo">
          <select className={filterControlClassName} defaultValue="Junio 2026">
            <option>Junio 2026</option>
            <option>Mayo 2026</option>
            <option>2024 importado</option>
          </select>
        </FilterField>
        <div className="flex items-end">
          <Button className="w-full" variant="secondary">
            <Filter size={16} />
            Aplicar filtros
          </Button>
        </div>
      </FilterBar>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Biblioteca de reportes
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Estados visibles para priorizar la demo y la conexion de datos.
              </p>
            </div>
            <Badge tone="info">MVP</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={columns} getRowKey={(row) => row.name} rows={reportRows} />
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
              {[
                ["Productos", "41%"],
                ["Compras", "28%"],
                ["Clientes", "35%"],
                ["Cilindros", "19%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-semibold text-[var(--color-brand-yellow)]">
                      {value}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[var(--color-brand-orange)]"
                      style={{ width: value }}
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

