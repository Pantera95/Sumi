import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type ModuleStatus = "UI lista" | "En diseno" | "Pendiente data";

type ModulePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: ModuleStatus;
  primaryAction?: ReactNode;
  items: string[];
  children?: ReactNode;
};

const statusTone: Record<ModuleStatus, "success" | "info" | "warning"> = {
  "UI lista": "success",
  "En diseno": "info",
  "Pendiente data": "warning",
};

export function ModulePlaceholder({
  eyebrow,
  title,
  description,
  status = "En diseno",
  primaryAction,
  items,
  children,
}: ModulePlaceholderProps) {
  return (
    <>
      <SectionHeading
        actions={primaryAction ?? <Button variant="secondary">Preparar flujo</Button>}
        description={description}
        eyebrow={eyebrow}
        title={title}
      />

      <section className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Estado del modulo
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Pantalla base lista para conectar datos y permisos.
              </p>
            </div>
            <Badge tone={statusTone[status]}>{status}</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
              <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
                Esta vista evita pantallas vacias durante la demo y reserva el
                espacio visual del flujo definitivo.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Componentes esperados
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Checklist visual para la feature real.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm font-medium"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {children ? <section>{children}</section> : null}
    </>
  );
}
