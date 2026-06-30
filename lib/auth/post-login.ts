import type { SessionUserSnapshot } from "@/lib/auth/session";

const roleLandingRoutes: Record<string, string> = {
  OWNER: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  AUDITOR: "/admin/dashboard",
  CAJERO: "/admin/pos",
  VENDEDOR: "/admin/pos",
  ALMACEN: "/admin/inventory",
  COMPRAS: "/admin/dashboard",
  TECNICO_RECARGA: "/admin/cylinders",
  DISTRIBUIDOR: "/auth/forbidden",
};

export function getPostLoginRoute(session: SessionUserSnapshot | null) {
  if (!session) {
    return "/auth/login";
  }

  if (session.companies.length === 0) {
    return "/auth/forbidden";
  }

  return roleLandingRoutes[session.role] ?? "/auth/forbidden";
}
