import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function PosPage() {
  return (
    <>
      <PageHeader
        title="POS interno"
        description="Control interno paralelo a Valery: cliente, búsqueda por SKU/código, descuentos, IVA y total."
        breadcrumbs={[{ label: "Operación" }, { label: "POS interno" }]}
        actions={<Button icon="plus">Nueva venta</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Catálogo" description="Busca por SKU, nombre, categoría o código de barras.">
          <EmptyState
            icon="pos"
            title="Inicia una venta"
            message="Busca un producto y agrégalo al carrito. El cliente es obligatorio (puede ser cliente genérico)."
            actions={<Button icon="search">Buscar producto</Button>}
          />
        </SectionCard>
        <SectionCard title="Carrito">
          <EmptyState icon="pos" title="Carrito vacío" message="Agrega productos para ver subtotal, descuento, IVA y total." />
        </SectionCard>
      </div>
    </>
  );
}
