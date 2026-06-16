import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Button } from "@/components/ui/Button";

const sections = [
  { title: "Empresas", desc: "Sumigases y Sudematin: datos, almacenes y consolidado." },
  { title: "Moneda y tasa", desc: "USD/Bs, tasa BCV, IVA 16% y tasa especial por venta." },
  { title: "Documentos", desc: "Correlativos por empresa y tipo, plantillas viejo/nuevo." },
  { title: "Métodos de pago", desc: "Efectivo, punto, transferencia, pago móvil, Zelle, Binance." },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Configuración"
        description="Parámetros base del sistema. La configuración crítica queda reservada a OWNER."
        breadcrumbs={[{ label: "Sistema" }, { label: "Configuración" }]}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <SectionCard key={s.title} title={s.title} description={s.desc} action={<Button variant="secondary">Editar</Button>}>
            <p className="text-sm text-muted">Configuración pendiente de conectar al backend.</p>
          </SectionCard>
        ))}
      </div>
    </>
  );
}
