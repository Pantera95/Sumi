import type { ReactNode } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { getCurrentSessionUser } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSessionUser();

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
