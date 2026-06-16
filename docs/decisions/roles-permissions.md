# Decisión técnica — Matriz de permisos por rol

> Estado: **PROPUESTA** — requiere visto bueno de Greeg.
> Fuente única de verdad para los checks de permiso. Desbloquea `feature/auth-roles`.
> Unifica los "quién puede" dispersos en: planning §11/§19/§20/§22/§24/§26/§30 y las decisiones
> `security-passwords.md`, `inventory-rules.md`, `currency-tax-rate.md`, `payments-cash.md`,
> `documents-correlativos.md`, `cylinder-rules.md`, `company-scope.md`.

## Roles (planning §11)

```text
OWNER · ADMIN · AUDITOR · CAJERO · VENDEDOR · ALMACEN · COMPRAS · TECNICO_RECARGA · DISTRIBUIDOR
```

Intención de cada rol:

- **OWNER** — control total, incluye configuración, finanzas y todas las aprobaciones.
- **ADMIN** — operación completa + aprobaciones + gestión de usuarios (no necesariamente config crítica).
- **AUDITOR** — **solo lectura** amplia; nunca opera ni ve contraseñas.
- **CAJERO** — caja, pagos, cobros, POS (vender/cobrar).
- **VENDEDOR** — cotizaciones, POS, clientes; **sin ver costo/margen**.
- **ALMACEN** — inventario, movimientos, despacho (nota de entrega), cilindros físicos.
- **COMPRAS** — órdenes de compra, proveedores, recepción, registro de cuentas por pagar.
- **TECNICO_RECARGA** — cilindros y recargas (operativo).
- **DISTRIBUIDOR** — portal acotado a lo propio (sus pedidos/documentos/cilindros). Mayormente fase 2.

## Leyenda

| Símbolo | Significado |
|---|---|
| ✅ | Puede ejecutar |
| 🟡 | Puede solicitar, **requiere aprobación** OWNER/ADMIN |
| 🔑 | **Aprueba / autoriza** la acción de otros |
| 👁️ | Solo lectura |
| ❌ | Sin acceso |

## Matriz por dominio

### Usuarios, roles y seguridad
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Crear/editar usuarios | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cambiar permisos/rol | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Ver contraseñas** (§sec) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Resetear contraseña | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Configuración base | ✅ | 🟡 | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Empresa / multiempresa (company-scope)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Ver selector de empresa | ✅ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vista consolidada | ✅ | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

\* AUDITOR ve selector solo si tiene acceso a más de una empresa, en modo lectura.

### Productos, costos e inventario (inventory-rules)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Ver productos/stock | ✅ | ✅ | 👁️ | ✅ | ✅ | ✅ | ✅ | ✅ | 👁️ |
| **Ver costo/margen** (§20.7) | ✅ | ✅ | 👁️ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Editar precio | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Editar costo | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Movimientos de inventario | ✅ | ✅ | 👁️ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Ajuste de stock** (req. motivo) | 🔑 | 🔑 | 👁️ | ❌ | ❌ | 🟡 | ❌ | ❌ | ❌ |

### Cotizaciones, notas de entrega, POS y ventas (§19/§20)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Crear cotización | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | 🟡 |
| Aprobar/rechazar cotización | 🔑 | 🔑 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Convertir cotización→NE** (§19.7) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Crear nota de entrega / despacho | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Anular nota de entrega** (§19.8) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vender en POS | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Descuento ≤ 50%** (§20.8/9) | 🔑 | 🔑 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ |
| **Venta sin stock** (inv-rules) | 🔑 | 🔑 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Devolución / anulación de venta | 🔑 | 🔑 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ |

### Caja y pagos (payments-cash)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Registrar pago | ✅ | ✅ | ❌ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Registrar pago **sin comprobante** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Verificar pago** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Apertura/cierre de caja | ✅ | ✅ | 👁️ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ver cuentas por cobrar | ✅ | ✅ | 👁️ | ✅ | 👁️ | ❌ | ❌ | ❌ | 👁️* |
| **NE con pago pendiente** (§22.7) | 🔑 | 🔑 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ |

\* DISTRIBUIDOR solo ve sus propias cuentas.

### Compras y cuentas por pagar (§24/§25)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Crear orden de compra | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Recepción de compra | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Ver cuentas por pagar (§24.8) | ✅ | ✅ | 👁️ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Registrar abono a pagar | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

### Cilindros y recargas (cylinder-rules)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Operar movimientos de cilindros | ✅ | ✅ | 👁️ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Registrar recarga | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| **Convertir cilindro cliente→propio** | 🔑 | 🔑 | ❌ | ❌ | ❌ | 🟡 | ❌ | 🟡 | ❌ |

### Moneda / tasa (currency-tax-rate)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Ver/usar **tasa especial** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cambiar tasa BCV del día | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Vender con tasa vencida** (§26.6) | 🔑 | 🔑 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ |

### Reportes, ROI e importaciones (§28/§29/§26)
| Capacidad | OWNER | ADMIN | AUDITOR | CAJERO | VENDEDOR | ALMACEN | COMPRAS | TEC_REC | DISTRIB |
|---|---|---|---|---|---|---|---|---|---|
| Ver dashboard ejecutivo + ROI | ✅ | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ver reportes | ✅ | ✅ | 👁️ | 👁️* | 👁️* | 👁️* | 👁️* | ❌ | ❌ |
| Ejecutar importación | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Revertir importación** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

\* Reportes acotados a su área/empresa, no los financieros ejecutivos.

## Acciones que SIEMPRE generan AuditLog (§30)

Cualquier celda 🔑/🟡 al ejecutarse, más: login, ver contraseña, cambio de precio/costo, ajuste de
stock, anulación, devolución, descuento aprobado, venta sin stock aprobada, cambio de tasa, registro
y verificación de pago, importación/reversión, conversión de cilindro, alta/edición de usuario,
cambio de permisos.

## Implicaciones para `feature/auth-roles`

1. Definir un enum `Role` y un mapa de capacidades (ej. `can(role, capability, context)`).
2. Las celdas 🟡 implican un flujo de **solicitud de aprobación** (estado pendiente → aprobado por 🔑).
3. `lib/permissions/` debe exponer un helper único que todos los módulos consuman (no checks ad-hoc).
4. El check de empresa (`assertCompanyAccess`) es **independiente** del check de rol: ambos aplican.
5. AUDITOR = lectura global; modelar como flag transversal, no permiso por permiso.

## Decisiones por marcar (confirmar con Greeg)
- [ ] ¿ADMIN puede tocar **configuración crítica** (tasas base, plantillas, secuencias) o solo OWNER? (propongo: config crítica solo OWNER; ADMIN operativa).
- [ ] ¿VENDEDOR puede crear cliente nuevo o solo seleccionarlo? (propongo: crear sí, editar datos sensibles no).
- [ ] ¿COMPRAS ve costo de **todos** los productos o solo de los que compra? (propongo: todos, dentro de su empresa).
- [ ] ¿DISTRIBUIDOR entra al MVP del viernes o se posterga a fase 2? (planning lo trata como fase 2 §35.1; propongo dejar el rol definido pero el portal en fase 2).
- [ ] ¿Quién aprueba cuando el aprobador (OWNER/ADMIN) es quien origina la acción? (propongo: auto-aprobación con AuditLog, sin doble paso).
