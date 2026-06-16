# Decisión técnica — Scope de empresa activa (multiempresa)

> Estado: **PROPUESTA** — requiere visto bueno de Greeg antes de que Codex-Greeg codifique.
> Bloquea: `feature/company-selector`, y de forma transversal a todos los módulos que filtran por empresa.

## Problema

SumiControl maneja dos empresas (`Sumigases`, `Sudematin`). OWNER/ADMIN ven ambas y pueden
cambiar; los demás roles quedan acotados a su(s) empresa(s) asignada(s). Falta definir **cómo
viaja la "empresa activa"** en cada request para que todas las queries queden filtradas sin
fugas entre empresas.

## Opciones

### Opción A — Empresa activa en sesión/cookie (server-side)  ✅ recomendada
La empresa activa se guarda en la sesión del login propio (cookie httpOnly o registro de sesión).
Un helper `getActiveCompany()` la lee en el server y todo query se filtra por ahí.

- Pros: una sola fuente de verdad; el filtro vive en el server (no se puede saltar desde el cliente);
  URLs limpias (`/admin/dashboard`); cambia con un solo POST al selector.
- Contras: el estado no es visible en la URL (no se puede compartir un link "a Sudematin");
  requiere invalidar/refrescar datos al cambiar de empresa.

### Opción B — Segmento de empresa en la URL (`/admin/[company]/...`)
La empresa va en la ruta y se valida en cada layout/segmento.

- Pros: links compartibles y bookmarkeables; estado explícito; fácil de cachear por empresa.
- Contras: reescribe toda la estructura de rutas de §7; más superficie de validación (cada ruta
  debe checar acceso); fricción con el resto del equipo que ya asume `/admin/...` plano.

### Opción C — Solo contexto de cliente (React Context)
- Pros: trivial de montar.
- Contras: **inseguro** — el filtro depende del cliente; un request directo a una API ignora el
  contexto. Descartada para datos sensibles.

## Recomendación

**Opción A.** Es la que menos reescribe (respeta las rutas planas de §7), centraliza el filtro en
el server y cierra la fuga entre empresas. La URL compartible (B) puede evaluarse en fase 2.

## Implicaciones si se aprueba A

1. `auth-roles` debe exponer en la sesión: `userId`, `role`, `companies[]` (acceso) y
   `activeCompanyId`.
2. Debe existir un helper server-side único: `getActiveCompany()` / `assertCompanyAccess(companyId)`.
3. Toda query de módulo recibe `companyId` desde ese helper, nunca desde el body del cliente.
4. El endpoint del selector valida que `activeCompanyId ∈ companies[]` del usuario antes de fijarla.
5. Vista consolidada (OWNER/ADMIN) = `activeCompanyId = null` ⇒ filtro especial "todas". Vista
   inicial siempre una empresa concreta, nunca consolidada (§10.7).

## Decisiones derivadas que faltan (marcar antes de codificar)

- [ ] ¿La vista consolidada entra en el MVP del viernes o se posterga? (propongo: **mostrar el
      toggle pero permitir solo a OWNER/ADMIN; si no da tiempo, deshabilitado con tooltip**).
- [ ] ¿Empresa por defecto al primer login? (propongo: **primera empresa de `companies[]` ordenada
      por nombre**).
- [ ] ¿Persistir la última empresa elegida entre sesiones? (propongo: **sí, en el registro de
      usuario**; barato y mejora la demo).
