# Progreso - feature/auth-roles

## Estado

Integracion en progreso sobre `feature/integrate-auth-core`.

## Que se hizo

- Se trajo el core de auth desde `origin/feature/auth-roles` sobre el `main` actual, sin reemplazar la UI admin integrada.
- Se agrego Prisma schema inicial con empresas, roles, permisos, usuarios, sesiones y auditoria.
- Se agrego seed demo para empresas, roles, permisos y usuarios.
- Se agrego login propio en `/auth/login` con fallback demo si no existe `DATABASE_URL`.
- Se agregaron helpers de auth, permisos, auditoria y cliente Prisma.
- Se corrigio el riesgo alto de sesion demo falsificable firmando el payload con HMAC (`AUTH_SECRET`).
- Se extendio el snapshot de sesion para exponer `companies[]`, `activeCompanyId` y `defaultCompany`.
- Se conecto el `AdminShell` a la sesion cuando existe, manteniendo fallback demo visual.
- El login exitoso redirige a `/admin/dashboard`.
- Se agrego resolver `getPostLoginRoute` por rol.
- Se protegieron las rutas `/admin/*` con `requireAuthenticatedSession`.

## Archivos tocados

- `.env.example`
- `package.json`
- `package-lock.json`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/auth/*`
- `lib/permissions/matrix.ts`
- `lib/audit/events.ts`
- `lib/db/prisma.ts`
- `app/auth/*`
- `app/admin/layout.tsx`
- `components/layout/admin-shell.tsx`
- `docs/progress/feature-auth-roles.md`

## Que falta

- Definir y aplicar guards reales por ruta admin.
- Persistir cambio de empresa activa desde el selector.
- Refinar resolver post-login con deep-links `returnTo` y persistencia de ultima empresa.
- Unificar matriz de permisos entre seed y runtime para evitar drift.
- Expandir permisos para aprobaciones de negocio: venta sin stock, descuentos, pagos, anulaciones y tasa especial.
- Evaluar cifrado reversible para contrasenas visibles en vez de texto plano.

## Dependencias

- `DATABASE_URL` para activar sesiones reales en PostgreSQL/Supabase.
- `AUTH_SECRET` obligatorio en produccion para firmar sesiones demo/fallback.
- Coordinacion con company-selector para persistencia de empresa activa.
- Coordinacion con UI/admin para aplicar permisos por ruta y accion.

## Errores conocidos

- Sin `DATABASE_URL`, el login usa fallback demo firmado, no sesion persistida.
- El selector de empresa aun cambia solo estado visual en cliente.
- Las rutas admin ya requieren sesion, pero aun no filtran permisos modulo por modulo.

## Siguiente paso

- Agregar permisos por ruta admin y conectar persistencia de empresa activa.
