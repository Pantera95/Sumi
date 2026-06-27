# Progreso - feature/reports

## Estado

UI demo integrada en `main`.

## Que se hizo

- Se creo `/admin/reports` con metricas demo, filtros y biblioteca de reportes.
- Se agrego una matriz visual de ROI para productos, compras, clientes y cilindros.
- Se crearon componentes reutilizables `DataTable`, `FilterBar` y `FilterField`.
- Se agrego `ReportsWorkspace` como componente cliente con busqueda, filtros funcionales y exportacion CSV demo.
- Se centralizo la data demo de reportes y ROI en `lib/demo-data/admin.ts`.

## Archivos tocados

- `app/admin/reports/page.tsx`
- `components/reports/reports-workspace.tsx`
- `components/ui/data-table.tsx`
- `components/ui/filter-bar.tsx`
- `lib/demo-data/admin.ts`
- `docs/progress/feature-reports.md`

## Que falta

- Conectar reportes a datos reales/importados.
- Agregar descarga XLSX cuando se confirme libreria/importador.
- Definir permisos por rol para cada reporte.

## Dependencias

- Importador Excel/Valery/Profit.
- Modelos de ventas, inventario, caja, compras y ROI.
- Auth/roles para permisos.

## Errores conocidos

- Filtros y exportar son visuales por ahora.

## Siguiente paso

- Crear contrato de datos para reportes y conectar con importaciones cuando exista la rama correspondiente.
