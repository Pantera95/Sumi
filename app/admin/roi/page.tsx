import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SeriesChart } from "@/components/ui/SeriesChart";
import {
  roiCards,
  months,
  series,
  productosMayorRetorno,
  categoriasMasRentables,
} from "@/lib/ux/dashboard-data";

export default function RoiPage() {
  return (
    <>
      <PageHeader
        title="ROI / Rentabilidad"
        description="ROI como métrica transversal: producto, categoría, compras, cilindros y clientes. Base real 2024."
        breadcrumbs={[{ label: "Inteligencia" }, { label: "ROI / Rentabilidad" }]}
      />

      <SectionCard title="Indicadores del período" action={<StatusBadge tone="brand">2024</StatusBadge>}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {roiCards.map((c) => (
            <StatCard key={c.label} label={c.label} value={c.value} sub={c.sub} accent={c.accent} />
          ))}
        </div>
      </SectionCard>

      <div className="mt-6">
        <SectionCard title="Ventas vs utilidad" description="Evolución mensual de la rentabilidad (USD).">
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

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SectionCard title="ROI por producto" description="Mayor retorno sobre costo.">
          <ul className="divide-y divide-border">
            {productosMayorRetorno.map((p) => (
              <li key={p.nombre} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="truncate text-text">{p.nombre}</span>
                <StatusBadge tone="ok">ROI {p.roi}%</StatusBadge>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="ROI por categoría" description="Margen bruto promedio.">
          <ul className="divide-y divide-border">
            {categoriasMasRentables.map((c) => (
              <li key={c.nombre} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="truncate text-text">{c.nombre}</span>
                <StatusBadge tone="brand">Margen {c.margen}%</StatusBadge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
