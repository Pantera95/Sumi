# Planning final — SumiControl

## 1. Resumen ejecutivo

SumiControl será una plataforma SaaS interna para Sumigases Oriente C.A. y Sudematin, enfocada en control administrativo, inventario, ventas internas, cotizaciones, notas de entrega, cilindros, recargas, caja, compras, cuentas por cobrar, cuentas por pagar, reportes e importación de datos desde Valery, Profit y matrices Excel.

El sistema no será e-commerce ni tienda pública. Será una herramienta operativa para dueños, administradores, cajeros, vendedores, almacén y personal interno.

Alice queda postergado como producto neutral futuro. La prioridad inmediata es SumiControl.

## 2. Objetivo de entrega

**Fecha objetivo:** viernes 19.

**Tipo de entrega:** demo avanzada usable parcialmente.

La demo debe permitir navegar y operar los flujos críticos principales, con data real cuando esté disponible y data simulada donde falte información. No se presentará como ERP terminado, sino como primera versión funcional avanzada con estructura real de producto.

## 3. Prioridad absoluta

1. Dashboard administrativo y KPIs.
2. Productos y catálogo.
3. Inventario por empresa y almacén.
4. Cilindros y recargas.
5. Cotizaciones.
6. Notas de entrega.
7. POS paralelo/control interno.
8. Importador Valery / Profit / Excel.
9. Caja y movimientos.
10. Cuentas por cobrar y pagar básicas.
11. Reportes administrativos.
12. ROI / Rentabilidad.
13. Configuración básica.
13. Roles y permisos.
14. Auditoría mínima.

## 4. Repositorios

### SumiControl

Repositorio principal:

```text
https://github.com/Pantera95/Sumi
```

### Alice

Repositorio neutral futuro:

```text
https://github.com/Pantera95/Alice.git
```

Alice queda postergado. No se desarrollará en paralelo esta semana. La arquitectura de SumiControl debe escribirse de forma modular para que más adelante pueda reutilizarse en Alice sin datos, branding ni reglas específicas de Sumigases.

### Vercel

Panel objetivo indicado para despliegues:

```text
https://vercel.com/pantera95s-projects
```

Regla operativa:

- `feature/*` puede tener preview opcional
- `dev` se usa como staging compartido
- `main` se reserva para producción
- el flujo detallado vive en `docs/deployment/vercel-workflow.md`

## 5. Stack técnico confirmado

```text
Next.js
TypeScript
Tailwind CSS
Prisma
PostgreSQL / Supabase
Supabase Storage
Vercel
Login propio con usuario + contraseña
```

No se usará NextAuth en esta fase. El login será propio y simple.

## 6. Riesgo aceptado: contraseñas visibles

Decisión final del proyecto: dueño y administrador podrán ver las contraseñas actuales de los usuarios.

Esto debe quedar registrado como riesgo técnico aceptado porque implica guardar contraseñas de forma visible o reversible.

Medidas mínimas recomendadas:

1. Solo dueño y administrador pueden ver contraseñas.
2. Cada visualización de contraseña debe registrarse en auditoría.
3. El sistema debe permitir resetear contraseña.
4. Al crear un usuario, se debe mostrar una contraseña temporal.
5. Auditor no puede ver contraseñas.
6. Distribuidores no pueden ver ni cambiar contraseñas de otros usuarios.
7. En fase futura debe migrarse a contraseñas seguras con hash y solo reset.

## 7. Estructura base del repo

```text
/app
  /auth
    /login

  /admin
    /dashboard
    /products
    /categories
    /inventory
    /pos
    /quotes
    /delivery-notes
    /sales
    /cash
    /receivables
    /payables
    /purchases
    /cylinders
    /recargas
    /reports
    /roi
    /imports
    /settings

  /distributor
    /login
    /orders
    /documents
    /cylinders

/components
  /ui
  /layout
  /dashboard
  /tables
  /forms
  /charts
  /documents
  /modals
  /theme

/lib
  /auth
  /db
  /permissions
  /currency
  /imports
  /documents
  /audit
  /validators
  /utils

/modules
  /products
  /inventory
  /cylinders
  /sales
  /quotes
  /cash
  /reports
  /roi
  /imports
  /settings

/prisma
  schema.prisma
  seed.ts

/docs
  /planning
  /progress
  /decisions
  /prompts
```

## 8. Ramas de trabajo

No trabajar directo sobre `main`.

```text
main
dev
feature/auth-roles
feature/company-selector
feature/ui-system
feature/dashboard
feature/products-catalog
feature/inventory
feature/cylinders
feature/quotes-delivery-notes
feature/pos-sales
feature/imports-valery-profit
feature/cash-payments
feature/receivables-payables
feature/purchases
feature/reports
feature/roi-rentabilidad
feature/settings
feature/audit-logs
```

Flujo:

```text
feature/* -> dev -> main
```

Cada feature debe incluir un archivo de progreso en `/docs/progress`.

Regla obligatoria de comunicacion:

1. Cada sesion debe actualizar `docs/progress/feature-*.md` antes de dar por cerrado un bloque.
2. Cada sesion debe avisar al resto cuando:
   - crea rama
   - toca archivos con candado
   - termina un bloque funcional
   - hace merge a `dev`
   - hace deploy a Vercel
   - detecta un bloqueo transversal
3. El protocolo oficial vive en `docs/communication/update-protocol.md`.
4. Las plantillas oficiales viven en:
   - `docs/communication/update-message-template.txt`
   - `docs/communication/handoff-template.txt`
5. Mensajes ya preparados para copiar y pegar:
   - `docs/communication/message-to-salem.txt`
   - `docs/communication/message-to-claude-greeg.txt`
   - `docs/communication/message-general-project-chat.txt`
6. Nadie debe saltarse este paso, porque la coordinacion entre sesiones es parte del trabajo, no un extra.

## 9. División de trabajo por agentes / IA

### Agente A — Core, auth, permisos y base de datos

Ramas:

```text
feature/auth-roles
feature/company-selector
feature/settings
feature/audit-logs
```

Responsabilidades:

1. Prisma schema inicial.
2. Login propio.
3. Usuarios y roles.
4. Permisos.
5. Empresas.
6. Selector Sumigases/Sudematin.
7. Configuración base.
8. Auditoría mínima.
9. Seeds iniciales.

### Agente B — UI, layout y dashboard

Ramas:

```text
feature/ui-system
feature/dashboard
feature/reports
```

Responsabilidades:

1. Layout admin.
2. Sidebar.
3. Header.
4. Modo claro/oscuro.
5. Cards KPI.
6. Gráficos.
7. Dashboard principal.
8. Reportes básicos.
9. Responsive desktop/tablet.

### Agente C — Productos, inventario, cilindros y recargas

Ramas:

```text
feature/products-catalog
feature/inventory
feature/cylinders
```

Responsabilidades:

1. Productos.
2. Categorías y subcategorías.
3. Catálogo base desde PDF.
4. Inventario por almacén.
5. Kardex básico.
6. Movimientos.
7. Cilindros por cantidad.
8. Recargas básicas.
9. Alertas de cilindros pendientes.

### Agente D — Ventas, cotizaciones, POS e importaciones

Ramas:

```text
feature/quotes-delivery-notes
feature/pos-sales
feature/imports-valery-profit
feature/cash-payments
feature/receivables-payables
feature/purchases
```

Responsabilidades:

1. Cotizaciones.
2. Notas de entrega.
3. POS interno.
4. Ventas internas.
5. Caja y pagos.
6. Cuentas por cobrar.
7. Cuentas por pagar.
8. Compras básicas.
9. Importador Excel/Valery/Profit.
10. Reversión de importaciones.

## 10. Multiempresa

SumiControl debe manejar dos empresas:

```text
Sumigases
Sudematin
```

Reglas:

1. Owner y administrador pueden ver ambas.
2. Owner y administrador tienen selector de empresa.
3. Clientes separados por empresa.
4. Proveedores separados por empresa.
5. Almacenes separados por empresa.
6. Reportes separados por empresa.
7. Puede existir vista consolidada, pero la vista inicial será empresa seleccionada.
8. Productos pueden compartir maestro, pero cada empresa tendrá su propio precio, costo, stock, IVA y estado.

Modelo recomendado:

```text
Company
ProductMaster
CompanyProduct
Warehouse
Stock
```

## 11. Roles iniciales

```text
OWNER
ADMIN
AUDITOR
CAJERO
VENDEDOR
ALMACEN
COMPRAS
TECNICO_RECARGA
DISTRIBUIDOR
```

## 12. Módulos para la demo del viernes 19

### Funcionales

```text
Login y roles
Selector de empresa
Dashboard KPIs
Productos/catálogo básico
Categorías/subcategorías
Inventario por almacén
POS paralelo
Cotizaciones
Notas de entrega
Ventas internas
Caja/movimientos
Cuentas por cobrar básicas
Cuentas por pagar básicas
Compras básicas
Cilindros
Recargas
Reportes básicos
ROI / Rentabilidad básico
Importaciones Excel/Valery/Profit básicas
Monedas/tasa BCV
Configuración básica
Auditoría/logs mínimos
```

### Fase 2

```text
Portal distribuidores completo
Proveedores completo
Despachos completo
CRM avanzado
Auditoría avanzada
Garantías
Seriales/reparaciones
Cálculo real de gas por peso
Alice
```

## 13. Dashboard principal

El dashboard será la pantalla protagonista.

### Primera fila: 8 tarjetas

```text
Ventas hoy
Cuentas por cobrar
Cuentas por pagar
Stock crítico
Cilindros pendientes
Recargas pendientes
Pedidos pendientes
Balance general
```

### Bloques secundarios

```text
Ventas vs utilidad
Flujo de caja
Ventas vs compras
Facturas vs notas de entrega
Crédito vs contado
Cilindros por estado
Stock crítico por almacén
Importaciones recientes
Alertas operativas
```

### Filtros

```text
Empresa
Rango de fecha
Moneda
Almacén
Categoría
Producto
Cliente
Vendedor
Documento
Estado
```

### Rangos

```text
Día
Semana
Mes
Año
Personalizado
```

### Gráfico protagonista

```text
Ventas vs utilidad
```

### Insights automáticos

```text
Producto con mayor rotación
Cliente con mayor deuda vencida
Cilindros pendientes por retorno
Categoría con mayor margen
Productos sin movimiento
Stock bajo con venta recurrente
Compras sugeridas
Diferencias de caja
Clientes que dejaron de comprar
Ventas con utilidad negativa
ROI bajo por producto/categoría/cliente
Compras con bajo retorno
Documentos duplicados
Productos sin equivalencia
```

## 14. Dashboard con data 2024

Los Excel 2024 deben alimentar el dashboard inicial.

Archivos base:

```text
III PARTE MATRIZ EDO DE RESULTADO.xlsx
MATRIZ DE VENTAS ABRIL 2024.xlsx
MATRIZ DE VENTAS AGOSTO modificada.xlsx
MATRIZ DE VENTAS NOVIEMBRE II.xlsx
VENTAS VS COMPRAS 2024 ACTUALIZADO.xlsx
```

Objetivo:

1. Construir KPIs reales de ventas.
2. Construir ventas vs compras.
3. Construir utilidad.
4. Construir crédito vs contado.
5. Construir facturas vs notas de entrega.
6. Construir estado de resultado básico.
7. Detectar productos/clientes/documentos.
8. Diseñar importador realista.

## 15. Importador Excel / Valery / Profit

El importador es un módulo principal, no secundario.

### Tipos de archivo

```text
Excel
CSV
TXT
PDF solo si en fase futura se decide
```

### Prioridad de importación

```text
Inventario
Nota de entrega
Ventas diarias
Cierre de caja
Compras
Gastos
Estado de resultado
Ventas vs compras
```

### Flujo del importador

1. Subir archivo.
2. Detectar hojas.
3. Detectar columnas.
4. Sugerir tipo de importación.
5. Mapear columnas manualmente.
6. Vista previa.
7. Validar errores.
8. Validar duplicados.
9. Crear equivalencias.
10. Importar.
11. Guardar lote.
12. Actualizar KPIs.
13. Permitir reversión solo por owner/admin.

### Tablas necesarias

```text
ImportBatch
ImportFile
ImportRow
ImportError
ImportMapping
ProductAlias
CustomerAlias
SupplierAlias
```

### Validaciones

```text
Archivo duplicado por hash
Factura duplicada
Documento duplicado
Producto sin equivalencia
Cliente sin equivalencia
Monto inválido
Fecha inválida
Fórmula rota
Devolución detectada
Utilidad negativa
```

## 16. Productos y catálogo

El catálogo 2026 será la base visual y de categorías.

### Categorías iniciales

```text
Gases industriales y medicinales
Máquinas de soldar y equipos
Electrodos y varillas
Portaelectrodos y antorchas
Reguladores y válvulas
Equipo de protección personal
Accesorios y repuestos
```

### Para la demo

1. Cargar todo el catálogo extraíble del PDF si es posible.
2. Extraer imágenes del PDF si es viable.
3. Generar SKUs automáticos.
4. Permitir edición de SKUs antes de importar.
5. Alimentar luego con Excel real de productos, precios, stock e IVA.

### Regla SKU

```text
GAS-0001
MAQ-0001
ELE-0001
ANT-0001
REG-0001
EPP-0001
REP-0001
```

### Variantes

```text
ELE-0001
ELE-0001A
ELE-0001B
ELE-0001C
```

## 17. Código de barras y seriales

Modelo mixto confirmado.

### Campos

```text
sku
barcode
serialCode
```

### Regla

1. `sku` identifica producto o variante.
2. `barcode` identifica código comercial del producto.
3. `serialCode` identifica unidad física individual cuando aplique.

Consumibles usan código por producto o variante. Equipos o ítems controlados pueden usar serial unitario. Cilindros no se controlarán por serial en MVP; se controlarán por cantidad, estado, gas, capacidad, propiedad y ubicación.

## 18. Inventario

SumiControl será la fuente real de inventario.

### Reglas

1. No debe existir stock negativo real.
2. Venta sin stock requiere aprobación.
3. Venta sin stock queda como “Pendiente por entregar”.
4. Venta sin stock no afecta inventario.
5. El stock se descuenta al generar nota de entrega.
6. Cotización aprobada no descuenta stock.
7. Cotización aprobada deja productos “En proceso”.
8. Nota de entrega parcial descuenta solo lo entregado.
9. Si el cliente rechaza parte de la entrega, se genera devolución interna.
10. La devolución devuelve stock automáticamente.
11. Ajustes de inventario requieren motivo, aprobación y log.
12. Kardex básico desde MVP.

### Estados

```text
Disponible
En proceso
Reservado
Entregado
Pendiente por entregar
Devuelto
Ajustado
Anulado
```

## 19. Cotizaciones y notas de entrega

### Flujo

```text
Borrador
-> Aprobada / Rechazada
-> Nota de Entrega
-> Venta interna
-> Facturación fiscal opcional en Valery
```

### Reglas

1. Cotización puede quedar en borrador.
2. Cotización aprobada no descuenta stock.
3. Al aprobar, productos quedan en proceso.
4. Nota de entrega descuenta stock.
5. Nota de entrega requiere cliente registrado.
6. Nota de entrega puede generarse desde POS, cotización, pedido de distribuidor o venta interna.
7. Solo owner/admin convierten cotización aprobada en nota de entrega.
8. Solo owner/admin anulan nota de entrega.
9. Documento sin QR.
10. Documento sin código de barras.
11. Documento con correlativo.

## 20. POS paralelo

El POS de SumiControl no reemplaza Valery.

### Objetivo

1. Control interno.
2. Registro operativo.
3. Control de stock.
4. Control de cliente.
5. Control de descuentos.
6. Generación de documento interno.
7. Preparación para nota de entrega.
8. Relación con caja y cuentas por cobrar.

### Reglas

1. Cliente obligatorio.
2. Puede existir cliente genérico.
3. Buscar por SKU, nombre, categoría, código de barras.
4. Mostrar imagen.
5. Mostrar stock.
6. Mostrar precio USD/Bs.
7. Costo/margen solo para roles autorizados.
8. Descuentos requieren aprobación.
9. Descuento máximo 50%.
10. Venta sin stock requiere aprobación.
11. Venta sin stock queda pendiente por entregar.
12. Devoluciones requieren aprobación.
13. Anulaciones requieren aprobación.

## 21. Cilindros y recargas

Este módulo es diferencial de SumiControl.

### Control

Por cantidad, no por cilindro individual.

### Filtros

```text
Tipo de gas
Capacidad
Propiedad
Estado
Cliente
Ubicación
Empresa
Almacén
```

### Estados

```text
Lleno
Vacío
En cliente
Prestado
Alquilado
En prueba hidrostática
Vencido
Perdido
Dañado
Pendiente por retorno
```

### Operaciones base

#### A. Intercambio directo

Cliente entrega vacío y recibe lleno.

Resultado:

```text
Entra 1 vacío
Sale 1 lleno
Se cobra gas/recarga
No queda pendiente
```

#### B. Entrega sin retorno

Cliente recibe lleno y no entrega vacío.

Resultado:

```text
Sale 1 lleno
Queda pendiente por retorno
Se genera alerta
```

#### C. Cilindro de cliente

Cliente deja cilindro propio.

Resultado:

```text
Se registra recepción
No aumenta stock propio
Puede convertirse en stock propio solo con aprobación
```

### Operación especial

```text
Convertir cilindro de cliente a inventario propio
```

Requiere autorización owner/admin, motivo obligatorio y log.

### Para viernes 19

Incluir estados, movimientos, pendientes por retorno, recargas básicas, dashboard de cilindros y alertas. No incluir cálculo real de gas por peso en MVP. Queda fase 2.

## 22. Caja y pagos

### Métodos de pago

```text
Efectivo USD
Efectivo Bs
Punto de venta
Transferencia Bs
Pago móvil
Zelle
Binance
```

### Reglas

1. Efectivo se marca automáticamente como verificado.
2. Punto de venta requiere comprobante.
3. Transferencia, pago móvil, Zelle y Binance requieren referencia.
4. Pagos no verificados no cuentan como cobrados.
5. Admin puede verificar pagos.
6. Owner/admin pueden registrar pagos sin comprobante.
7. Pedido con pago pendiente puede generar nota de entrega solo con aprobación.
8. Pagos mixtos pueden combinar verificados y no verificados.
9. Los pagos deben vincularse a factura, nota de entrega o cliente.

### Flujo de caja debe mostrar

```text
Cobrado verificado
Pendiente por verificar
Por cobrar
Diferencias de caja
```

## 23. Cuentas por cobrar

MVP mínimo:

1. Cliente.
2. Documento origen.
3. Monto.
4. Moneda.
5. Estado.
6. Fecha.
7. Vencimiento configurable.
8. Pagos parciales.
9. Alertas desde 8-15 días.
10. Exportación PDF/XLSX.
11. Venta a cliente moroso requiere aprobación.

## 24. Cuentas por pagar

MVP mínimo:

1. Proveedor.
2. Compra.
3. Monto.
4. Moneda.
5. Estado.
6. Alerta desde 7 días.
7. Registro de abonos.
8. Visible para owner/admin.
9. Exportación básica.

## 25. Compras

MVP básico:

1. Crear orden de compra.
2. Reservar presupuesto.
3. Recepción parcial.
4. Actualizar stock al recibir.
5. Actualizar costo al recibir.
6. Usar último costo.
7. Crear cuenta por pagar automáticamente.
8. Registrar, no pagar desde caja en esta fase.

## 26. Moneda, tasa e impuestos

Reglas:

1. Manejar USD y Bs.
2. Tasa BCV automática.
3. Tasa especial manual por venta.
4. Tasa especial solo visible para owner/admin.
5. Tasa vencida a medianoche.
6. Tasa vencida bloquea venta salvo autorización.
7. Dashboard usa tasa actual.
8. Dejar opción futura para tasa histórica.
9. IVA 16% en Bs.
10. Descuento se aplica antes del IVA.

Documentos muestran:

```text
Subtotal
Descuento
IVA
Total
Tasa usada
Método de pago
```

## 27. Documentos

Regla final:

```text
Sin QR
Sin código de barras
Con correlativo
```

Documentos:

```text
Cotización
Nota de entrega
Nota de venta
Recibo de pago
Orden de compra
Factura interna / control interno
Estado de cuenta
Cierre de caja
Kardex
```

Plantillas:

```text
Modelo viejo
Modelo nuevo
```

Seleccionables por documento o configuración global.

## 28. ROI / Rentabilidad

El ROI debe ser visible en varias áreas del sistema, no como un reporte aislado. Para Sumigases será una métrica clave de decisión para compras, inventario, clientes, productos, cilindros y recargas.

### Fórmula base

```text
ROI = (Utilidad neta / Inversión o costo) x 100
```

Según el contexto, la inversión puede ser costo de compra, costo de inventario, costo de cilindros, costo de gas/recarga o costo total asociado a una operación.

### Ubicaciones obligatorias

1. Dashboard owner/admin: bloque ejecutivo `Rentabilidad / ROI`.
2. Reportes: sección `ROI / Rentabilidad`.
3. Productos e inventario: ROI por producto, variante, categoría y rotación.
4. Compras: ROI por orden de compra, proveedor y lote recibido.
5. Cilindros y recargas: ROI de recargas, cilindros pendientes, alquileres/préstamos y pérdidas por no retorno.
6. Clientes: ROI comercial por cliente, utilidad generada, deuda pendiente y riesgo de crédito.
7. Matrices administrativas: matriz ROI mensual y anual.

### Dashboard: bloque Rentabilidad / ROI

Debe aparecer debajo de las 8 tarjetas principales, junto al gráfico de Ventas vs utilidad y Flujo de caja.

Tarjetas sugeridas:

```text
ROI general del mes
Utilidad estimada
Margen bruto
Ventas vs compras
Productos con mayor retorno
Categorías más rentables
```

### Reporte ROI / Rentabilidad

Debe permitir filtrar por:

```text
Fecha
Empresa
Almacén
Producto
Categoría
Cliente
Proveedor
Compra
Documento
Moneda
```

Vistas mínimas:

```text
ROI general
ROI mensual
ROI por producto
ROI por categoría
ROI por cliente
ROI por proveedor
ROI por compra
ROI de cilindros y recargas
ROI de inventario sin movimiento
```

### ROI en productos e inventario

Cada producto debe mostrar, cuando haya data suficiente:

```text
Precio de venta
Costo
Margen
Utilidad por unidad
Unidades vendidas
Utilidad total generada
ROI del producto
Rotación
Stock actual
Stock inmovilizado
```

### ROI en compras

Cada compra debe poder analizarse por retorno:

```text
Orden de compra
Proveedor
Costo total
Productos recibidos
Ventas generadas desde esa compra
Utilidad generada
ROI de la compra
Estado de recuperación de inversión
```

### ROI en cilindros y recargas

Debe medir el impacto de:

```text
Ingresos por recargas
Costo estimado de operación
Cilindros pendientes por retorno
Cilindros perdidos
Cilindros alquilados/prestados
Utilidad por recarga
ROI de recargas
Impacto de cilindros no devueltos
```

Para MVP se calculará con la data disponible. El cálculo exacto de gas por peso queda para fase 2.

### ROI en clientes

En la ficha del cliente debe aparecer:

```text
Ventas totales
Utilidad generada
Cuentas pendientes
Días promedio de pago
ROI comercial
Riesgo de crédito
```

### Matriz ROI

En `Reportes -> Matrices` debe existir una vista tipo:

```text
Mes | Ventas | Compras | Costo | Utilidad | Gastos | ROI
```

Esta matriz debe alimentarse con los Excel 2024 y con futuras importaciones Valery/Profit/Excel.


## 29. Reportes

Reportes MVP:

1. Ventas diarias.
2. Ventas por cliente.
3. Ventas por producto.
4. Ventas por categoría.
5. Ventas por documento.
6. Facturas vs notas de entrega.
7. Crédito vs contado.
8. Utilidad.
9. Compras.
10. Cuentas por cobrar.
11. Cuentas por pagar.
12. Caja.
13. Inventario bajo.
14. Kardex.
15. Cilindros pendientes.
16. Recargas.
17. Importaciones.

Exportaciones:

```text
PDF
CSV
Excel
```

## 30. Auditoría mínima

Registrar:

```text
Login
Visualización de contraseña
Cambio de precio
Cambio de costo
Ajuste de stock
Anulación
Devolución
Descuento aprobado
Venta sin stock aprobada
Cambio de tasa
Cambio de crédito
Registro de pago
Verificación de pago
Importación
Reversión de importación
Conversión de cilindro de cliente a stock propio
Creación de usuario
Edición de usuario
Cambio de permisos
```

## 31. Modelo de datos inicial

### Core

```text
Company
User
Role
Permission
UserCompanyAccess
AuditLog
Setting
```

### Productos e inventario

```text
ProductMaster
CompanyProduct
ProductVariant
Category
Subcategory
Warehouse
Stock
StockMovement
StockAdjustment
ProductAlias
```

### Ventas y documentos

```text
Customer
CustomerContact
Quote
QuoteLine
DeliveryNote
DeliveryNoteLine
Sale
SaleLine
DocumentSequence
DocumentTemplate
```

### Caja y pagos

```text
Payment
PaymentMethod
CashMovement
CashSession
Receivable
Payable
```

### Compras

```text
Supplier
PurchaseOrder
PurchaseOrderLine
PurchaseReceipt
PurchaseReceiptLine
```

### Cilindros

```text
CylinderType
CylinderCapacity
CylinderStock
CylinderMovement
CylinderReturnPending
CylinderRental
CylinderConversionRequest
Recharge
RechargeLine
```

### Importaciones

```text
ImportBatch
ImportFile
ImportRow
ImportError
ImportMapping
ProductAlias
CustomerAlias
SupplierAlias
```

### Reportes

```text
KpiSnapshot
ProfitLossSnapshot
RoiSnapshot
RoiMetric
ExchangeRateSnapshot
```

## 32. Plan por días hasta viernes 19

### Día 1 — Setup, core y layout

Objetivo: dejar el repo listo para colaborar y una app navegable.

Tareas:

1. Crear proyecto base.
2. Configurar Tailwind.
3. Configurar Prisma.
4. Configurar Supabase.
5. Crear `.env.example`.
6. Crear schema inicial.
7. Crear seed de empresas, roles, usuarios, almacenes y categorías.
8. Crear login.
9. Crear layout admin.
10. Crear sidebar.
11. Crear selector de empresa.
12. Crear modo claro/oscuro.
13. Crear README inicial.
14. Crear archivos de progreso por rama.

Entregable:

```text
App abre
Login funciona
Selector de empresa funciona
Dashboard vacío carga
Sidebar muestra módulos
```

### Día 2 — Dashboard + data 2024 + productos

Objetivo: que el dashboard empiece a verse real.

Tareas:

1. Crear tarjetas KPI.
2. Crear gráfico Ventas vs utilidad.
3. Crear estructura para importar matrices.
4. Cargar data simulada o real inicial.
5. Crear productos/categorías.
6. Cargar catálogo base.
7. Crear tabla de productos.
8. Crear filtros.
9. Crear inventario base por almacén.
10. Crear stock crítico.

Entregable:

```text
Dashboard con KPIs visibles
Productos visibles
Categorías visibles
Inventario básico funcional
```

### Día 3 — Inventario + cilindros + recargas

Objetivo: cubrir el diferencial operativo principal.

Tareas:

1. Crear movimientos de inventario.
2. Crear kardex básico.
3. Crear módulo cilindros.
4. Crear estados de cilindros.
5. Crear operación intercambio directo.
6. Crear operación entrega sin retorno.
7. Crear operación cilindro de cliente.
8. Crear pendientes por retorno.
9. Crear recargas básicas.
10. Agregar KPIs de cilindros al dashboard.

Entregable:

```text
Inventario mueve stock
Cilindros operativos
Recargas básicas
Alertas de retorno visibles
```

### Día 4 — Cotizaciones + notas de entrega + POS

Objetivo: crear flujo comercial interno.

Tareas:

1. Crear cotización.
2. Crear líneas de cotización.
3. Aprobar/rechazar cotización.
4. Convertir a nota de entrega.
5. Descontar stock al crear nota de entrega.
6. Crear POS básico.
7. Buscar productos.
8. Agregar productos.
9. Seleccionar cliente.
10. Crear venta interna.
11. Validar venta sin stock.
12. Solicitar aprobación.

Entregable:

```text
Cotización funcional
Nota de entrega funcional
POS básico funcional
Stock se descuenta correctamente
```

### Día 5 — Caja + cuentas + importador + reportes

Objetivo: cerrar demo con administración y reportes.

Tareas:

1. Crear pagos.
2. Crear caja/movimientos.
3. Crear cuentas por cobrar.
4. Crear cuentas por pagar.
5. Crear compras básicas.
6. Crear importador genérico.
7. Crear mapeo de columnas.
8. Crear vista previa.
9. Crear validación de duplicados.
10. Crear reportes básicos.
11. Crear reporte ROI / Rentabilidad básico.
12. Crear exportación básica si da tiempo.
12. Pulir UI.
13. Hacer QA general.
14. Preparar demo.

Entregable:

```text
Caja básica
Cuentas básicas
Importador básico
Reportes básicos
Demo lista
```

## 33. Checklist de demo

### Flujo 1 — Login y selector

1. Login como owner.
2. Seleccionar Sumigases.
3. Cambiar a Sudematin.
4. Volver a Sumigases.

### Flujo 2 — Dashboard

1. Ver tarjetas principales.
2. Cambiar rango de fecha.
3. Ver Ventas vs utilidad.
4. Ver stock crítico.
5. Ver cilindros pendientes.
6. Ver bloque Rentabilidad / ROI.
7. Ver importaciones recientes.

### Flujo 3 — Inventario

1. Ver productos.
2. Filtrar por categoría.
3. Ver stock por almacén.
4. Ver producto crítico.
5. Ver movimiento.
6. Ver kardex básico.

### Flujo 4 — Cilindros

1. Ver cilindros por estado.
2. Registrar intercambio directo.
3. Registrar entrega sin retorno.
4. Ver pendiente por retorno.
5. Registrar recarga básica.

### Flujo 5 — Cotización y nota de entrega

1. Crear cotización.
2. Aprobar.
3. Convertir en nota de entrega.
4. Confirmar descuento de stock.
5. Generar documento.

### Flujo 6 — POS interno

1. Buscar producto.
2. Agregar al carrito.
3. Seleccionar cliente.
4. Registrar venta.
5. Registrar pago.
6. Ver movimiento de caja.

### Flujo 7 — Importador

1. Subir archivo.
2. Detectar hojas.
3. Mapear columnas.
4. Ver vista previa.
5. Detectar errores.
6. Importar.
7. Ver KPIs actualizados.

## 34. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Querer terminar todo para viernes | Presentar demo avanzada usable parcialmente |
| Contraseñas visibles | Registrar como riesgo aceptado y auditar visualización |
| Archivos Valery/Profit inconsistentes | Importador genérico con mapeo manual |
| Catálogo PDF difícil de extraer | Cargar lo extraíble y completar con Excel |
| Cilindros complejos | MVP por cantidad/estado, cálculo por peso fase 2 |
| Agentes pisándose código | Ramas por módulo y archivos de progreso |
| Dashboard sin data suficiente | Usar matrices 2024 + data demo controlada |
| Stock inconsistente | Nota de entrega como punto único de descuento |
| Facturación fiscal | SumiControl solo control interno; Valery sigue fiscal |
| Importaciones duplicadas | Hash de archivo + validación de documentos |
| Productos sin equivalencia | Tabla ProductAlias |
| Cliente escrito diferente | CustomerAlias |
| Fórmulas rotas en Excel | Importar valores y validar errores |

## 35. Fase 2

1. Portal distribuidores completo.
2. Proveedores completo.
3. Despachos completo.
4. CRM avanzado.
5. Auditoría avanzada.
6. Cálculo real de gas por peso.
7. Mejor integración Valery/Profit.
8. Automatización BCV.
9. Documentos avanzados.
10. Exportaciones avanzadas.
11. Dashboard predictivo.
12. Módulo Alice neutral.
