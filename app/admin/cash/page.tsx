import { WalletCards } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function CashAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para sesiones de caja, movimientos, pagos, cierres y conciliacion diaria."
      eyebrow="Caja"
      items={[
        "Sesion activa",
        "Movimientos de caja",
        "Metodos de pago",
        "Verificacion de pagos",
        "Cierre diario",
        "Diferencias de caja",
      ]}
      primaryAction={
        <Button>
          <WalletCards size={16} />
          Abrir sesion
        </Button>
      }
      title="Caja"
    />
  );
}

