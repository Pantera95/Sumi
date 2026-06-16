# Prompt maestro para Codex / Claude

Estamos construyendo SumiControl en el repo:

```text
https://github.com/Pantera95/Sumi
```

SumiControl es un SaaS operativo interno para Sumigases y Sudematin. No es e-commerce. Debe manejar dashboard KPIs, productos, inventario, cilindros, recargas, cotizaciones, notas de entrega, POS interno, caja, cuentas por cobrar, cuentas por pagar, compras, importaciones Valery/Profit/Excel, ROI/rentabilidad, reportes, roles, permisos, configuración y auditoría mínima.

## Stack

```text
Next.js + TypeScript + Tailwind + Prisma + Supabase/PostgreSQL
```

Login propio con usuario + contraseña. No usar NextAuth por ahora.

## Reglas de colaboración

1. No trabajar directo en `main`.
2. Crear rama `feature/[modulo]`.
3. Actualizar `/docs/progress/feature-[modulo].md` con:
   - qué se hizo
   - archivos tocados
   - qué falta
   - dependencias
   - errores conocidos
   - siguiente paso
4. Antes de escribir código:
   - revisar README
   - revisar `/docs/planning`
   - revisar `/docs/progress`
   - revisar schema Prisma actual
5. No duplicar componentes existentes.
6. No tocar módulos de otros agentes salvo que sea necesario.
7. Si se modifica una estructura compartida, documentarlo.

## Prioridad de entrega

Viernes 19 = demo avanzada usable parcialmente.

## Diseño

Mantener diseño SaaS industrial premium con branding Sumigases:

- Azul marino
- Naranja
- Blanco
- Acento amarillo
- Modo claro/oscuro

## Prioridad funcional

1. Dashboard KPIs.
2. Productos/catálogo.
3. Inventario.
4. Cilindros/recargas.
5. Cotizaciones/notas de entrega.
6. POS interno.
7. Importador.
8. Caja/cuentas.
9. ROI / Rentabilidad.
10. Reportes.


## ROI / Rentabilidad

Incluir ROI como métrica transversal. Debe aparecer en dashboard, reportes, productos/inventario, compras, clientes y cilindros/recargas.

Fórmula base:

```text
ROI = (Utilidad neta / Inversión o costo) x 100
```

Para el MVP, implementar cálculos con la data disponible de ventas, compras, costos, utilidad y matrices 2024. El cálculo exacto de gas por peso queda para fase 2.
