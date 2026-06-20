import { Settings } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SelectField, TextField, TextareaField } from "@/components/ui/form-field";

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
    >
      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">
              Parametros demo
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              Formulario base para validar estilos de inputs, selects y textos.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <TextField
              defaultValue="Sumigases Oriente C.A."
              hint="Luego vendra desde el selector de empresa."
              label="Empresa activa"
            />
            <SelectField
              defaultValue="USD + tasa BCV"
              label="Moneda operativa"
              options={["USD + tasa BCV", "Bolivares", "Multi-moneda"]}
            />
            <TextField defaultValue="16%" label="IVA por defecto" />
            <SelectField
              defaultValue="Owner/Admin"
              label="Aprobacion ajustes"
              options={["Owner/Admin", "Owner", "Admin"]}
            />
            <TextField defaultValue="NE-000001" label="Secuencia nota entrega" />
            <TextareaField
              className="xl:col-span-1"
              defaultValue="Plantilla demo para documentos internos de SumiControl."
              label="Nota documental"
            />
          </div>
        </CardContent>
      </Card>
    </ModulePlaceholder>
  );
}
