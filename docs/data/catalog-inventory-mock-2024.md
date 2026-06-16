# Mock de catálogo e inventario — data real Sumigases 2024

> Preparado por Claude-Greeg. Alimenta `feature/products-catalog`, `feature/inventory` y el ROI por
> producto (`feature/roi-rentabilidad`). **Cifras reales** de los Excel 2024 (planning §14, §16).

## Fuente

Agregado de las hojas `FACTURAS` + `NOTAS DE ENTREGA` de las matrices de **Abril, Agosto y Noviembre
2024**. Cada línea trae: cantidad, producto, código, total $, costo $, utilidad $, % utilidad.

- **262 productos distintos** con costo y utilidad reales (excluyendo servicios y líneas sin costo).
- Aquí se publican los **22 de mayor utilidad** como base de catálogo demo.
- El `barcode` es el **código legado de Valery/Profit** (sirve para alias de importación — ver
  `ProductAlias` en planning §15/§31). El `sku` es **nuevo**, generado con la regla §16.

## Regla SKU aplicada (§16)

`GAS- MAQ- ELE- ANT- REG- EPP- REP-` + correlativo de 4 dígitos por categoría.

## Catálogo top-22 (REAL: precio, costo, unidades, utilidad, ROI)

| SKU | Cód. legado | Producto | Categoría | Uds | Precio $ | Costo $ | Utilidad $ | ROI % |
|---|---|---|---|---:|---:|---:|---:|---:|
| GAS-0001 | OXI6 | Oxígeno gaseoso cil 6M3 | Gases | 490 | 16,01 | 8,98 | 3.447 | 78 |
| ANT-0001 | SM4827F | Antorcha TIG 200A flex WP26F | Antorchas | 51 | 172,65 | 122,69 | 2.548 | 41 |
| GAS-0002 | NITR6 | Nitrógeno gaseoso cil 6M3 | Gases | 42 | 38,04 | 17,52 | 2.323 | 316 |
| MAQ-0001 | 40053020 | Cable p/ máquina de soldar | Máquinas | 192 | 26,08 | 17,32 | 1.681 | 51 |
| REG-0001 | 2001105 | Regulador de argón c/ flujómetro | Reguladores | 32 | 63,87 | 25,81 | 1.218 | 147 |
| ELE-0001 | E60105/32L | Electrodo 6010 5/32 Linconl | Electrodos | 535 | 6,24 | 4,05 | 1.168 | 54 |
| GAS-0003 | ARG6 | Argón cil 6M3 | Gases | 70 | 51,65 | 35,47 | 1.133 | 46 |
| ANT-0002 | 2002602 | Soplete 36" t/Victor Weldtech | Antorchas | 5 | 311,38 | 105,00 | 1.032 | 197 |
| ANT-0003 | SM4827 | Antorcha TIG 200A 26V | Antorchas | 20 | 140,28 | 97,60 | 854 | 44 |
| REP-0001 | 210106 | Manguera morocha 1/4 GNC | Repuestos | 313 | 5,78 | 3,30 | 776 | 75 |
| ELE-0002 | FD780L | Fundente 760 22.7kg Linconl | Electrodos | 5 | 280,17 | 130,00 | 751 | 116 |
| ELE-0003 | E7018532L | Electrodo 7018 5/32 Linconl | Electrodos | 160 | 5,86 | 1,47 | 701 | 298 |
| GAS-0004 | STD | Acetileno 6kg | Gases | 32 | 52,48 | 34,60 | 572 | 52 |
| ELE-0004 | ERNICRMO3332 | Varilla ER NiCrMo3 3/32 | Electrodos | 10 | 198,00 | 143,00 | 550 | 38 |
| ELE-0005 | 4009MPR | Electrodo E-410 1/8 Carboweld | Electrodos | 30 | 42,45 | 24,60 | 536 | 73 |
| ELE-0006 | CRM801818 | Electrodo 8018 1/8 Carboweld | Electrodos | 250 | 4,99 | 3,14 | 462 | 59 |
| ANT-0004 | 350410 | Porta electrodo Lenco 500A | Antorchas | 46 | 21,32 | 12,43 | 409 | 71 |
| ELE-0007 | 6005301 | Alambre MIG ER-5356 Hoffman | Electrodos | 66 | 12,59 | 6,46 | 405 | 95 |
| REP-0002 | 164024 | Marcador de metal Dalo blanco | Repuestos | 66 | 14,50 | 8,55 | 393 | 70 |
| ELE-0008 | EH7018532 | Electrodo 7018 5/32 Hoffman | Electrodos | 235 | 4,50 | 2,89 | 377 | 55 |
| ELE-0009 | 805948721116 | Electrodo tungsteno 3/32 2% | Electrodos | 152 | 6,77 | 4,45 | 353 | 52 |
| REP-0003 | 26063 | Marcador de metal Dalo amarillo | Repuestos | 84 | 12,75 | 8,97 | 318 | 42 |

## Array listo para seed/mock

```ts
// REAL: sku(generado), barcode(legado), nombre, categoria, precio, costo, unidadesVendidas2024, utilidad2024, roi.
// DEMO: stock / stockMin (las matrices de ventas no traen inventario actual) — ajustar con el Excel de stock real.
export const catalogMock2024 = [
  { sku:"GAS-0001", barcode:"OXI6",        nombre:"Oxígeno gaseoso cil 6M3",        categoria:"Gases industriales y medicinales", precio:16.01,  costo:8.98,   uds:490, utilidad:3447, roi:78,  stock:18, stockMin:10 },
  { sku:"ANT-0001", barcode:"SM4827F",     nombre:"Antorcha TIG 200A flex WP26F",   categoria:"Portaelectrodos y antorchas",      precio:172.65, costo:122.69, uds:51,  utilidad:2548, roi:41,  stock:6,  stockMin:3 },
  { sku:"GAS-0002", barcode:"NITR6",       nombre:"Nitrógeno gaseoso cil 6M3",      categoria:"Gases industriales y medicinales", precio:38.04,  costo:17.52,  uds:42,  utilidad:2323, roi:316, stock:9,  stockMin:8 },
  { sku:"MAQ-0001", barcode:"40053020",    nombre:"Cable p/ máquina de soldar",     categoria:"Máquinas de soldar y equipos",     precio:26.08,  costo:17.32,  uds:192, utilidad:1681, roi:51,  stock:40, stockMin:20 },
  { sku:"REG-0001", barcode:"2001105",     nombre:"Regulador de argón c/ flujómetro",categoria:"Reguladores y válvulas",          precio:63.87,  costo:25.81,  uds:32,  utilidad:1218, roi:147, stock:7,  stockMin:5 },
  { sku:"ELE-0001", barcode:"E60105/32L",  nombre:"Electrodo 6010 5/32 Linconl",    categoria:"Electrodos y varillas",            precio:6.24,   costo:4.05,   uds:535, utilidad:1168, roi:54,  stock:120,stockMin:50 },
  { sku:"GAS-0003", barcode:"ARG6",        nombre:"Argón cil 6M3",                  categoria:"Gases industriales y medicinales", precio:51.65,  costo:35.47,  uds:70,  utilidad:1133, roi:46,  stock:12, stockMin:10 },
  { sku:"ANT-0002", barcode:"2002602",     nombre:"Soplete 36\" t/Victor Weldtech", categoria:"Portaelectrodos y antorchas",      precio:311.38, costo:105.00, uds:5,   utilidad:1032, roi:197, stock:2,  stockMin:2 },
  { sku:"ANT-0003", barcode:"SM4827",      nombre:"Antorcha TIG 200A 26V",          categoria:"Portaelectrodos y antorchas",      precio:140.28, costo:97.60,  uds:20,  utilidad:854,  roi:44,  stock:4,  stockMin:3 },
  { sku:"REP-0001", barcode:"210106",      nombre:"Manguera morocha 1/4 GNC",       categoria:"Accesorios y repuestos",           precio:5.78,   costo:3.30,   uds:313, utilidad:776,  roi:75,  stock:80, stockMin:40 },
  { sku:"ELE-0002", barcode:"FD780L",      nombre:"Fundente 760 22.7kg Linconl",    categoria:"Electrodos y varillas",            precio:280.17, costo:130.00, uds:5,   utilidad:751,  roi:116, stock:3,  stockMin:2 },
  { sku:"ELE-0003", barcode:"E7018532L",   nombre:"Electrodo 7018 5/32 Linconl",    categoria:"Electrodos y varillas",            precio:5.86,   costo:1.47,   uds:160, utilidad:701,  roi:298, stock:90, stockMin:50 },
  { sku:"GAS-0004", barcode:"STD",         nombre:"Acetileno 6kg",                  categoria:"Gases industriales y medicinales", precio:52.48,  costo:34.60,  uds:32,  utilidad:572,  roi:52,  stock:8,  stockMin:6 },
  { sku:"ELE-0004", barcode:"ERNICRMO3332",nombre:"Varilla ER NiCrMo3 3/32",        categoria:"Electrodos y varillas",            precio:198.00, costo:143.00, uds:10,  utilidad:550,  roi:38,  stock:5,  stockMin:4 },
  { sku:"ELE-0005", barcode:"4009MPR",     nombre:"Electrodo E-410 1/8 Carboweld",  categoria:"Electrodos y varillas",            precio:42.45,  costo:24.60,  uds:30,  utilidad:536,  roi:73,  stock:15, stockMin:8 },
  { sku:"ELE-0006", barcode:"CRM801818",   nombre:"Electrodo 8018 1/8 Carboweld",   categoria:"Electrodos y varillas",            precio:4.99,   costo:3.14,   uds:250, utilidad:462,  roi:59,  stock:60, stockMin:40 },
  { sku:"ANT-0004", barcode:"350410",      nombre:"Porta electrodo Lenco 500A",     categoria:"Portaelectrodos y antorchas",      precio:21.32,  costo:12.43,  uds:46,  utilidad:409,  roi:71,  stock:10, stockMin:6 },
  { sku:"ELE-0007", barcode:"6005301",     nombre:"Alambre MIG ER-5356 Hoffman",    categoria:"Electrodos y varillas",            precio:12.59,  costo:6.46,   uds:66,  utilidad:405,  roi:95,  stock:25, stockMin:15 },
  { sku:"REP-0002", barcode:"164024",      nombre:"Marcador de metal Dalo blanco",  categoria:"Accesorios y repuestos",           precio:14.50,  costo:8.55,   uds:66,  utilidad:393,  roi:70,  stock:30, stockMin:20 },
  { sku:"ELE-0008", barcode:"EH7018532",   nombre:"Electrodo 7018 5/32 Hoffman",    categoria:"Electrodos y varillas",            precio:4.50,   costo:2.89,   uds:235, utilidad:377,  roi:55,  stock:70, stockMin:40 },
  { sku:"ELE-0009", barcode:"805948721116",nombre:"Electrodo tungsteno 3/32 2%",    categoria:"Electrodos y varillas",            precio:6.77,   costo:4.45,   uds:152, utilidad:353,  roi:52,  stock:55, stockMin:30 },
  { sku:"REP-0003", barcode:"26063",       nombre:"Marcador de metal Dalo amarillo",categoria:"Accesorios y repuestos",           precio:12.75,  costo:8.97,   uds:84,  utilidad:318,  roi:42,  stock:28, stockMin:20 },
] as const;
```

## Notas y limitaciones

- **Categorías presentes** (de §16): Gases, Electrodos y varillas, Portaelectrodos y antorchas,
  Reguladores y válvulas, Máquinas de soldar, Accesorios y repuestos. (EPP aparece en el set completo
  pero no en el top-22.)
- **`stock` y `stockMin` son DEMO**: las matrices de ventas no traen inventario actual. Reemplazar con
  el Excel de stock real cuando exista (planning §16: "alimentar con Excel real de productos, precios,
  stock e IVA").
- **Stock crítico** para el dashboard: marcar como crítico cuando `stock <= stockMin` (en este mock:
  GAS-0002, ANT-0002, ELE-0002, GAS-0004, ELE-0004 quedan al límite — útil para demostrar la alerta).
- **`barcode` = código Valery/Profit**: poblar `ProductAlias` con estos códigos habilita la
  importación realista (planning §15).
- **Anomalías de fuente:** el agregado total por categoría tiene outliers (líneas con costo 0 o
  devoluciones con utilidad negativa grande). El top-22 ya está filtrado y limpio; si se usa el set
  completo de 262, validar costo>0 y separar `DEV` (devoluciones).
- **Solo Sumigases**: igual que el mock de dashboard, no hay data de Sudematin.

## Decisiones por marcar
- [ ] ¿Editar SKUs antes de importar? (planning §16.4 lo permite; propongo permitir edición en preview).
- [ ] ¿`barcode` legado se guarda como `barcode` del producto o solo como `ProductAlias`? (propongo
      ambos: `barcode` para uso comercial + alias para importación).
- [ ] ¿Cuántos productos cargar para la demo? (propongo el top ~40-50 para que el catálogo se vea poblado).
