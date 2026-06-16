# Progreso — feature/company-selector

## Estado

Definición lista. Implementación pendiente (depende de auth-roles + decisión de scope).

## Qué se hizo

- Checklist de implementación accionable: `docs/checklists/feature-company-selector.md`.
- Decisión de scope multiempresa (propuesta Opción A): `docs/decisions/company-scope.md`.
- Contrato del componente del selector para Salem: `docs/contracts/company-selector-component.md`.
- Criterios de aceptación y casos borde redactados.

## Archivos tocados

- docs/checklists/feature-company-selector.md (Claude-Greeg)
- docs/decisions/company-scope.md (Claude-Greeg)
- docs/contracts/company-selector-component.md (Claude-Greeg)

## Qué falta

- Aprobar `company-scope.md` (Opción A) — bloqueante.
- Que auth-roles exponga en sesión `companies[]` + `activeCompanyId`.
- Implementar helpers `getActiveCompany()` / `assertCompanyAccess()` (Codex-Greeg).
- Componente `components/layout/CompanySelector.tsx` (Salem/Codex-Salem).

## Dependencias

- feature/auth-roles (sesión con empresas + empresa activa).
- feature/ui-system (componente en components/layout).
- Decisión company-scope aprobada.

## Errores conocidos

- (ninguno; aún sin implementación)

## Siguiente paso

- Greeg aprueba scope ⇒ Codex-Greeg implementa helpers + endpoint del selector ⇒ Salem monta el componente contra el contrato.
