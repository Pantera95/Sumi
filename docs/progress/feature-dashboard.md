# Progreso - feature/dashboard

## Estado

En progreso.

## Que se hizo

- Se mantiene `/admin` como dashboard operativo inicial.
- Se agrego `/admin/dashboard` como alias funcional para redirects post-login.
- Se dejaron KPIs demo, bloque de ventas/utilidad, cola operativa y seccion de reportes.
- Se mejoro el shell para marcar `/admin/dashboard` como dashboard activo.

## Archivos tocados

- `app/admin/page.tsx`
- `app/admin/dashboard/page.tsx`
- `components/layout/admin-shell.tsx`
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

- Consolidar el contrato de datos del dashboard o conectar la rama con `feature/auth-roles` cuando entre a `dev`.
