import type { ReactNode } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAuthenticatedSession } from "@/lib/auth/server-guards";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAuthenticatedSession();

  return (
    <AdminShell
      activeCompanyId={session?.activeCompanyId ?? null}
      canSeeConsolidated={session?.role === "OWNER" || session?.role === "ADMIN"}
      companies={session?.companies ?? []}
      user={
        session
          ? {
              fullName: session.fullName,
              role: session.role,
            }
          : null
      }
    >
      {children}
    </AdminShell>
  );
}
