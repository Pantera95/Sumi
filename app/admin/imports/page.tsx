import { FileSpreadsheet } from "lucide-react";
import { ModulePlaceholder } from "@/components/layout/module-placeholder";
import { Button } from "@/components/ui/button";

export default function ImportsAdminPage() {
  return (
    <ModulePlaceholder
      description="Base para importar Excel, Valery y Profit con validaciones, equivalencias y diferencias."
      eyebrow="Importaciones"
      items={[
        "Carga de archivos",
        "Vista previa",
        "Mapeo de columnas",
        "Equivalencias",
        "Errores y diferencias",
        "Confirmacion controlada",
      ]}
      primaryAction={
        <Button>
          <FileSpreadsheet size={16} />
          Importar archivo
        </Button>
      }
      title="Importaciones"
    />
  );
}

