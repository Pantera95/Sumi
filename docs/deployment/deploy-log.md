# Registro de despliegues — patch/greeg-ux-ui

## Proyecto Vercel

- Scope: `pantera95s-projects` · Proyecto: `sumicontrol`
- Build command (vercel.json en esta rama): `next build` (sin Prisma).
- Deployment Protection: **desactivada** (previews y producción públicas).

## 2026-06-16 — patch UX/UI en producción

- **Producción:** https://sumicontrol.vercel.app  → `/admin/dashboard`
- **Preview de la rama:** https://sumicontrol-esokj7aj4-pantera95s-projects.vercel.app
- Estado: READY · HTTP 200 público.
- Contenido: capa UX/UI (layout admin, dashboard ejecutivo, ROI, matrices, inventario) con data
  demo basada en cifras reales 2024.
- Reemplazó el deploy previo (flujo de auth demo de feature/auth-roles); ese código sigue en su rama.

## Pendientes

- Abrir PR a `dev`: https://github.com/Pantera95/Sumi/pull/new/patch/greeg-ux-ui (gh no instalado).
- Reconciliar merge con `feature/ui-system` (Salem).
- Reactivar Deployment Protection cuando haya datos/login reales.
