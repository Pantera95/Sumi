import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { cilindrosPorEstado } from "@/lib/ux/dashboard-data";

export default function CylindersPage() {
  return (
    <>
      <PageHeader
        title="Cilindros y recargas"
        description="Control por cantidad, estado, propiedad y ubicación. Alertas de pendientes por retorno."
        breadcrumbs={[{ label: "Inventario" }, { label: "Cilindros y recargas" }]}
        actions={
          <>
            <Button variant="secondary" icon="cylinder">Ver recargas</Button>
            <Button icon="plus">Registrar movimiento</Button>
          </>
        }
      />

      <SectionCard title="Cilindros por estado" description="Distribución operativa actual.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cilindrosPorEstado.map((c) => (
            <div key={c.estado} className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-2xl font-semibold text-text">{c.cantidad}</p>
              <div className="mt-1.5">
                <StatusBadge tone={c.tone}>{c.estado}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="mt-6">
        <SectionCard title="Movimientos de cilindros">
          <EmptyState
            icon="cylinder"
            title="No hay movimientos de cilindros registrados"
            message="Registra una entrega, recepción o intercambio para comenzar el control de pendientes por retorno."
            actions={
              <>
                <Button icon="plus">Registrar movimiento</Button>
                <Button variant="secondary">Ver recargas</Button>
              </>
            }
          />
        </SectionCard>
      </div>
    </>
  );
}
