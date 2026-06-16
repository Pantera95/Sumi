import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function ReceivablesPage() {
  return (
    <>
      <PageHeader
        title="Cuentas por cobrar"
        description="Saldos por cliente, vencimientos, pagos parciales y alertas desde 8-15 días."
        breadcrumbs={[{ label: "Finanzas" }, { label: "Cuentas por cobrar" }]}
        actions={<Button variant="secondary" icon="report">Exportar</Button>}
      />
      <DataTableShell
        title="Cuentas por cobrar"
        searchPlaceholder="Buscar por cliente o documento…"
        state="empty"
        empty={
          <EmptyState
            icon="receivable"
            title="Sin cuentas por cobrar"
            message="Las cuentas por cobrar se generan al registrar ventas a crédito o notas de entrega sin pago verificado."
          />
        }
      />
    </>
  );
}
