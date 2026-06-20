import { Truck } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function DeliveryNotesAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para entregas completas o parciales, descuento real de stock y devoluciones internas."
      eyebrow="Operaciones"
      items={[
        "Notas pendientes",
        "Entrega parcial",
        "Descuento de stock",
        "Rechazos del cliente",
        "Devolucion interna",
        "Secuencia de documento",
      ]}
      primaryAction={
        <Button>
          <Truck size={16} />
          Nueva nota
        </Button>
      }
      title="Notas de entrega"
    />
  );
}

