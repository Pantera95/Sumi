import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function PayablesPage() {
  return (
    <>
      <PageHeader
        title="Cuentas por pagar"
        description="Saldos por proveedor, abonos y alertas desde 7 días. Visible para owner/admin."
        breadcrumbs={[{ label: "Finanzas" }, { label: "Cuentas por pagar" }]}
        actions={<Button variant="secondary" icon="report">Exportar</Button>}
      />
      <DataTableShell
        title="Cuentas por pagar"
        searchPlaceholder="Buscar por proveedor o compra…"
        state="empty"
        empty={
          <EmptyState
            icon="payable"
            title="Sin cuentas por pagar"
            message="Las cuentas por pagar se generan automáticamente al recibir una orden de compra."
          />
        }
      />
    </>
  );
}
