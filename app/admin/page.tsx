import {
  BarChart3,
  Boxes,
  CalendarDays,
  CircleDollarSign,
  FileSpreadsheet,
  Filter,
  PackageCheck,
  RefreshCw,
  Truck,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionHeading } from "@/components/ui/section-heading";

const metrics = [
  {
    label: "Ventas hoy",
    value: "$ 8.420",
    detail: "34 documentos internos",
    trend: "+12%",
    trendDirection: "up" as const,
    icon: <CircleDollarSign size={20} />,
  },
  {
    label: "Cuentas por cobrar",
    value: "$ 18.950",
    detail: "9 clientes con alerta",
    trend: "8-15 dias",
    trendDirection: "flat" as const,
    icon: <WalletCards size={20} />,
  },
  {
    label: "Stock critico",
    value: "27",
    detail: "5 almacenes revisados",
    trend: "-4",
    trendDirection: "down" as const,
    icon: <Boxes size={20} />,
  },
  {
    label: "Cilindros pendientes",
    value: "63",
    detail: "Retorno por cliente",
    trend: "+7",
    trendDirection: "up" as const,
    icon: <Truck size={20} />,
  },
];

const operations = [
  ["Cotizaciones por aprobar", "14", "Owner/Admin"],
  ["Notas de entrega pendientes", "22", "Almacen"],
  ["Pagos por verificar", "11", "Caja"],
  ["Importaciones recientes", "3", "Excel 2024"],
];

const foundations = [
  "Tokens visuales claro/oscuro",
  "Botones, badges, cards y metric cards",
  "Sidebar administrativo responsive",
  "Header con busqueda y acciones",
  "Base lista para modulos futuros",
];

export default function AdminHome() {
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
              <Filter size={16} />
              Filtros
            </Button>
          </>
        }
        description="Base visual del admin con estructura reutilizable para KPIs, modulos, reportes y operaciones internas."
        eyebrow="SumiControl admin"
        title="Centro operativo"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
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
                Espacio preparado para conectar Recharts y data real.
              </p>
            </div>
            <Badge tone="info">Dashboard-ready</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid h-80 grid-cols-12 items-end gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-chart-backdrop)] p-4">
              {[38, 52, 44, 68, 58, 76, 64, 82, 73, 88, 79, 92].map(
                (height, index) => (
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
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Operacion prioritaria
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Cola ejecutiva para demo.
              </p>
            </div>
            <Button aria-label="Actualizar operaciones" size="icon" variant="ghost">
              <RefreshCw size={18} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {operations.map(([label, value, area]) => (
              <div
                className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3"
                key={label}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--color-foreground)]">
                    {label}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                    {area}
                  </p>
                </div>
                <span className="text-lg font-semibold text-[var(--color-brand-orange)]">
                  {value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Base reutilizable
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Componentes listos para que dashboard y reportes crezcan sin
                duplicar UI.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {foundations.map((item) => (
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
            <BarChart3 size={20} className="text-[var(--color-brand-orange)]" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge tone="warning">ROI / Rentabilidad</Badge>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet
                  className="text-[var(--color-brand-yellow)]"
                  size={20}
                />
                <p className="text-sm font-medium">Matrices 2024</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
                El layout ya reserva espacio para importaciones, filtros y
                graficos.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
