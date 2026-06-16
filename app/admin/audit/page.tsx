import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AuditPage() {
  return (
    <>
      <PageHeader
        title="Auditoría"
        description="Registro de eventos sensibles: login, ver contraseña, cambios de precio/costo, anulaciones e importaciones."
        breadcrumbs={[{ label: "Sistema" }, { label: "Auditoría" }]}
      />
      <DataTableShell
        title="Eventos de auditoría"
        searchPlaceholder="Buscar por usuario, acción o entidad…"
        state="empty"
        empty={
          <EmptyState
            icon="audit"
            title="Sin eventos registrados"
            message="Los eventos sensibles aparecerán aquí a medida que se opere el sistema."
          />
        }
      />
    </>
  );
}
