const priorities = [
  "Dashboard y KPI administrativos",
  "Productos, categorias e inventario por almacen",
  "Cilindros, recargas y trazabilidad",
  "Cotizaciones, notas de entrega y POS interno",
  "Caja, cuentas por cobrar/pagar y compras",
  "ROI, reportes e importaciones desde Excel, Valery y Profit",
];

const stack = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS 4",
  "Prisma",
  "PostgreSQL / Supabase",
  "Supabase Storage",
];

const milestones = [
  "Planning inicial ya cargado en el repo.",
  "Rama dev creada para arrancar la implementacion.",
  "Base App Router lista para montar auth, dashboard y modulos.",
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(253,186,116,0.16),rgba(15,23,42,0.96)_58%)] p-8 shadow-2xl shadow-black/20 sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.24em] text-amber-200/80">
            <span className="rounded-full border border-amber-300/30 bg-amber-200/10 px-3 py-1">
              Sumigases Oriente
            </span>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-200/10 px-3 py-1">
              Sudematin
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-100/70">
                SumiControl
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Plataforma operativa interna para ventas, inventario,
                  cilindros y control administrativo.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-200/80 sm:text-lg">
                  Esta base arranca desde el planning funcional del proyecto y
                  queda lista para crecer sobre App Router, roles propios,
                  modulos administrativos y conectores de importacion.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                  Demo objetivo: viernes 19
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90">
                  Flujo: feature/* -&gt; dev -&gt; main
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-100/70">
                Estado actual
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-100/85">
                {milestones.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-7 shadow-xl shadow-slate-950/20">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-amber-200/70">
              Prioridades de la demo
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-200/85 sm:text-base">
              {priorities.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-xs font-semibold text-amber-200">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[1.75rem] border border-slate-800 bg-[#101826] p-7 shadow-xl shadow-black/20">
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-cyan-100/70">
              Stack confirmado
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {stack.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-cyan-200/10 bg-cyan-100/5 px-4 py-4 text-sm text-slate-100/85"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-amber-300/15 bg-amber-200/8 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-100/75">
                Punto de apoyo
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200/80">
                El planning maestro vive en <code>PLANNING.md</code> y el
                detalle funcional en <code>docs/planning</code>. Desde aqui ya
                podemos pasar a auth, layout administrativo y modelado Prisma.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
