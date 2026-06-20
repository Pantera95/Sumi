import { ShoppingCart } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function PosAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para venta interna rapida, busqueda de productos, cliente, pagos y documento resultante."
      eyebrow="POS interno"
      items={[
        "Busqueda por SKU",
        "Carrito interno",
        "Cliente y vendedor",
        "Metodos de pago",
        "Validacion de stock",
        "Documento de salida",
      ]}
      primaryAction={
        <Button>
          <ShoppingCart size={16} />
          Nueva venta
        </Button>
      }
      title="POS interno"
    />
  );
}

