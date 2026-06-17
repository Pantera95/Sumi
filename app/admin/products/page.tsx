import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Productos y catálogo"
        description="Maestro de productos, categorías, SKU, código de barras y variantes."
        breadcrumbs={[{ label: "Inventario" }, { label: "Productos y catálogo" }]}
        actions={
          <>
            <Button variant="secondary" icon="import">Importar productos</Button>
            <Button icon="plus">Crear producto</Button>
          </>
        }
      />
      <DataTableShell
        title="Catálogo"
        searchPlaceholder="Buscar por SKU, nombre o código…"
        state="empty"
        empty={
          <EmptyState
            icon="products"
            title="Aún no hay productos cargados"
            message="Importa una plantilla Excel o crea el primer producto para comenzar a controlar inventario."
            actions={
              <>
                <Button icon="import">Importar productos</Button>
                <Button variant="secondary" icon="plus">Crear producto</Button>
              </>
            }
          />
        }
      />
    </>
  );
}
