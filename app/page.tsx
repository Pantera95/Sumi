import Link from "next/link";
import { Button } from "@/components/ui/Button";

const highlights = [
  "Dashboard ejecutivo con KPIs e indicadores de ROI",
  "Inventario, cilindros, cotizaciones y notas de entrega",
  "Caja, cuentas por cobrar/pagar, compras y reportes",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
        Sumigases Oriente · Sudematin
      </span>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-text sm:text-5xl">
        SumiControl
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Plataforma interna para ventas, inventario, cilindros y control administrativo. Esta es la
        capa visual de la demo: layout ejecutivo, navegación clara y experiencia responsive.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/admin/dashboard">
          <Button icon="dashboard">Entrar al panel</Button>
        </Link>
      </div>

      <ul className="mt-12 grid w-full gap-3 text-left sm:grid-cols-3">
        {highlights.map((h) => (
          <li key={h} className="rounded-2xl border border-border bg-surface p-4 text-sm text-text shadow-sm">
            {h}
          </li>
        ))}
      </ul>
    </main>
  );
}
