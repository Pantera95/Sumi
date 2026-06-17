# Progreso - feature/ui-system

## Estado

En progreso.

## Que se hizo

- Se creo la base visual del admin en `/admin`.
- Se agrego `AdminShell` con sidebar, header, selector visual de empresa, busqueda y acciones.
- Se agregaron componentes reutilizables: `Button`, `Badge`, `Card`, `MetricCard` y `SectionHeading`.
- Se definieron tokens CSS para claro/oscuro con branding Sumigases: azul marino, naranja, blanco y acento amarillo.
- Se agregaron dependencias base de UI: `lucide-react`, `clsx` y `tailwind-merge`.
- La experiencia administrativa vive en `/admin` y se mantuvo la landing en `/` para no chocar con auth y con el planning base mientras esta rama no entre a `dev`.
- Se leyo el contrato remoto de `docs/contracts/company-selector-component.md` en `origin/feature/auth-roles`.
- Se implemento `CompanySelector` presentacional/controlado en `components/layout/CompanySelector.tsx`.
- Se integro el selector en el header del `AdminShell` con empresas demo y soporte de vista consolidada.
- Se agrego `/admin/dashboard` como alias temporal de `/admin` para evitar 404 en redirects post-login mientras llega `feature/dashboard`.

## Archivos tocados

- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/dashboard/page.tsx`
- `app/globals.css`
- `components/layout/CompanySelector.tsx`
- `components/layout/admin-shell.tsx`
- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/metric-card.tsx`
- `components/ui/section-heading.tsx`
- `lib/utils.ts`
- `package.json`
- `package-lock.json`

## Que falta

- Crear variantes de tabla, formularios y filtros reutilizables.
- Integrar graficos reales en `feature/dashboard`.
- Agregar estados mobile interactivos del sidebar cuando se conecte comportamiento de menu.
- Reemplazar datos demo del selector por `companies`, `activeCompanyId` y `onChange` desde auth/company-selector cuando Greeg exponga el server contract.

## Dependencias

- Espera sesion real de `feature/auth-roles` con `companies[]` y `activeCompanyId`.
- Espera endpoint/server action de `feature/company-selector` para persistir el cambio de empresa.

## Errores conocidos

- `npm install` reporto 2 vulnerabilidades moderadas de dependencias transitivas. No se aplico `npm audit fix --force` para evitar cambios mayores no solicitados.

## Siguiente paso

- Avanzar con tabla/filtros reutilizables dentro de `feature/ui-system` o pasar a `feature/dashboard` cuando esta base se integre en `dev`, manteniendo `/` como landing hasta la integracion con auth.
