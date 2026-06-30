import { logoutUser } from "@/app/auth/logout/actions";

export function LogoutForm() {
  return (
    <form action={logoutUser} className="mt-4">
      <button
        type="submit"
        className="rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-200 transition hover:border-amber-300/30 hover:text-white"
      >
        Cerrar sesion
      </button>
    </form>
  );
}
