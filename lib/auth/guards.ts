import type { PermissionKey } from "@/lib/permissions/matrix";
import {
  permissionLabels,
  rolePermissionMatrix,
} from "@/lib/permissions/matrix";
import type { RoleKey } from "@/lib/auth/roles";

export function getPermissionsForRole(role: string) {
  const normalizedRole = role as RoleKey;
  return rolePermissionMatrix[normalizedRole] ?? [];
}

export function hasPermission(role: string, permission: PermissionKey) {
  return getPermissionsForRole(role).includes(permission);
}

export function canViewPasswords(role: string) {
  return hasPermission(role, "PASSWORDS_READ");
}

export function getPermissionLabels(role: string) {
  return getPermissionsForRole(role).map((permissionKey) => ({
    key: permissionKey,
    label: permissionLabels[permissionKey],
  }));
}
