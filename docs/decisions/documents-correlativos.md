# Decisión técnica — Documentos y correlativos

> Estado: **PROPUESTA** — requiere visto bueno de Greeg.
> Afecta: cotizaciones, notas de entrega, ventas, recibos, compras, caja, kardex.
> Base: planning §27.

## Regla final (del planning)

```text
Sin QR · Sin código de barras · Con correlativo
```

## Documentos con correlativo

```text
Cotización · Nota de entrega · Nota de venta · Recibo de pago · Orden de compra ·
Factura interna / control interno · Estado de cuenta · Cierre de caja · Kardex
```

Plantillas: **Modelo viejo** y **Modelo nuevo**, seleccionables por documento o config global.

## Decisiones que faltaban (propuestas)

### Alcance del correlativo
- **Propuesta:** secuencia **por empresa + por tipo de documento** (no global).
  Ej.: Sumigases y Sudematin tienen cada una su propia numeración de Nota de Entrega.
- Pros: coherente con multiempresa (§10); evita números compartidos entre empresas.
- Implica modelo `DocumentSequence(companyId, docType, prefix, nextNumber)` (§31).

### Formato sugerido
```text
{PREFIJO}-{AÑO}-{NÚMERO}
Ej: NE-2026-000123   (Nota de Entrega)
    COT-2026-000045  (Cotización)
    REC-2026-000007  (Recibo)
```
- **Propuesta:** prefijo por tipo, año, número con padding. ¿Reinicia por año? (propongo **sí**, anual).

### Aspecto crítico: NO reutilizar números
- **Propuesta:** el correlativo se **asigna al confirmar/emitir** el documento, no al crear el borrador.
  Así un borrador descartado no consume número.
- Anulación: el documento se marca `ANULADO` pero **conserva su número** (no se rellena el hueco).
  Esto deja huecos intencionales y trazables (mejor para auditoría que renumerar).

### Concurrencia
- **Propuesta:** la obtención del siguiente número debe ser **atómica** (transacción / `UPDATE ...
  RETURNING` sobre `DocumentSequence`) para que dos cajeros simultáneos no choquen.

### Plantillas
- **Propuesta MVP:** una sola plantilla ("Modelo nuevo") funcional para el viernes; el selector
  viejo/nuevo queda como config presente pero con una sola opción activa. Decidir si "Modelo viejo"
  entra al MVP.

## Implicaciones

1. Modelos `DocumentSequence`, `DocumentTemplate` (§31).
2. Helper único `nextDocumentNumber(companyId, docType)` atómico; todo documento lo usa.
3. Documentos muestran (coherente con `currency-tax-rate.md`): Subtotal, Descuento, IVA, Total,
   Tasa usada, Método de pago, **Correlativo**.
4. AuditLog en anulación de documento (§30).

## Decisiones derivadas por marcar
- [ ] ¿Correlativo reinicia por año o es continuo? (propongo anual).
- [ ] ¿Prefijos definitivos por tipo de documento? (propongo NE, COT, NV, REC, OC, FI, EC, CC, KX).
- [ ] ¿"Modelo viejo" de plantilla entra al MVP del viernes? (propongo: solo "Modelo nuevo").
- [ ] ¿Quién puede anular cada documento? (propongo OWNER/ADMIN; coordinar con permisos de auth-roles).
