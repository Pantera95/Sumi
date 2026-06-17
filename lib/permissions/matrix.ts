import type { RoleKey } from "@/lib/auth/roles";

export const permissionLabels = {
  DASHBOARD_READ: "Ver dashboard",
  USERS_READ: "Ver usuarios",
  USERS_WRITE: "Gestionar usuarios",
  PASSWORDS_READ: "Ver contrasenas",
  COMPANIES_SWITCH: "Cambiar empresa",
  SETTINGS_READ: "Ver configuracion",
  SETTINGS_WRITE: "Editar configuracion",
  AUDIT_READ: "Ver auditoria",
} as const;

export type PermissionKey = keyof typeof permissionLabels;

export const rolePermissionMatrix: Record<RoleKey, PermissionKey[]> = {
  OWNER: [
    "DASHBOARD_READ",
    "USERS_READ",
    "USERS_WRITE",
    "PASSWORDS_READ",
    "COMPANIES_SWITCH",
    "SETTINGS_READ",
    "SETTINGS_WRITE",
    "AUDIT_READ",
  ],
  ADMIN: [
    "DASHBOARD_READ",
    "USERS_READ",
    "USERS_WRITE",
    "PASSWORDS_READ",
    "COMPANIES_SWITCH",
    "SETTINGS_READ",
    "SETTINGS_WRITE",
    "AUDIT_READ",
  ],
  AUDITOR: ["DASHBOARD_READ", "USERS_READ", "AUDIT_READ"],
  CAJERO: ["DASHBOARD_READ"],
  VENDEDOR: ["DASHBOARD_READ"],
  ALMACEN: ["DASHBOARD_READ"],
  COMPRAS: ["DASHBOARD_READ"],
  TECNICO_RECARGA: ["DASHBOARD_READ"],
  DISTRIBUIDOR: ["DASHBOARD_READ"],
};
