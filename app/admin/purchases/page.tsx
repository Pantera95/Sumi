import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function PurchasesPage() {
  return (
    <>
      <PageHeader
        title="Compras"
        description="Órdenes de compra, recepción parcial y actualización de costo. Genera cuenta por pagar al recibir."
        breadcrumbs={[{ label: "Finanzas" }, { label: "Compras" }]}
        actions={<Button icon="plus">Nueva orden de compra</Button>}
      />
      <DataTableShell
        title="Órdenes de compra"
        searchPlaceholder="Buscar por proveedor o número…"
        state="empty"
        empty={
          <EmptyState
            icon="purchase"
            title="Aún no hay órdenes de compra"
            message="Crea una orden de compra para reservar presupuesto y registrar la recepción de mercancía."
            actions={<Button icon="plus">Nueva orden de compra</Button>}
          />
        }
      />
    </>
  );
}
