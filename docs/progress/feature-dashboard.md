# Progreso — feature/dashboard

## Estado

Definición lista. Implementación pendiente (owner: Salem/Codex-Salem).

## Qué se hizo

- Checklist de implementación accionable: `docs/checklists/feature-dashboard.md`.
- Contrato de data tipado `DashboardData` + loader `getDashboardData(companyId, range)` para
  construir la UI con mock y reemplazar por data real luego (no bloquea a Salem).
- Criterios de aceptación, casos borde y alcance MVP propuesto (8 tarjetas + bloque ROI +
  gráfico protagonista + filtros empresa/rango/moneda).

## Archivos tocados

- docs/checklists/feature-dashboard.md (Claude-Greeg)

## Qué falta

- Acordar el tipo `DashboardData` y el loader mock (Claude-Greeg + Codex-Salem).
- Preparar mock seed derivado de matrices 2024 (Claude-Greeg) — requiere acceso a los Excel o cifras de referencia.
- Montar layout del dashboard contra el mock (Codex-Salem).
- Conectar selector de empresa cuando exista (feature/company-selector).

## Dependencias

- feature/company-selector (filtro por empresa activa).
- feature/ui-system (tarjetas KPI, charts).
- Data real de módulos = fase posterior; hasta entonces, mock.

## Errores conocidos

- (ninguno; aún sin implementación)

## Siguiente paso

- Congelar alcance MVP con Greeg ⇒ fijar `DashboardData` ⇒ Claude-Greeg arma mock 2024 ⇒ Codex-Salem construye UI.
