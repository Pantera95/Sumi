import { CreditCard } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function AccountsAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para cuentas por cobrar, cuentas por pagar, vencimientos y alertas financieras."
      eyebrow="Finanzas"
      items={[
        "Cuentas por cobrar",
        "Cuentas por pagar",
        "Vencimientos",
        "Alertas por cliente",
        "Alertas por proveedor",
        "Resumen financiero",
      ]}
      primaryAction={
        <Button>
          <CreditCard size={16} />
          Registrar cuenta
        </Button>
      }
      title="Cuentas"
    />
  );
}

