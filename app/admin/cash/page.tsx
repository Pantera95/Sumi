import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function CashPage() {
  return (
    <>
      <PageHeader
        title="Caja y pagos"
        description="Flujo de caja, métodos de pago y verificación. Los pagos no verificados no cuentan como cobrados."
        breadcrumbs={[{ label: "Finanzas" }, { label: "Caja y pagos" }]}
        actions={<Button icon="plus">Registrar pago</Button>}
      />
      <SectionCard title="Flujo de caja" description="Estado de cobros del período.">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Cobrado verificado" value="$0" sub="demo" />
          <StatCard label="Pendiente por verificar" value="$0" sub="demo" />
          <StatCard label="Por cobrar" value="$0" sub="demo" />
          <StatCard label="Diferencias de caja" value="$0" sub="demo" />
        </div>
      </SectionCard>
      <div className="mt-6">
        <SectionCard title="Movimientos de caja">
          <EmptyState
            icon="cash"
            title="No hay movimientos de caja"
            message="Registra un pago o abre una sesión de caja para comenzar a controlar cobros y diferencias."
            actions={<Button icon="plus">Registrar pago</Button>}
          />
        </SectionCard>
      </div>
    </>
  );
}
