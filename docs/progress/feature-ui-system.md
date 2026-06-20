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
- Se agrego navegacion mobile/tablet con panel lateral controlado desde el header.
- Se crearon componentes reutilizables para tablas y filtros: `DataTable`, `FilterBar` y `FilterField`.
- Se agrego `/admin/reports` como pantalla base de reportes operativos.
- Se iniciaron las carpetas de ownership de Salem `components/dashboard/` y `components/charts/`.
- Se inicio `components/reports/` con workspace interactivo de reportes.
- Se agrego `ModulePlaceholder` y pantallas base para las rutas del sidebar administrativo, evitando 404 durante la demo.
- Se agregaron controles reutilizables de formulario: `FieldShell`, `TextField`, `SelectField` y `TextareaField`.

## Archivos tocados

- `app/admin/accounts/page.tsx`
- `app/admin/cash/page.tsx`
- `app/admin/cylinders/page.tsx`
- `app/admin/delivery-notes/page.tsx`
- `app/admin/imports/page.tsx`
- `app/admin/inventory/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/dashboard/page.tsx`
- `app/admin/pos/page.tsx`
- `app/admin/products/page.tsx`
- `app/admin/quotes/page.tsx`
- `app/admin/sales/page.tsx`
- `app/admin/settings/page.tsx`
- `app/globals.css`
- `components/charts/bar-comparison-chart.tsx`
- `components/dashboard/operations-list.tsx`
- `components/layout/CompanySelector.tsx`
- `components/layout/module-placeholder.tsx`
- `components/reports/reports-workspace.tsx`
- `components/layout/admin-shell.tsx`
- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/data-table.tsx`
- `components/ui/filter-bar.tsx`
- `components/ui/form-field.tsx`
- `components/ui/metric-card.tsx`
- `components/ui/section-heading.tsx`
- `app/admin/reports/page.tsx`
- `lib/utils.ts`
- `lib/demo-data/admin.ts`
- `package.json`
- `package-lock.json`

## Que falta

- Crear variantes de formularios reutilizables.
- Integrar graficos reales en `feature/dashboard`.
- Reemplazar datos demo del selector por `companies`, `activeCompanyId` y `onChange` desde auth/company-selector cuando Greeg exponga el server contract.

## Dependencias

- Espera sesion real de `feature/auth-roles` con `companies[]` y `activeCompanyId`.
- Espera endpoint/server action de `feature/company-selector` para persistir el cambio de empresa.

## Errores conocidos

- `npm install` reporto 2 vulnerabilidades moderadas de dependencias transitivas. No se aplico `npm audit fix --force` para evitar cambios mayores no solicitados.

## Siguiente paso

- Avanzar con formularios reutilizables o conectar dashboard/reportes a contratos de datos cuando esta base se integre en `dev`.
