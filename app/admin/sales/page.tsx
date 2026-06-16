import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function SalesPage() {
  return (
    <>
      <PageHeader
        title="Ventas internas"
        description="Registro operativo de ventas y su relación con caja y cuentas por cobrar."
        breadcrumbs={[{ label: "Operación" }, { label: "Ventas internas" }]}
        actions={<Button icon="plus">Nueva venta</Button>}
      />
      <DataTableShell
        title="Ventas internas"
        searchPlaceholder="Buscar por cliente o documento…"
        state="empty"
        empty={
          <EmptyState
            icon="sales"
            title="Aún no hay ventas internas"
            message="Registra una venta desde el POS o conviértela desde una nota de entrega."
            actions={<Button icon="plus">Nueva venta</Button>}
          />
        }
      />
    </>
  );
}
