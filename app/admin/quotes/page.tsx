import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function QuotesPage() {
  return (
    <>
      <PageHeader
        title="Cotizaciones"
        description="Borrador, aprobación y conversión a nota de entrega. La cotización aprobada no descuenta stock."
        breadcrumbs={[{ label: "Operación" }, { label: "Cotizaciones" }]}
        actions={<Button icon="plus">Nueva cotización</Button>}
      />
      <DataTableShell
        title="Cotizaciones"
        description="Documentos en borrador, aprobados y convertidos."
        searchPlaceholder="Buscar por cliente o correlativo…"
        state="empty"
        empty={
          <EmptyState
            icon="quote"
            title="Aún no hay cotizaciones"
            message="Crea la primera cotización para iniciar el flujo comercial. Al aprobarla, los productos quedan “en proceso”."
            actions={<Button icon="plus">Nueva cotización</Button>}
          />
        }
      />
    </>
  );
}
