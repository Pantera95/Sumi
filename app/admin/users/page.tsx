"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const users = [
  { nombre: "Owner Demo", usuario: "owner", rol: "OWNER", empresa: "Ambas", tone: "brand" as const },
  { nombre: "Admin Demo", usuario: "admin", rol: "ADMIN", empresa: "Ambas", tone: "info" as const },
  { nombre: "Auditor Demo", usuario: "auditor", rol: "AUDITOR", empresa: "Sudematin", tone: "muted" as const },
];

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Usuarios y roles"
        description="Gestión de usuarios, roles y permisos. Solo OWNER/ADMIN pueden ver contraseñas (auditado)."
        breadcrumbs={[{ label: "Sistema" }, { label: "Usuarios y roles" }]}
        actions={<Button icon="plus">Nuevo usuario</Button>}
      />
      <DataTableShell title="Usuarios" searchPlaceholder="Buscar por nombre o usuario…">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr className="border-b border-border">
              <th className="py-2.5 pr-3 font-medium">Nombre</th>
              <th className="py-2.5 pr-3 font-medium">Usuario</th>
              <th className="py-2.5 pr-3 font-medium">Rol</th>
              <th className="py-2.5 pr-3 font-medium">Empresa</th>
              <th className="py-2.5 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.usuario} className="hover:bg-surface-2">
                <td className="py-2.5 pr-3 text-text">{u.nombre}</td>
                <td className="py-2.5 pr-3 font-mono text-xs text-muted">{u.usuario}</td>
                <td className="py-2.5 pr-3"><StatusBadge tone={u.tone}>{u.rol}</StatusBadge></td>
                <td className="py-2.5 pr-3 text-muted">{u.empresa}</td>
                <td className="py-2.5">
                  <ConfirmDialog
                    title="Resetear contraseña"
                    message={`Se generará una contraseña temporal para ${u.nombre}. La acción quedará registrada en auditoría.`}
                    confirmLabel="Resetear"
                    trigger={(open) => (
                      <button
                        type="button"
                        onClick={open}
                        className="text-sm font-medium text-brand hover:underline"
                      >
                        Resetear clave
                      </button>
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
    </>
  );
}
