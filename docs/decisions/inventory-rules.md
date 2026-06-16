# Decisión técnica — Reglas de inventario

## Fuente real

SumiControl será la fuente real de inventario.

## Regla de stock negativo

No debe existir stock negativo real.

Si se vende sin stock:

1. Requiere aprobación OWNER/ADMIN.
2. Queda como `Pendiente por entregar`.
3. No afecta inventario.
4. Genera alerta y log.

## Punto de descuento de stock

El stock se descuenta al crear nota de entrega.

## Cotizaciones

Cotización aprobada no descuenta stock. Los productos quedan en estado `En proceso`.

## Nota de entrega parcial

Descuenta solo lo entregado. El resto queda `Pendiente por entregar`.

## Rechazo de entrega

Si el cliente rechaza parte de la entrega, se crea devolución interna y el stock vuelve automáticamente.

## Ajustes

Todo ajuste requiere:

1. Motivo obligatorio.
2. Aprobación OWNER/ADMIN.
3. Log.
