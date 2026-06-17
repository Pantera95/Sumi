# Progreso — feature/auth-roles

## Estado

En progreso.

## Qué se hizo

- Se creo la rama `feature/auth-roles`.
- Se agregaron dependencias base para Prisma, cliente Prisma, Zod y seed runner.
- Se definio un schema inicial con `Company`, `Role`, `Permission`, `User`, `UserCompany`, `Session` y `AuditLog`.
- Se agrego `prisma/seed.ts` con empresas, permisos, roles y usuarios demo iniciales.
- Se creo la base de `lib/auth`, `lib/permissions` y `lib/audit` para esta feature.
- Se implemento `/auth/login` con validacion server action sobre credenciales demo.
- Se agrego cliente compartido de Prisma con deteccion de `DATABASE_URL`.
- Se agrego manejo de sesion por cookie con soporte para sesion real en DB y fallback demo.
- Se conecto el login a una estrategia hibrida: Prisma si hay DB disponible, demo si aun no existe conexion.
- Se agregaron guards de permisos por rol y un logout basico para limpiar la sesion actual.
- Se agregaron guards server-side reutilizables y pantalla `forbidden` para futuras rutas privadas.

## Archivos tocados

- `package.json`
- `.env.example`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `lib/auth/roles.ts`
- `lib/auth/demo-users.ts`
- `lib/auth/login-schema.ts`
- `lib/auth/authenticate.ts`
- `lib/auth/guards.ts`
- `lib/auth/session.ts`
- `lib/auth/server-guards.ts`
- `lib/permissions/matrix.ts`
- `lib/audit/events.ts`
- `lib/db/prisma.ts`
- `app/auth/login/actions.ts`
- `app/auth/login/login-form.tsx`
- `app/auth/login/logout-form.tsx`
- `app/auth/login/page.tsx`
- `app/auth/forbidden/page.tsx`
- `app/auth/logout/actions.ts`

## Qué falta

- Definir guardas por rol y permisos sobre rutas internas.
- Integrar selector de empresa al flujo posterior al login.
- Conectar formulario a redirect o area privada cuando exista el layout administrativo.
- Aplicar `requireAuthenticatedSession` y `requirePermission` en rutas reales cuando existan.

## Dependencias

- Base de datos PostgreSQL / Supabase disponible via `DATABASE_URL`.
- Coordinacion con `feature/company-selector` para persistencia de empresa activa.
- Coordinacion posterior con UI para layout privado y navegacion.

## Errores conocidos

- El seed existe, pero requiere base de datos configurada para ejecutarse.
- Sin `DATABASE_URL`, el flujo cae a modo demo con cookie local y no a sesion persistida en DB.
- Aun no existen rutas privadas reales del admin donde aplicar los guards server-side.

## Siguiente paso

- Preparar el handoff hacia company selector y, cuando exista area privada, aplicar guards a rutas reales.
