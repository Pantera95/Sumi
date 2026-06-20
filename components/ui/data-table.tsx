import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyState?: ReactNode;
};

const alignments = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyState = "No hay datos para mostrar.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-[var(--color-surface-raised)] text-xs uppercase text-[var(--color-muted-foreground)]">
          <tr>
            {columns.map((column) => (
              <th
                className={cn(
                  "whitespace-nowrap px-4 py-3 font-semibold tracking-normal",
                  alignments[column.align ?? "left"],
                )}
                key={column.key}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr className="hover:bg-white/5" key={getRowKey(row)}>
                {columns.map((column) => (
                  <td
                    className={cn(
                      "px-4 py-3 text-[var(--color-foreground)]",
                      alignments[column.align ?? "left"],
                    )}
                    key={column.key}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]"
                colSpan={columns.length}
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

