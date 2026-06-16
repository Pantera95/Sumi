# Contrato / Acceptance criteria — Redirect post-login por rol y empresa

> Preparado por Claude-Greeg a pedido de Codex-Greeg (`docs/communication/message-to-claude-greeg.txt`).
> Conecta `feature/auth-roles` (login/sesión, ya implementado) con `company-scope.md`,
> `roles-permissions.md` y el handoff hacia `app/admin` (aún no existe).

## Objetivo

Tras un login exitoso, llevar a cada usuario al destino correcto según **su rol** y **su contexto
de empresa**, sin caer en rutas inexistentes ni en estados ambiguos (consolidado, sin empresa, etc.).

## Dependencias / supuestos

- La sesión ya expone (auth-roles): `userId`, `role`, `companies[]`, `activeCompanyId`,
  `permissions`/guards. (Confirmado en el aviso de Codex-Greeg.)
- `app/admin` **todavía no existe** ⇒ hay un handoff pendiente; ver "Riesgo de ruta inexistente".
- El portal `/distributor` es mayormente fase 2 (planning §35.1, `roles-permissions.md`).
- Regla de `company-scope.md`: la vista inicial **nunca** arranca en consolidado.

## Resolver único

Definir una función pura `getPostLoginRoute(session)` que centraliza la lógica (un solo lugar que
login y middleware consumen). Devuelve `{ route, activeCompanyId }`.

## Mapa de destino por rol (propuesta)

| Rol | Landing | Razón |
|---|---|---|
| OWNER | `/admin/dashboard` | vista ejecutiva |
| ADMIN | `/admin/dashboard` | vista ejecutiva |
| AUDITOR | `/admin/dashboard` | dashboard en **solo lectura** |
| CAJERO | `/admin/pos` | su tarea principal: vender/cobrar |
| VENDEDOR | `/admin/pos` | POS / cotizaciones |
| ALMACEN | `/admin/inventory` | inventario y despacho |
| COMPRAS | `/admin/purchases` | órdenes de compra |
| TECNICO_RECARGA | `/admin/cylinders` | cilindros y recargas |
| DISTRIBUIDOR | `/distributor` (o `/auth/forbidden` si el portal no está en MVP) | portal acotado, fase 2 |

> Las rutas deben coincidir con la estructura de planning §7. Si alguna no entra al MVP, el resolver
> debe degradar a `/admin/dashboard` (para roles admin) o `/auth/forbidden` con mensaje claro.

## Lógica de empresa en el redirect

Según `companies.length` del usuario:

1. **0 empresas** ⇒ NO redirigir a módulo. Mostrar pantalla "Sin empresa asignada" (o
   `/auth/forbidden` con mensaje). OWNER/ADMIN no deberían quedar así; si pasa, es dato corrupto.
2. **1 empresa** ⇒ fijar `activeCompanyId = esa empresa` y redirigir al landing del rol.
3. **N empresas** (típico OWNER/ADMIN) ⇒ fijar `activeCompanyId` por prioridad:
   `lastCompanyId` persistida (si válida y activa) → si no, **primera empresa por nombre**.
   **Nunca** consolidado como arranque. Redirigir a `/admin/dashboard`.

Validación cruzada: si `lastCompanyId` apunta a empresa `isActive=false` o fuera de `companies[]`,
ignorarla y usar la primera válida.

## Deep-link / returnTo

- Si el usuario fue rebotado a login desde una URL protegida, guardar `returnTo`.
- Tras login, **volver a `returnTo` solo si** el rol + la empresa activa tienen acceso a esa ruta
  (check de `roles-permissions.md` + `assertCompanyAccess`). Si no, ir al landing del rol.
- `returnTo` debe sanitizarse: solo rutas internas (mismo origen), nunca URLs externas (open-redirect).

## Acceptance criteria (testables)

1. OWNER con 2 empresas hace login ⇒ cae en `/admin/dashboard` con una empresa concreta activa (no consolidado).
2. OWNER que ya había elegido Sudematin antes ⇒ vuelve a entrar y `activeCompanyId = Sudematin` (si se persiste).
3. VENDEDOR de 1 sola empresa ⇒ cae en su landing (`/admin/pos`) con esa empresa fija y sin selector.
4. AUDITOR ⇒ cae en `/admin/dashboard` en modo lectura; no puede ejecutar acciones.
5. Usuario sin empresa asignada ⇒ ve pantalla "sin empresa", NO una ruta rota ni un dashboard vacío silencioso.
6. Usuario con `lastCompanyId` de una empresa desactivada ⇒ arranca en la primera empresa válida.
7. Login desde un deep-link permitido ⇒ regresa a esa URL; desde uno no permitido ⇒ va al landing del rol.
8. `returnTo` con URL externa ⇒ se ignora; redirige a landing interno (sin open-redirect).
9. DISTRIBUIDOR ⇒ va a `/distributor` si existe; si el portal no está en MVP, a `/auth/forbidden` con mensaje, no a `/admin`.
10. Mientras `app/admin` no exista, ningún login termina en un 404: el resolver degrada a un destino válido.
11. El destino post-login se decide en `getPostLoginRoute(session)`; no hay redirects ad-hoc dispersos.

## Casos borde

- Sesión válida pero rol desconocido/no mapeado ⇒ `/auth/forbidden`, no crash.
- Usuario con permisos pero cuyo landing por defecto está deshabilitado en MVP ⇒ degradar al siguiente módulo permitido o dashboard.
- Doble login / sesión ya activa al visitar `/auth/login` ⇒ redirigir directo al landing (no re-mostrar login).
- Cambio de rol mientras hay sesión viva ⇒ el siguiente request/redirect respeta el nuevo rol (no cachear el landing en cookie).
- Empresa activa válida al login pero el módulo landing aún no soporta esa empresa ⇒ caer a dashboard.

## Riesgos → acciones concretas

- **Riesgo: ruta inexistente.** `app/admin/*` aún no existe ⇒ logins admin caerían en 404.
  **Acción (Codex-Greeg + Salem):** acordar un landing temporal (`/admin` placeholder bajo el layout
  de Salem) o que el resolver degrade a una página existente hasta que `feature/dashboard` monte `/admin/dashboard`.
- **Riesgo: handoff de scope.** El redirect fija `activeCompanyId`; si el dashboard lo lee de otra fuente, habrá desincronía.
  **Acción:** el `activeCompanyId` que fija el login debe ser la **misma** fuente que lee `getActiveCompany()` (`company-scope.md`).
- **Riesgo: open-redirect** vía `returnTo`. **Acción:** whitelist de rutas internas + validación de origen.

## Decisiones por marcar (confirmar con Greeg/Codex-Greeg)
- [ ] Landing por rol: ¿se confirma el mapa de arriba? (en especial CAJERO=`/admin/pos`, VENDEDOR=`/admin/pos`).
- [ ] ¿DISTRIBUIDOR entra al MVP del viernes o se manda a `forbidden` con "portal en construcción"?
- [ ] ¿Se persiste `lastCompanyId` entre sesiones? (alineado con `company-scope.md`; propongo sí).
- [ ] Landing temporal mientras no exista `app/admin`: ¿placeholder `/admin` o quedarse en una page neutra?
