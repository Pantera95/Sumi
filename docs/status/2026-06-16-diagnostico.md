# Diagnóstico de avance — 2026-06-16

> Autor: Claude-Greeg. Contraste del estado real del repo contra el planning de GitHub.
> Objetivo de entrega: **viernes 19** (faltan 3 días: mié 17, jue 18, vie 19).

## 1. El planning no cambió de alcance

Las adiciones recientes de Codex al planning (`PLANNING.md`, `docs/planning/...`,
`docs/collaboration-plan.md`) son **operativas**: workflow de Vercel + protocolo de comunicación.
No tocan módulos, prioridades, modelo de datos ni timeline. El planning funcional sigue vigente.

- `origin/dev` está 4 commits adelante de `origin/main` (colaboración + scaffold + prompts).
- Esas adiciones de Codex al planning **aún no están pusheadas** (viven en el árbol local).

## 2. Riesgo: el código real casi no está en GitHub

En `origin` solo hay 3 ramas: `main`, `dev`, `feature/auth-roles`. En `feature/auth-roles`
**solo están los docs de Claude-Greeg**; el código de auth de Codex (`prisma/`, `lib/auth/`,
`app/auth/`) sigue **local y sin commitear**.

- No existen ramas remotas `feature/ui-system`, `feature/dashboard`, `feature/company-selector`, etc.
- Implicación: el trabajo de UI/dashboard (Salem) no aparece en el remoto, y el código de auth
  podría perderse si pasa algo con el entorno local.

## 3. Estado por módulo vs. orden del planning

| # | Módulo | Planning | Estado real |
|---|---|---|---|
| 1 | auth-roles | Día 1 | 🟡 Base local (login/session/guards/schema), sin pushear, sin DB real, 2 riesgos ALTO (A1/A2) |
| 2 | company-selector | Día 1 | 🟡 Definición lista; bloqueado por A2 |
| 3 | ui-system | Día 1 | 🔴 Sin evidencia de inicio |
| 4 | dashboard | Día 2 | 🟡 Checklist + mock real 2024 listos; falta implementación |
| 5-6 | products / inventory | Día 2-3 | 🟡 Mock real listo (262 productos, ROI); sin código |
| 7+ | cilindros, POS, caja, etc. | Día 3-5 | ⚪ Solo decisiones/reglas documentadas |

## 4. Veredicto

Desbalance claro:

- ✅ **Definición / decisiones / data real: adelantados.** 6 commits doc en `feature/auth-roles`
  (checklists, 5 decisiones, matriz de permisos, contratos, mocks reales 2024).
- 🔴 **Implementación: atrasada para el viernes.** Cuellos de botella:
  1. No hay `app/admin` ni layout → bloquea dashboard, sidebar, selector y la cadena de Días 2-5.
  2. Sin `DATABASE_URL` → todo corre en modo demo (y el modo demo es inseguro, ver A1).
  3. Salem no aparece en el repo remoto → UI/dashboard no arrancó visiblemente.

## 5. Acciones concretas (priorizadas)

1. **Codex-Greeg:** commitear y pushear ya el código de auth (hoy solo local). Evita pérdida y lo hace visible.
2. **Greeg:** definir `DATABASE_URL` (Supabase). Sin esto no hay demo real y el login queda en modo demo inseguro.
3. **Salem:** crear `app/admin` + layout mínimo cuanto antes — destraba dashboard, selector y módulos siguientes.
4. **Greeg (decisiones, ya documentadas, esperan OK):** aprobar company-scope Opción A, atender A1/A2,
   confirmar mapa de landing por rol.

## 6. Referencias

- Review auth-roles (A1/A2): `docs/reviews/feature-auth-roles-review.md`
- Decisiones: `docs/decisions/` (company-scope, currency-tax-rate, payments-cash, documents-correlativos, roles-permissions)
- Checklists: `docs/checklists/` (company-selector, dashboard)
- Contratos: `docs/contracts/` (company-selector-component, post-login-redirect)
- Data real: `docs/data/` (dashboard-mock-2024, catalog-inventory-mock-2024)
