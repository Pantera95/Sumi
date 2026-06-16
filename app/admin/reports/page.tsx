import { PageHeader } from "@/components/layout/PageHeader";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { SectionCard } from "@/components/ui/SectionCard";

const reportes = [
  { title: "Ventas diarias", desc: "Ventas por día, vendedor y documento." },
  { title: "Ventas por producto", desc: "Unidades, ingreso y utilidad por SKU." },
  { title: "Ventas por categoría", desc: "Distribución y margen por categoría." },
  { title: "Facturas vs notas de entrega", desc: "Comparativo de documentos emitidos." },
  { title: "Crédito vs contado", desc: "Composición de cobros del período." },
  { title: "Utilidad", desc: "Utilidad bruta y neta por período." },
  { title: "Cuentas por cobrar", desc: "Saldos y vencimientos por cliente." },
  { title: "Caja", desc: "Movimientos, cobros y diferencias." },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reportes"
        description="Reportes administrativos exportables a PDF, CSV y Excel."
        breadcrumbs={[{ label: "Inteligencia" }, { label: "Reportes" }]}
      />
      <SectionCard title="Reportes disponibles" description="Selecciona un reporte para configurar filtros y exportar.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reportes.map((r) => (
            <ModuleCard key={r.title} href="/admin/reports" icon="report" title={r.title} description={r.desc} />
          ))}
        </div>
      </SectionCard>
    </>
  );
}
