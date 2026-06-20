# Progreso - feature/reports

## Estado

En progreso.

## Que se hizo

- Se creo `/admin/reports` con metricas demo, filtros y biblioteca de reportes.
- Se agrego una matriz visual de ROI para productos, compras, clientes y cilindros.
- Se crearon componentes reutilizables `DataTable`, `FilterBar` y `FilterField`.

## Archivos tocados

- `app/admin/reports/page.tsx`
- `components/ui/data-table.tsx`
- `components/ui/filter-bar.tsx`
- `docs/progress/feature-reports.md`

## Que falta

- Conectar reportes a datos reales/importados.
- Agregar descarga real CSV/XLSX.
- Definir permisos por rol para cada reporte.

## Dependencias

- Importador Excel/Valery/Profit.
- Modelos de ventas, inventario, caja, compras y ROI.
- Auth/roles para permisos.

## Errores conocidos

- Filtros y exportar son visuales por ahora.

## Siguiente paso

- Crear contrato de datos para reportes o conectar con importaciones cuando exista la rama correspondiente.
