# Decisión técnica — Moneda, tasa BCV e IVA

> Estado: **PROPUESTA** — requiere visto bueno de Greeg.
> Transversal: bloquea/afecta POS, cotizaciones, notas de entrega, caja, documentos, dashboard, ROI.
> Base: planning §26.

## Reglas confirmadas (del planning)

1. Se manejan **USD y Bs**.
2. Tasa **BCV automática**; opción de **tasa especial manual por venta**.
3. La tasa especial solo es visible para OWNER/ADMIN.
4. La tasa vence a medianoche; tasa vencida **bloquea venta salvo autorización** OWNER/ADMIN.
5. El dashboard usa la **tasa actual** (tasa histórica = fase 2).
6. **IVA 16%** en Bs. El **descuento se aplica antes del IVA**.
7. Documentos muestran: Subtotal, Descuento, IVA, Total, **Tasa usada**, Método de pago.

## Decisiones que faltaban (propuestas)

### Moneda de almacenamiento
- **Propuesta:** almacenar montos en **USD como moneda base** + guardar la **tasa usada** en cada
  documento; Bs se calcula/persiste como derivado al momento de emitir.
- Pros: USD es estable; reportes históricos no se distorsionan; la tasa queda "congelada" en el doc.
- Contra: requiere disciplina de guardar siempre `rateUsed` por documento (no recalcular después).

### Origen de la tasa para el MVP
- **Propuesta:** para el viernes, **tasa BCV cargada manualmente** (campo de configuración + seed
  con un valor del día). Automatización vía API BCV = fase 2 (§35.8).
- Pros: no dependemos de un scraping/endpoint frágil para la demo.

### Redondeo
- **Propuesta:** calcular en USD con 2 decimales; convertir a Bs y redondear a 2 decimales al final
  (después de IVA). Documentar la regla única para que POS, documentos y reportes coincidan.

### Orden de cálculo (único, para todo el sistema)
```text
Subtotal (USD)
- Descuento
= Base imponible
+ IVA 16% (sobre base imponible)
= Total (USD)
Total (Bs) = Total (USD) x rateUsed
```

### Tasa especial: límites
- **Propuesta:** la tasa especial requiere quedar dentro de un rango configurable respecto a la BCV
  (ej. ±X%); fuera de rango ⇒ aprobación OWNER/ADMIN + AuditLog (§30 "Cambio de tasa").

## Implicaciones

1. Cada documento persiste `rateUsed`, `currencyBase = USD`, montos USD y Bs.
2. Existe `ExchangeRateSnapshot` (§31) con la tasa del día y su vigencia (vence a medianoche).
3. Helper único `getActiveRate()` + `assertRateValid()` (bloquea si vencida sin autorización).
4. POS y documentos consumen el mismo helper de cálculo (un solo lugar para subtotal/IVA/total).
5. AuditLog en: cambio de tasa, uso de tasa especial, venta con tasa vencida autorizada.

## Decisiones derivadas por marcar
- [ ] ¿Rango permitido para tasa especial sin aprobación? (propongo ±3%).
- [ ] ¿IVA configurable por empresa o fijo 16%? (propongo fijo 16% en MVP, configurable fase 2).
- [ ] ¿Productos exentos de IVA en MVP? (propongo: flag `ivaExento` por CompanyProduct, default false).
