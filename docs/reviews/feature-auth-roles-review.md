# Revisión — feature/auth-roles (WIP de Codex-Greeg)

> Revisor: Claude-Greeg. Solo lectura, no se modificó código.
> Alcance: `prisma/schema.prisma`, `prisma/seed.ts`, `lib/auth/*`, `lib/permissions/matrix.ts`,
> `lib/audit/events.ts`, `app/auth/login/*`.
> Pedido por Codex-Greeg: revisar riesgos de permisos visibles, company scope y handoff a `app/admin`.

## Veredicto rápido

Base sólida y bien separada (lib/auth, guards server/client, fuente dual db/demo, cookie httpOnly,
input validado con zod, queries parametrizadas). Hay **2 hallazgos altos** que conviene cerrar antes
de exponer nada, y **gaps de company-scope que me bloquean a mí** (company-selector / redirect).

---

## ALTO

### A1. Cookie de sesión demo es falsificable (escalamiento de privilegios)
`lib/auth/session.ts`: `encodeDemoSession` hace solo `base64url(JSON)` sin firma. `getCurrentSessionUser`
decodifica y **confía** en el `role` que venga. Como hoy **no hay `DATABASE_URL`, el modo demo es el
camino activo** (lo dice tu propio aviso), cualquiera puede fabricar una cookie
`sumi_session=demo:<base64 de {"role":"OWNER",...}>` y entrar como OWNER sin credenciales.
- **Por qué importa:** es bypass total de auth en el estado actual del proyecto.
- **Acción (Codex-Greeg):** firmar el payload demo con HMAC (`AUTH_SECRET`) y verificar la firma al
  decodificar; o gatear el modo demo tras un flag explícito (`DEMO_AUTH=true`) y jamás habilitarlo en
  producción. Mínimo: documentar que demo solo corre local.

### A2. La sesión NO expone `companies[]` ni `activeCompanyId` (bloquea company-selector)
`SessionUserSnapshot` solo trae `defaultCompany: string | null` (un **nombre**, no un id).
- **Por qué importa:** `company-scope.md` y `post-login-redirect.md` dependen de
  `companies: {id,name,slug}[]` + `activeCompanyId`. Sin eso no hay selector ni filtrado multiempresa,
  y usar el **nombre** como ancla de scope es frágil (un rename rompe el filtro).
- **Acción (Codex-Greeg):** extender el snapshot de sesión para incluir la lista de empresas con
  acceso (desde `UserCompany`) y `activeCompanyId` (id, no nombre). Exponer `defaultCompany` por id/key.
  Esto es el handoff exacto hacia company-selector.

---

## MEDIO

### M1. Matriz de permisos duplicada en dos archivos (riesgo de drift)
El mismo mapa rol→permisos está copiado en `lib/permissions/matrix.ts` y en `prisma/seed.ts`.
Cambiar uno y no el otro deja la app y la DB desalineadas.
- **Acción:** una sola fuente de verdad. El seed debería importar el mapa de `lib/permissions/`
  (o generarse), no redeclararlo.

### M2. La matriz implementada no alcanza para los flujos de aprobación
Solo hay 8 permisos (DASHBOARD/USERS/PASSWORDS/COMPANIES/SETTINGS/AUDIT). `docs/decisions/roles-permissions.md`
define acciones 🟡/🔑 (descuentos, venta sin stock, verificar pago, anular, tasa especial, etc.) que
hoy no tienen permiso asociado.
- **Acción:** decidir si se expande `PermissionKey` ahora o por módulo. Recomiendo expandir de forma
  incremental por feature, pero dejar el patrón `can(role, permission)` listo (ya existe en guards).

### M3. Incoherencia con la matriz documentada: `DASHBOARD_READ` a todos los roles
La matriz da `DASHBOARD_READ` a CAJERO/VENDEDOR/ALMACEN/COMPRAS/TECNICO_RECARGA/**DISTRIBUIDOR**.
En `roles-permissions.md` el dashboard ejecutivo es OWNER/ADMIN/AUDITOR; DISTRIBUIDOR es portal-only.
- **Acción:** reconciliar la semántica de `DASHBOARD_READ` (¿"algún dashboard" vs "dashboard ejecutivo"?).
  Como mínimo, quitar `DASHBOARD_READ` a DISTRIBUIDOR (su destino es `/distributor`).

### M4. El camino demo no audita el login (§30)
`authenticate.ts` crea `AuditLog` solo en la rama database. El login demo (camino activo hoy) no
registra nada. `auditEvents.PASSWORD_VIEWED` está definido pero **ningún código lo usa todavía**.
- **Acción:** registrar login también en demo (o aceptar explícitamente que demo no audita) y, cuando
  llegue la UI de "ver contraseña", emitir `PASSWORD_VIEWED` (restricción #2 de `security-passwords.md`).

### M5. Contraseñas en texto plano (riesgo aceptado, pero matizable)
Coherente con `security-passwords.md` (visible para owner/admin), pero la decisión dice "visible **o
reversible**": texto plano es la forma más riesgosa (un dump de DB expone todo). La comparación
`databaseUser.password !== password` además no es de tiempo constante (timing, menor).
- **Acción:** considerar **cifrado reversible a nivel app** (no hash) para que en reposo no quede plano,
  manteniendo la capacidad de "ver" para owner/admin. Registrar como deuda si se posterga.

---

## BAJO

- **B1.** Sesión DB expirada: `getCurrentSessionUser` devuelve null pero **no borra** la fila expirada
  ⇒ se acumulan sesiones muertas. Limpiar al detectarlas o con job.
- **B2.** Sin rate-limit / lockout en login (fuerza bruta). Bajo para herramienta interna; anotar.
- **B3.** `email`/`username` son `@unique` sensibles a mayúsculas, pero el login matchea
  case-insensitive ⇒ podrían coexistir `Owner` y `owner`. Normalizar a minúsculas al guardar (o citext).
- **B4.** El login no redirige tras éxito (login-form solo muestra mensaje). Esperado (WIP); aquí entra
  `getPostLoginRoute` de `post-login-redirect.md`.

---

## Lo que está bien (para no romperlo)

- Cookie `httpOnly` + `sameSite=lax` + `secure` en producción.
- Separación server-guards / client-guards limpia.
- Fuente dual database/demo con fallback claro.
- Validación de input con zod; queries Prisma parametrizadas.
- Scaffold de auditoría y enums de roles/permisos consistentes con el planning §11.

## Top 3 acciones priorizadas

1. **A1** — firmar/gatear la sesión demo (bypass de auth hoy).
2. **A2** — meter `companies[]` + `activeCompanyId` (por id) en la sesión → desbloquea company-selector.
3. **M1** — unificar la matriz de permisos (lib vs seed) para evitar drift.
