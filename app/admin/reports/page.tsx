import { CalendarDays, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportsWorkspace } from "@/components/reports/reports-workspace";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ReportsPage() {
  return (
    <>
      <SectionHeading
        actions={
          <>
            <Button variant="secondary">
              <CalendarDays size={16} />
              Mes actual
            </Button>
            <Button>
              <Download size={16} />
              Exportar
            </Button>
          </>
        }
        description="Centro de reportes basicos para demo: ventas, inventario, caja, ROI y matrices importadas."
        eyebrow="Reportes"
        title="Reportes operativos"
      />

      <ReportsWorkspace />
    </>
  );
}
