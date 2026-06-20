# Progreso - feature/products-catalog

## Estado

En progreso.

## Que se hizo

- Se creo la ruta `/productos` con una primera vista operativa del catalogo.
- Se agrego data demo de productos por empresa, categoria, almacen, stock, reservado, precio, IVA, estado y ROI.
- Se agregaron filtros por busqueda, categoria y empresa.
- Se enlazo la home inicial con la pantalla de productos.

## Archivos tocados

- `app/productos/page.tsx`
- `app/page.tsx`
- `docs/progress/feature-products-catalog.md`

## Que falta

- Conectar la vista a Prisma/Supabase cuando el modelo este listo.
- Crear formularios reales de alta/edicion.
- Agregar subcategorias administrables.
- Integrar stock real por almacen y movimientos/kardex.

## Dependencias

- Definicion final del modelo `ProductMaster`, `CompanyProduct`, `Category`, `Subcategory`, `Warehouse` y `Stock`.
- Auth/roles para permisos de creacion, edicion e importacion.

## Errores conocidos

- Los botones de importar y nuevo producto son puntos de entrada visuales; aun no ejecutan acciones.

## Siguiente paso

- Crear modelo de datos inicial o acordar contrato mock/API para reemplazar la data local.
