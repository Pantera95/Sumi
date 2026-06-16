import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatCard } from "@/components/ui/StatCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { AlertCard } from "@/components/ui/AlertCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SeriesChart } from "@/components/ui/SeriesChart";
import {
  kpis,
  roiCards,
  months,
  series,
  productosMayorRetorno,
  categoriasMasRentables,
  cilindrosPorEstado,
  stockCriticoPorAlmacen,
  importacionesRecientes,
  alertasOperativas,
} from "@/lib/ux/dashboard-data";

const selectClass =
  "h-10 rounded-xl border border-border bg-surface px-3 text-sm text-text";

function Filters() {
  return (
    <>
      <label className="sr-only" htmlFor="f-empresa">Empresa</label>
      <select id="f-empresa" className={selectClass} defaultValue="sumigases">
        <option value="sumigases">Sumigases</option>
        <option value="sudematin">Sudematin</option>
        <option value="all">Consolidado</option>
      </select>
      <label className="sr-only" htmlFor="f-rango">Rango</label>
      <select id="f-rango" className={selectClass} defaultValue="year">
        <option value="day">Día</option>
        <option value="week">Semana</option>
        <option value="month">Mes</option>
        <option value="year">Año 2024</option>
      </select>
      <label className="sr-only" htmlFor="f-moneda">Moneda</label>
      <select id="f-moneda" className={selectClass} defaultValue="usd">
        <option value="usd">USD</option>
        <option value="bs">Bs</option>
      </select>
      <label className="sr-only" htmlFor="f-almacen">Almacén</label>
      <select id="f-almacen" className={selectClass} defaultValue="all">
        <option value="all">Todos los almacenes</option>
        <option value="lecheria">Lechería</option>
        <option value="cumana">Cumaná</option>
      </select>
    </>
  );
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visión ejecutiva de ventas, finanzas, inventario y cilindros. Cifras 2024 reales de Sumigases."
        breadcrumbs={[{ label: "Resumen" }, { label: "Dashboard" }]}
        filters={<Filters />}
      />

      {/* 8 tarjetas KPI */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.key} label={k.label} value={k.value} sub={k.sub} tone={k.tone} demo={k.demo} />
        ))}
      </div>

      {/* Bloque Rentabilidad / ROI */}
      <div className="mt-6">
        <SectionCard
          title="Rentabilidad / ROI"
          description="Indicadores de retorno del período. Base real 2024."
          action={<StatusBadge tone="brand">Métrica clave</StatusBadge>}
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {roiCards.map((c) => (
              <StatCard key={c.label} label={c.label} value={c.value} sub={c.sub} accent={c.accent} />
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-text">Productos con mayor retorno</p>
              <ul className="space-y-1.5">
                {productosMayorRetorno.map((p) => (
                  <li key={p.nombre} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate text-muted">{p.nombre}</span>
                    <StatusBadge tone="ok">ROI {p.roi}%</StatusBadge>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-text">Categorías más rentables</p>
              <ul className="space-y-1.5">
                {categoriasMasRentables.map((c) => (
                  <li key={c.nombre} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate text-muted">{c.nombre}</span>
                    <StatusBadge tone="brand">Margen {c.margen}%</StatusBadge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Gráfico protagonista */}
      <div className="mt-6">
        <SectionCard title="Ventas vs utilidad" description="Comparativo mensual 2024 (USD).">
          <SeriesChart
            labels={months}
            series={[
              { name: "Ventas", color: "var(--color-brand)", values: series.ventas },
              { name: "Utilidad", color: "var(--color-navy)", values: series.utilidad },
            ]}
            height={260}
          />
        </SectionCard>
      </div>

      {/* Bloques secundarios */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Ventas vs compras" description="Mensual 2024 (USD).">
          <SeriesChart
            labels={months}
            series={[
              { name: "Ventas", color: "var(--color-brand)", values: series.ventas },
              { name: "Compras", color: "var(--color-info)", values: series.compras },
            ]}
          />
        </SectionCard>
        <SectionCard title="Facturas vs notas de entrega" description="Distribución mensual 2024 (USD).">
          <SeriesChart
            labels={months}
            series={[
              { name: "Facturas", color: "var(--color-navy)", values: series.factura },
              { name: "Notas de entrega", color: "var(--color-accent)", values: series.notasEntrega },
            ]}
          />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Cilindros por estado" description="Inventario operativo de cilindros.">
          <ul className="space-y-3">
            {cilindrosPorEstado.map((c) => {
              const total = cilindrosPorEstado.reduce((a, b) => a + b.cantidad, 0);
              const pct = Math.round((c.cantidad / total) * 100);
              return (
                <li key={c.estado}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <StatusBadge tone={c.tone}>{c.estado}</StatusBadge>
                    <span className="font-medium text-text">{c.cantidad}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Stock crítico por almacén" description="Productos bajo el mínimo definido.">
          <ul className="divide-y divide-border">
            {stockCriticoPorAlmacen.map((s) => (
              <li key={s.almacen} className="flex items-center justify-between py-3 text-sm">
                <span className="text-text">{s.almacen}</span>
                <StatusBadge tone={s.criticos > 3 ? "danger" : "warn"}>{s.criticos} críticos</StatusBadge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Importaciones recientes" description="Últimas matrices cargadas.">
          <div className="sumi-scroll max-w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-2 pr-3 font-medium">Archivo</th>
                  <th className="py-2 pr-3 font-medium">Fecha</th>
                  <th className="py-2 pr-3 font-medium">Filas</th>
                  <th className="py-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {importacionesRecientes.map((imp) => (
                  <tr key={imp.archivo}>
                    <td className="max-w-[14rem] truncate py-2.5 pr-3 text-text">{imp.archivo}</td>
                    <td className="py-2.5 pr-3 text-muted">{imp.fecha}</td>
                    <td className="py-2.5 pr-3 text-muted">{imp.filas}</td>
                    <td className="py-2.5">
                      <StatusBadge tone="ok">{imp.estado}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Alertas operativas" description="Atención requerida.">
          <div className="space-y-3">
            {alertasOperativas.map((a) => (
              <AlertCard key={a.titulo} tone={a.tone} titulo={a.titulo} mensaje={a.mensaje} />
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
