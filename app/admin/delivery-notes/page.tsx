import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function DeliveryNotesPage() {
  return (
    <>
      <PageHeader
        title="Notas de entrega"
        description="La nota de entrega es el punto único de descuento de stock. Requiere cliente registrado y correlativo."
        breadcrumbs={[{ label: "Operación" }, { label: "Notas de entrega" }]}
        actions={<Button icon="plus">Nueva nota de entrega</Button>}
      />
      <DataTableShell
        title="Notas de entrega"
        description="Despachos totales y parciales."
        searchPlaceholder="Buscar por cliente o correlativo…"
        state="empty"
        empty={
          <EmptyState
            icon="delivery"
            title="Aún no hay notas de entrega"
            message="Genera una nota de entrega desde una cotización aprobada o desde el POS para descontar stock."
            actions={
              <>
                <Button icon="plus">Nueva nota de entrega</Button>
                <Button variant="secondary">Ver cotizaciones</Button>
              </>
            }
          />
        }
      />
    </>
  );
}
