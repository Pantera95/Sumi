# Decisión técnica — Caja, métodos de pago y verificación

> Estado: **PROPUESTA** — requiere visto bueno de Greeg.
> Transversal: afecta POS, cuentas por cobrar, dashboard (flujo de caja), reportes.
> Base: planning §22.

## Métodos de pago

```text
Efectivo USD · Efectivo Bs · Punto de venta · Transferencia Bs · Pago móvil · Zelle · Binance
```

## Reglas de verificación (del planning)

| Método            | Requisito             | Estado inicial      |
|-------------------|-----------------------|---------------------|
| Efectivo USD/Bs   | —                     | **Verificado** auto |
| Punto de venta    | Comprobante           | Pendiente verificar |
| Transferencia Bs  | Referencia            | Pendiente verificar |
| Pago móvil        | Referencia            | Pendiente verificar |
| Zelle             | Referencia            | Pendiente verificar |
| Binance           | Referencia            | Pendiente verificar |

Reglas adicionales:

1. Pagos **no verificados NO cuentan como cobrados**.
2. **ADMIN puede verificar** pagos; OWNER/ADMIN pueden **registrar pagos sin comprobante**.
3. Pedido con pago pendiente ⇒ nota de entrega **solo con aprobación** OWNER/ADMIN.
4. **Pagos mixtos** permitidos (combinar verificados y no verificados en una operación).
5. Cada pago se **vincula** a factura, nota de entrega o cliente.

## Flujo de caja debe mostrar

```text
Cobrado verificado · Pendiente por verificar · Por cobrar · Diferencias de caja
```

## Decisiones que faltaban (propuestas)

### Estados del pago (máquina de estados única)
- **Propuesta:** `PENDIENTE_VERIFICAR → VERIFICADO`, y `RECHAZADO` (referencia/comprobante inválido).
  Efectivo entra directo en `VERIFICADO`.

### Moneda del pago vs. moneda del documento
- **Propuesta:** cada pago guarda su moneda y la **tasa usada** (coherente con `currency-tax-rate.md`).
  Un documento en USD puede cobrarse en Bs; el pago registra `rateUsed` para conciliar.

### Sesión de caja (CashSession)
- **Propuesta MVP:** apertura/cierre de caja por usuario con monto inicial y final; **diferencia de
  caja** = (esperado − contado). Si no da tiempo al viernes, dejar `CashMovement` plano y marcar
  `CashSession` como fase 2. Decidir alcance.

### ¿Quién verifica qué?
- **Propuesta:** CAJERO registra; **ADMIN/OWNER verifican**. AUDITOR solo lectura. Coordinar con la
  matriz de permisos de `feature/auth-roles`.

## Implicaciones

1. Modelos `Payment`, `PaymentMethod`, `CashMovement`, `CashSession`, `Receivable` (§31).
2. Un pago no verificado NO suma al KPI "Ventas hoy / Cobrado" del dashboard; suma a "Pendiente por verificar".
3. AuditLog en: registro de pago, verificación de pago (§30).
4. Cuentas por cobrar se alimentan del saldo no cubierto por pagos verificados.

## Decisiones derivadas por marcar
- [ ] ¿`CashSession` (apertura/cierre) entra al MVP o es flujo plano? (propongo flujo plano + cierre simple).
- [ ] ¿Comprobante = archivo subido (Supabase Storage) o solo nº de referencia en MVP? (propongo:
      referencia obligatoria; archivo opcional, fase 2).
- [ ] ¿Un pago puede cubrir varios documentos (abono múltiple)? (propongo: 1 pago → 1 documento en MVP).
