import { ClipboardList } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function QuotesAdminPage() {
  return (
    <ModulePlaceholder
      description="Base visual para crear, aprobar y convertir cotizaciones en notas de entrega."
      eyebrow="Ventas"
      items={[
        "Lista de cotizaciones",
        "Estados de aprobacion",
        "Lineas de productos",
        "Precios y descuentos",
        "Conversor a nota",
        "Historial por cliente",
      ]}
      primaryAction={
        <Button>
          <ClipboardList size={16} />
          Nueva cotizacion
        </Button>
      }
      title="Cotizaciones"
    />
  );
}

