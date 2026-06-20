import { AlertTriangle, BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { dashboardAlerts, type DashboardAlert } from "@/lib/demo-data/admin";

const columns: DataTableColumn<DashboardAlert>[] = [
  {
    key: "title",
    header: "Alerta",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
          {row.company} / {row.period}
        </p>
      </div>
    ),
  },
  { key: "module", header: "Modulo", render: (row) => row.module },
  { key: "owner", header: "Owner", render: (row) => row.owner },
  {
    key: "priority",
    header: "Prioridad",
    render: (row) => (
      <Badge tone={row.priority === "Alta" ? "danger" : "warning"}>{row.priority}</Badge>
    ),
  },
];

export default function AlertsPage() {
  const highPriority = dashboardAlerts.filter((alert) => alert.priority === "Alta").length;

  return (
    <>
      <SectionHeading
        description="Centro de alertas ejecutivas para riesgos de inventario, caja, ROI y cilindros."
        eyebrow="Alertas"
        title="Notificaciones operativas"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Alertas activas
              </p>
              <p className="mt-3 text-2xl font-semibold">{dashboardAlerts.length}</p>
            </div>
            <BellRing className="text-[var(--color-brand-orange)]" size={22} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Prioridad alta
              </p>
              <p className="mt-3 text-2xl font-semibold">{highPriority}</p>
            </div>
            <AlertTriangle className="text-[var(--color-brand-yellow)]" size={22} />
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Estado demo
          </p>
          <p className="mt-3 text-2xl font-semibold">UI lista</p>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">
              Bandeja de alertas
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              Reutiliza las mismas alertas del dashboard para una vista dedicada.
            </p>
          </div>
          <Badge tone="info">Demo</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            getRowKey={(row) => row.id}
            rows={dashboardAlerts}
          />
        </CardContent>
      </Card>
    </>
  );
}

