import { CalendarDays, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AdminHome() {
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
              <Filter size={16} />
              Filtros
            </Button>
          </>
        }
        description="Base visual del admin con estructura reutilizable para KPIs, modulos, reportes y operaciones internas."
        eyebrow="SumiControl admin"
        title="Centro operativo"
      />

      <DashboardWorkspace />
    </>
  );
}
