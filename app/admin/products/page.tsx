import { PackagePlus } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function ProductsAdminPage() {
  return (
    <ModulePlaceholder
      description="Base administrativa para catalogo, categorias, variantes, precios, IVA y ROI por producto."
      eyebrow="Catalogo"
      items={[
        "Tabla de productos",
        "Filtros por categoria",
        "Estado por empresa",
        "Acciones de importacion",
        "Precio, costo y ROI",
        "Edicion controlada por rol",
      ]}
      primaryAction={
        <Button>
          <PackagePlus size={16} />
          Nuevo producto
        </Button>
      }
      status="UI lista"
      title="Productos"
    />
  );
}

