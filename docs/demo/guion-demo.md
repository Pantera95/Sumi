# Guion de demo — SumiControl

> Preparado por Claude-Greeg. Para la presentación de Sumigases. Capa visual ya en vivo.
> Producción pública: **https://sumicontrol.vercel.app**

## Antes de empezar

- Abrir https://sumicontrol.vercel.app en pantalla completa.
- Probar el toggle claro/oscuro (arriba a la derecha) y dejarlo en el que se vea mejor en sala.
- Tener a mano el selector de empresa (Sumigases / Sudematin / Consolidado).
- Mensaje clave: "Es una demo avanzada usable; cifras 2024 reales de Sumigases, módulos en construcción."

## Recorrido sugerido (8–10 min)

### 1. Entrada y layout (1 min)
- Home → botón **Entrar al panel**.
- Mostrar el sidebar agrupado (Operación, Inventario, Finanzas, Inteligencia, Sistema), el selector
  de empresa y el modo claro/oscuro. Resaltar que es responsive (menú colapsable en móvil/tablet).

### 2. Dashboard ejecutivo (2 min) — `/admin/dashboard`
- 8 tarjetas KPI. Aclarar: **balance/utilidad neta $106.826 es real 2024**; las de "hoy/pendientes"
  están marcadas `demo`.
- Bloque **Rentabilidad / ROI**: ROI 53,3% · margen 48% · ventas $310.865 vs compras $89.203 (reales).
- Gráfico protagonista **Ventas vs utilidad** y secundarios (ventas vs compras, factura vs NE,
  cilindros por estado, stock crítico, importaciones, alertas).
- Cambiar el filtro de rango/empresa para mostrar la intención (aún estático).

### 3. Inventario y ROI por producto (1,5 min) — `/admin/inventory`
- Tabla con productos **reales** (SKU, costo, precio, stock, ROI). Señalar "Stock crítico" en rojo.
- Saltar a `/admin/roi` y `/admin/matrices`: **matriz ROI mensual 2024 real** (Mes·Ventas·Compras·Costo·Utilidad·ROI).

### 4. Cilindros (1 min) — `/admin/cylinders`
- Cilindros por estado (Lleno/Vacío/En cliente/Pendiente por retorno) + estado vacío accionable
  "Registrar movimiento".

### 5. Importaciones (1,5 min) — `/admin/imports`
- Flujo guiado de 8 pasos (subir → mapear → validar → importar) con resumen: filas válidas, errores,
  duplicados, sin equivalencia, totales. Esto vende el importador Valery/Profit/Excel.

### 6. Operación y finanzas (1 min)
- POS, Cotizaciones, Notas de entrega, Caja, CxC/CxP: mostrar estados vacíos **accionables**
  (mensajes claros + botones). Transmite estructura completa aunque falte data.

### 7. Sistema (30 s) — `/admin/users`
- Usuarios y roles + confirmación al "resetear clave" (auditable). Mencionar auditoría y permisos.

## Qué decir sobre el estado real

- **Real:** cifras 2024 (ventas, compras, utilidad, factura vs NE, ROI por producto/categoría, matriz).
- **Demo:** KPIs "hoy/pendientes", cilindros, stock puntual, alertas (marcados).
- **En construcción:** auth/login real (en otra rama), persistencia con base de datos, datos de Sudematin.

## Flujos del planning (§33) cubiertos visualmente

| Flujo | Estado en demo |
|---|---|
| Login y selector de empresa | Selector visible; login real en `feature/auth-roles` |
| Dashboard (KPIs, ROI, stock, cilindros, importaciones) | ✅ visual real/demo |
| Inventario (productos, crítico, ROI) | ✅ tabla real |
| Cilindros (estados, pendientes) | ✅ visual |
| Cotización → nota de entrega | Estructura + estados vacíos |
| POS interno | Estructura + estados vacíos |
| Importador (subir→mapear→importar) | ✅ flujo guiado visual |

## Riesgos a tener en cuenta en sala

- Es capa de presentación: no persiste datos todavía. No prometer transacciones reales.
- Tasa Bs/$ usada (49,5) es de 2024, no BCV de hoy.
- Sudematin sin data propia (solo Sumigases 2024).
