# Mock de dashboard — data real Sumigases 2024

> Preparado por Claude-Greeg. Alimenta `feature/dashboard` (loader `getDashboardData`).
> **Cifras reales** extraídas de los Excel 2024 de Sumigases (planning §14). Sirve para que la demo
> "se vea real" sin esperar a los módulos transaccionales.

## Fuente

| Archivo | Hoja usada | Qué aporta |
|---|---|---|
| `VENTAS VS COMPRAS 2024 ACTUALIZADO.xlsx` | `VENTAS VS COMPRAS` | ventas/mes (Bs y $), factura vs NE, compras/mes, tasa implícita |
| `III PARTE MATRIZ EDO DE RESULTADO.xlsx` | `2024 $` | costo de venta, utilidad bruta, gastos, utilidad neta |

Las matrices mensuales (ABRIL/AGOSTO/NOVIEMBRE) tienen detalle por factura/NE/producto para fases
posteriores (productos, clientes, kardex). Aquí se usa el consolidado anual.

## Totales 2024 reales (USD)

| Métrica | USD |
|---|---|
| Ventas | 310.865 |
| Compras | 89.203 |
| Costo de venta | 157.933 |
| Utilidad bruta | 149.323 |
| Gastos generales | 42.499 |
| **Utilidad neta** | **106.826** |
| Margen bruto | 48,0 % |
| ROI general (= utilidad neta / (costo venta + gastos)) | 53,3 % |
| Facturación vs Notas de entrega | 186.649 (60 %) / 124.216 (40 %) |

## Series mensuales reales (USD) — Ene→Dic

```text
ventas   : 6615  9712  9056  23888 17799 21312 20456 47861 23485 38228 41922 50530
compras  : 3544  3402  1601  6046  3479  4616  4165  13539 7784  8143  12975 19907
utilidad : 439   2245  2664  8035  4535  6592  3265  15532 7460  16208 14715 25136
factura  : 1980  3430  4842  9916  6261  12104 12601 35358 12798 18780 26618 41960
notas-e  : 4635  6282  4214  13972 11538 9208  7855  12503 10687 19448 15304 8570
tasa Bs/$: 36,1  36,5  36,4  36,4  36,6  36,4  36,5  38,3  37,3  38,7  44,5  49,5
```

> La tasa implícita Bs/$ subió de ~36 (ene) a ~49,5 (dic) 2024. Para "tasa actual" del demo se usa
> **49,5** como valor representativo (es data 2024, no BCV real de hoy; marcar como demo).

## Objeto mock listo para `getDashboardData("sumigases", "year")`

```ts
// Deriva del contrato DashboardData (docs/checklists/feature-dashboard.md).
// Cifras de charts/roi = reales 2024. Los KPIs "hoy/pendientes" y los bloques sin fuente
// (CxC, CxP, stock, cilindros) son DEMO plausibles — marcados abajo.
const RATE = 49.5; // Bs/$ demo
const usd = (n: number) => ({ usd: n, bs: Math.round(n * RATE) });
const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const ventas   = [6615,9712,9056,23888,17799,21312,20456,47861,23485,38228,41922,50530];
const compras  = [3544,3402,1601,6046,3479,4616,4165,13539,7784,8143,12975,19907];
const utilidad = [439,2245,2664,8035,4535,6592,3265,15532,7460,16208,14715,25136];
const factura  = [1980,3430,4842,9916,6261,12104,12601,35358,12798,18780,26618,41960];
const notasEnt = [4635,6282,4214,13972,11538,9208,7855,12503,10687,19448,15304,8570];
const trend = (arr: number[]) => ({ points: months.map((m,i)=>({label:m,value:arr[i]})) });

export const dashboardMock2024 = {
  companyId: "sumigases",
  range: "year",
  kpis: {
    // DEMO (sin fuente puntual): día representativo = ventas anual / ~300
    ventasHoy: usd(1036),
    cuentasPorCobrar: usd(18500),   // DEMO
    cuentasPorPagar: usd(9200),     // DEMO (≈ compras pendientes)
    stockCritico: 7,                // DEMO
    cilindrosPendientes: 14,        // DEMO
    recargasPendientes: 5,          // DEMO
    pedidosPendientes: 3,           // DEMO
    balanceGeneral: usd(106826),    // REAL: utilidad neta 2024
  },
  roi: {
    roiGeneralMes: 53.3,            // REAL anual
    utilidadEstimada: usd(106826),  // REAL
    margenBruto: 48.0,              // REAL
    ventasVsCompras: { ventas: usd(310865), compras: usd(89203) }, // REAL
    productosMayorRetorno: [        // DEMO (requiere Excel de productos)
      { nombre: "Argón industrial", roi: 71 },
      { nombre: "Electrodos 6013", roi: 64 },
      { nombre: "Oxígeno medicinal", roi: 58 },
    ],
    categoriasMasRentables: [       // DEMO (nombres reales del catálogo §16)
      { nombre: "Gases industriales y medicinales", margen: 55 },
      { nombre: "Electrodos y varillas", margen: 49 },
      { nombre: "Reguladores y válvulas", margen: 41 },
    ],
  },
  charts: {
    ventasVsUtilidad: trend(ventas),        // REAL (serie utilidad: usar `utilidad` para 2ª línea)
    flujoCaja: trend(utilidad),             // REAL (proxy con utilidad mensual)
    ventasVsCompras: trend(compras),        // REAL (serie ventas arriba)
    facturasVsNotasEntrega: trend(factura), // REAL (serie NE: usar `notasEnt`)
    creditoVsContado: trend(notasEnt),      // PROXY: NE≈crédito, factura≈contado (validar)
    cilindrosPorEstado: [                   // DEMO
      { estado: "Lleno", cantidad: 62 },
      { estado: "Vacío", cantidad: 38 },
      { estado: "En cliente", cantidad: 14 },
      { estado: "Pendiente por retorno", cantidad: 9 },
    ],
    stockCriticoPorAlmacen: [               // DEMO
      { almacen: "Lechería", criticos: 5 },
      { almacen: "Cumaná", criticos: 2 },
    ],
  },
  importacionesRecientes: [                 // DEMO
    { id: "imp-2024-12", archivo: "MATRIZ DE VENTAS NOVIEMBRE II.xlsx", fecha: "2024-12-02", estado: "OK" },
  ],
  alertas: [                                // DEMO
    { tipo: "stock", mensaje: "7 productos bajo mínimo", severidad: "warn" },
    { tipo: "cilindros", mensaje: "9 cilindros pendientes por retorno", severidad: "warn" },
    { tipo: "tasa", mensaje: "Tasa BCV es demo (49,5) — conectar real", severidad: "info" },
  ],
} as const;
```

## Qué es real vs demo

- **REAL (de los Excel 2024):** todas las series mensuales (ventas, compras, utilidad, factura, NE,
  tasa), totales anuales, márgenes, ROI general, balance (utilidad neta), facturas vs NE.
- **DEMO (sin fuente puntual, marcado en el código):** las 8 tarjetas "hoy/pendientes", cilindros,
  stock crítico, productos/categorías ROI, importaciones, alertas.

## Limitaciones / decisiones por marcar

- [ ] **Solo hay data de Sumigases.** Para Sudematin: ¿mock con factor (ej. 0,35×) o vacío "sin data"?
      (propongo factor 0,35× claramente etiquetado como demo).
- [ ] **Tasa actual = 49,5 es 2024**, no BCV de hoy (2026). Cuando exista tasa real, reemplazar `RATE`.
- [ ] El contrato `DashboardData` define `Trend` como **una** serie; los charts "vs" (ventas vs
      utilidad, ventas vs compras, factura vs NE, crédito vs contado) necesitan **dos** series.
      Acción: extender `Trend` a `{ series: {label,points}[] }` o pasar dos `Trend`. Los arrays para
      la 2ª línea ya están arriba (`utilidad`, `ventas`, `notasEnt`).
- [ ] ROI por producto/categoría es demo: para hacerlo real hace falta el Excel de productos
      (precio/costo por SKU), no estas matrices.
