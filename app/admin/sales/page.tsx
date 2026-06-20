import { ReceiptText } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function SalesAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para consultar ventas internas, utilidad, cliente, vendedor y documentos asociados."
      eyebrow="Ventas"
      items={[
        "Historial de ventas",
        "Utilidad por venta",
        "Documentos relacionados",
        "Filtros por vendedor",
        "Cliente y empresa",
        "Estados de pago",
      ]}
      primaryAction={
        <Button>
          <ReceiptText size={16} />
          Ver ventas
        </Button>
      }
      title="Ventas internas"
    />
  );
}

