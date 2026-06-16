# Registro de despliegues — SumiControl

> Complementa `docs/deployment/vercel-workflow.md`. Lo mantiene quien ejecuta el deploy.

## Proyecto Vercel

- Scope/panel: `pantera95s-projects`
- Proyecto: **`sumicontrol`**
- Repo conectado: `https://github.com/Pantera95/Sumi`
- Build command (vía `vercel.json`): `prisma generate && next build`

## Historial

### 2026-06-16 — primer deploy (Claude-Greeg, autorizado por Greeg)

- **URL producción:** https://sumicontrol.vercel.app
- **URL única:** https://sumicontrol-4rmeotvwu-pantera95s-projects.vercel.app
- **Estado:** READY · HTTP 200 en `/` y `/auth/login`.
- **Rama/estado desplegado:** working tree de `feature/auth-roles` (incluye el WIP local de auth de
  Codex-Greeg: login/session/guards/schema, aún sin commitear en git).
- **Modo:** DEMO — **sin `DATABASE_URL`**, así que el login corre contra usuarios demo
  (`owner/owner123`, `admin/admin123`, `auditor/audit123`). Prisma queda en `null`.
- **Env vars tocadas:** ninguna (no se configuró nada sensible en Vercel).
- **Nota:** al ser el primer deploy del proyecto, Vercel lo promovió a producción automáticamente.

#### Pendientes / riesgos del deploy
- Está público el modo demo, cuya sesión es **falsificable** (ver `docs/reviews/feature-auth-roles-review.md`, A1).
  Aceptable para una preview de progreso; **no** dejar así para uso real.
- Para datos reales: definir `DATABASE_URL` (Supabase) en Vercel y re-desplegar.
- El código de auth desplegado **no está commiteado en git**: si se quiere reproducible desde el
  repo, Codex-Greeg debe commitear y pushear su WIP.

## Comandos usados

```bash
vercel link --yes --project sumicontrol
vercel deploy --yes
```
