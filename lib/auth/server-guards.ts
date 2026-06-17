import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/auth/guards";
import { getCurrentSessionUser } from "@/lib/auth/session";
import type { PermissionKey } from "@/lib/permissions/matrix";

export async function requireAuthenticatedSession() {
  const session = await getCurrentSessionUser();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

export async function requirePermission(permission: PermissionKey) {
  const session = await requireAuthenticatedSession();

  if (!hasPermission(session.role, permission)) {
    redirect("/auth/forbidden");
  }

  return session;
}
