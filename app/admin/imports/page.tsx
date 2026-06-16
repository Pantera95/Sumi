import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

const steps = [
  { n: 1, label: "Subir archivo", done: true },
  { n: 2, label: "Detectar hojas", done: true },
  { n: 3, label: "Clasificar hoja", done: true },
  { n: 4, label: "Mapear columnas", current: true },
  { n: 5, label: "Vista previa" },
  { n: 6, label: "Validar errores" },
  { n: 7, label: "Importar" },
  { n: 8, label: "Resultado" },
];

const resumen = [
  { label: "Filas detectadas", value: "355" },
  { label: "Filas válidas", value: "338" },
  { label: "Filas con error", value: "17" },
  { label: "Duplicados", value: "4" },
  { label: "Total ventas", value: "$23.888" },
  { label: "Total utilidad", value: "$8.035" },
  { label: "Total crédito", value: "$0" },
  { label: "Total contado", value: "$23.888" },
];

export default function ImportsPage() {
  return (
    <>
      <PageHeader
        title="Importaciones"
        description="Flujo guiado para Excel, Valery y Profit. Alimenta dashboard y reportes."
        breadcrumbs={[{ label: "Inventario" }, { label: "Importaciones" }]}
        actions={<Button icon="upload">Subir archivo</Button>}
      />

      <SectionCard title="Progreso de importación" description="MATRIZ DE VENTAS ABRIL 2024.xlsx · hoja “NOTAS DE ENTREGA”">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className={`flex items-center gap-2.5 rounded-xl border p-3 ${
                s.current
                  ? "border-brand bg-brand-soft"
                  : s.done
                    ? "border-border bg-surface-2"
                    : "border-dashed border-border"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  s.done
                    ? "bg-ok text-white"
                    : s.current
                      ? "bg-brand text-white"
                      : "bg-surface text-muted"
                }`}
              >
                {s.n}
              </span>
              <span className={`text-sm ${s.current ? "font-medium text-brand" : "text-text"}`}>{s.label}</span>
            </li>
          ))}
        </ol>
      </SectionCard>

      <div className="mt-6">
        <SectionCard
          title="Resumen detectado"
          description="Validación previa antes de confirmar la importación."
          action={<StatusBadge tone="warn">17 con error</StatusBadge>}
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {resumen.map((r) => (
              <StatCard key={r.label} label={r.label} value={r.value} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button variant="secondary">Ver errores</Button>
            <Button variant="secondary">Crear equivalencias</Button>
            <Button icon="check">Importar 338 filas válidas</Button>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            <li>• 9 productos sin equivalencia (ProductAlias).</li>
            <li>• 3 clientes sin equivalencia (CustomerAlias).</li>
            <li>• 4 documentos duplicados por correlativo.</li>
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
