import { Settings } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function SettingsAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para configuracion operativa, empresas, moneda, tasa, impuestos, documentos y permisos."
      eyebrow="Configuracion"
      items={[
        "Empresas",
        "Usuarios y roles",
        "Moneda y tasa",
        "Impuestos",
        "Secuencias",
        "Plantillas de documentos",
      ]}
      primaryAction={
        <Button>
          <Settings size={16} />
          Configurar
        </Button>
      }
      title="Configuracion"
    />
  );
}

