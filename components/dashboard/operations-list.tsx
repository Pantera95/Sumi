import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

type OperationItem = {
  label: string;
  value: string;
  area: string;
  priority?: "Alta" | "Media" | "Baja";
};

type OperationsListProps = {
  items: OperationItem[];
};

export function OperationsList({ items }: OperationsListProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            Operacion prioritaria
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Cola ejecutiva para demo.
          </p>
        </div>
        <Button aria-label="Actualizar operaciones" size="icon" variant="ghost">
          <RefreshCw size={18} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3"
            key={item.label}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-foreground)]">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                {item.area}
              </p>
            </div>
                <span className="text-lg font-semibold text-[var(--color-brand-orange)]">
                  {item.value}
                </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
