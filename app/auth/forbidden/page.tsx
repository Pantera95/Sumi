export default function ForbiddenPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-rose-300/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,15,27,0.94))] p-8 shadow-2xl shadow-black/20">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-200/70">
          Acceso denegado
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          No tienes permisos para entrar en esta seccion
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/80 sm:text-base">
          La base de `feature/auth-roles` ya puede validar una sesion y
          decidir si un rol puede entrar o no. Esta pantalla queda lista para
          ser usada cuando empiecen a protegerse rutas internas del sistema.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-200/70">
            Siguiente uso previsto
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300/80">
            <li>Proteccion de `admin` por sesion activa.</li>
            <li>Proteccion de modulos por permiso.</li>
            <li>Validacion por empresa seleccionada.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
