import { Gauge } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function CylindersAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para cilindros, recargas, pendientes de retorno, propiedad y ubicacion."
      eyebrow="Cilindros"
      items={[
        "Stock de cilindros",
        "Pendientes de retorno",
        "Recargas",
        "Propiedad del cilindro",
        "Ubicacion",
        "Conversion especial",
      ]}
      primaryAction={
        <Button>
          <Gauge size={16} />
          Registrar movimiento
        </Button>
      }
      title="Cilindros y recargas"
    />
  );
}

