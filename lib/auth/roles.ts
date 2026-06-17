export const roleLabels = {
  OWNER: "Owner",
  ADMIN: "Administrador",
  AUDITOR: "Auditor",
  CAJERO: "Cajero",
  VENDEDOR: "Vendedor",
  ALMACEN: "Almacen",
  COMPRAS: "Compras",
  TECNICO_RECARGA: "Tecnico Recarga",
  DISTRIBUIDOR: "Distribuidor",
} as const;

export type RoleKey = keyof typeof roleLabels;

export const roleKeys = Object.keys(roleLabels) as RoleKey[];
