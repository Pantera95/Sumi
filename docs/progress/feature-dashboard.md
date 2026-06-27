# Progreso - feature/dashboard

## Estado

UI demo integrada en `main`.

## Que se hizo

- Se mantiene `/admin` como dashboard operativo inicial.
- Se agrego `/admin/dashboard` como alias funcional para redirects post-login.
- Se dejaron KPIs demo, bloque de ventas/utilidad, cola operativa y seccion de reportes.
- Se mejoro el shell para marcar `/admin/dashboard` como dashboard activo.
- Se crearon `components/charts/bar-comparison-chart.tsx` y `components/dashboard/operations-list.tsx` para sacar piezas reutilizables del dashboard.
- Se centralizo data demo de operaciones, chart y fundamentos UI en `lib/demo-data/admin.ts`.
- Se agrego `DashboardWorkspace` con filtros funcionales por empresa/periodo, KPIs dinamicos y alertas ejecutivas.

## Archivos tocados

- `app/admin/page.tsx`
- `app/admin/dashboard/page.tsx`
- `components/charts/bar-comparison-chart.tsx`
- `components/dashboard/dashboard-workspace.tsx`
- `components/dashboard/operations-list.tsx`
- `components/layout/admin-shell.tsx`
- `lib/demo-data/admin.ts`
- `docs/progress/feature-dashboard.md`

## Que falta

- Conectar KPIs a data real o contrato mock compartido.
- Sustituir barras CSS por graficos reales cuando se confirme libreria final.
- Agregar filtros persistentes por empresa, fecha y rol.

## Dependencias

- Auth/roles y company selector reales.
- Data 2024/importaciones para KPIs y comparativos.

## Errores conocidos

- El dashboard usa data demo.

## Siguiente paso

- Consolidar el contrato de datos del dashboard y conectar con auth/company selector cuando Greeg lo entregue.
