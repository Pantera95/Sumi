import { ClipboardCheck } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function InventoryAdminPage() {
  return (
    <ModulePlaceholder
      description="Vista base para stock por almacen, reservado, en proceso, ajustes y kardex."
      eyebrow="Inventario"
      items={[
        "Stock por almacen",
        "Alertas de stock critico",
        "Disponible real",
        "Ajustes con motivo",
        "Kardex por producto",
        "Aprobaciones owner/admin",
      ]}
      primaryAction={
        <Button>
          <ClipboardCheck size={16} />
          Registrar ajuste
        </Button>
      }
      status="UI lista"
      title="Inventario"
    />
  );
}

