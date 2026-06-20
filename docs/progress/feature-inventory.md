# Progreso - feature/inventory

## Estado

En progreso.

## Que se hizo

- Se creo la ruta `/inventario` con stock por empresa y almacen.
- Se agrego calculo de disponible real: stock fisico menos reservado y en proceso.
- Se agregaron estados operativos: Disponible, En proceso, Critico y Sin stock.
- Se agregaron filtros por empresa, almacen y productos criticos.
- Se extrajo la data demo de productos a `lib/demo-data/catalog.ts` para reutilizarla entre catalogo e inventario.

## Archivos tocados

- `app/inventario/page.tsx`
- `app/productos/page.tsx`
- `app/page.tsx`
- `lib/demo-data/catalog.ts`
- `docs/progress/feature-inventory.md`

## Que falta

- Persistir almacenes, stocks y movimientos con Prisma/Supabase.
- Agregar kardex basico por producto.
- Crear flujo real de ajustes con motivo, aprobacion y log.
- Conectar descuentos de stock a notas de entrega.

## Dependencias

- Modelo de datos final para `Warehouse`, `Stock`, `StockMovement` y `StockAdjustment`.
- Auth/roles para aprobaciones OWNER/ADMIN.
- Modulo de notas de entrega para definir el punto real de descuento.

## Errores conocidos

- El boton de registrar ajuste es visual; aun no ejecuta flujo.
- La data es demo local y no representa inventario real.

## Siguiente paso

- Crear kardex demo o iniciar el schema Prisma base para productos e inventario.
