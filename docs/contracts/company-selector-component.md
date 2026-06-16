# Contrato de componente — Selector de empresa

> Preparado por Claude-Greeg. Contrato entre `feature/ui-system` (Salem/Codex-Salem) y
> `feature/company-selector` (Greeg/Codex-Greeg).
> Objetivo: que Salem construya el componente en `components/layout/*` y Greeg lo consuma sin que
> ninguno toque el archivo del otro.
> Base: `docs/decisions/company-scope.md` (Opción A) y `docs/checklists/feature-company-selector.md`.

## Reparto de responsabilidad

| Parte | Dueño | Dónde vive |
|------|-------|-----------|
| Componente **presentacional** (UI, estados, accesibilidad) | Salem / Codex-Salem | `components/layout/CompanySelector.tsx` |
| **Datos + handler** (qué empresas, cuál activa, fijar empresa) | Greeg / Codex-Greeg | `lib/` (server) + página que lo renderiza |

El componente es **tonto/controlado**: no decide acceso ni hace fetch; recibe props y emite eventos.
La seguridad (validar acceso a la empresa) vive en el server de Greeg, nunca en este componente
(coherente con `company-scope.md`: el `companyId` no se confía al cliente para filtrar datos).

## Props (contrato estable)

```ts
type CompanyOption = {
  id: string;
  name: string;        // "Sumigases", "Sudematin"
  slug: string;        // "sumigases"
};

type CompanySelectorProps = {
  companies: CompanyOption[];        // empresas a las que el usuario tiene acceso
  activeCompanyId: string | null;    // null = vista consolidada activa
  canSeeConsolidated: boolean;       // true solo OWNER/ADMIN
  onChange: (companyId: string | null) => void; // null = elegir "Consolidado"
  isChanging?: boolean;              // true mientras Greeg procesa el cambio (loading)
  disabled?: boolean;                // bloquea interacción
};
```

Reglas derivadas de las props (las implementa el componente):

- Si `companies.length <= 1` **y** `!canSeeConsolidated` ⇒ el componente se renderiza como
  **etiqueta estática** (nombre de la empresa), sin dropdown.
- La opción **"Consolidado"** aparece en la lista **solo si `canSeeConsolidated === true`**.
- `activeCompanyId === null` ⇒ el control muestra "Consolidado" como seleccionado.
- Al elegir una opción, llama `onChange(id)` (o `onChange(null)` para consolidado). El componente
  **no muta estado propio** de empresa activa; espera a que el padre actualice `activeCompanyId`.

## Estados visuales que el componente debe cubrir

- **Normal:** muestra empresa activa + chevron; abre lista al click/teclado.
- **Cambiando (`isChanging`):** spinner/indicador; opciones deshabilitadas; no dispara más `onChange`.
- **Deshabilitado (`disabled`):** sin interacción, atenuado.
- **Mono-empresa:** etiqueta estática (sin dropdown).
- **Consolidado seleccionado:** distinguible visualmente (ej. icono o badge "Todas").

## Accesibilidad / UX

- Operable por teclado (abrir, navegar con flechas, Enter/Escape).
- `aria-label` claro (ej. "Empresa activa") y `role` adecuado de menú/listbox.
- Foco visible; la opción activa marcada (`aria-selected`).
- Sin layout shift al abrir; el header no debe "saltar".
- Responsive desktop/tablet (alineado con responsabilidades de §13/UI).

## Cómo lo consume Greeg (referencia, no lo implementa Salem)

```tsx
// página/layout admin (lado Greeg)
const session = await getSession();
<CompanySelector
  companies={session.companies}
  activeCompanyId={session.activeCompanyId}
  canSeeConsolidated={session.role === "OWNER" || session.role === "ADMIN"}
  isChanging={pending}
  onChange={(companyId) => {
    // POST server-side que valida acceso y fija la empresa activa, luego refresca datos
    setActiveCompany(companyId);
  }}
/>
```

- Greeg expone `companies` y `activeCompanyId` desde la sesión (depende de `feature/auth-roles`).
- El `onChange` dispara el endpoint que **valida `companyId ∈ companies`** y refresca la data.
- Tras el cambio, los datos del módulo actual deben recargarse (server action / router refresh).

## Casos borde que el contrato cubre

- `companies` vacío ⇒ el componente muestra estado vacío legible ("Sin empresa asignada"),
  no se rompe. (Greeg debería evitar este caso en login, pero el componente lo tolera.)
- `activeCompanyId` no está en `companies` (empresa desactivada) ⇒ el componente muestra placeholder
  "Selecciona empresa" y deja elegir; Greeg corrige el estado en server.
- Click repetido en la empresa ya activa ⇒ el componente no dispara `onChange` (evita refetch inútil).
- `isChanging` activo ⇒ ignora nuevos clicks hasta que el padre actualice props.

## Checklist de aceptación del componente

- [ ] OWNER ve dropdown con ambas empresas + "Consolidado".
- [ ] VENDEDOR mono-empresa ve etiqueta estática, sin dropdown.
- [ ] Elegir empresa llama `onChange(id)`; elegir consolidado llama `onChange(null)`.
- [ ] `isChanging` muestra loading y bloquea interacción.
- [ ] Navegable 100% por teclado y con `aria-*` correctos.
- [ ] No hay fetch ni lógica de permisos dentro del componente.

## Acuerdo pendiente (marcar antes de codear)
- [ ] ¿El selector vive en el **header** o en el **sidebar**? (propongo header, junto al usuario).
- [ ] ¿"Consolidado" entra al MVP del viernes o se muestra deshabilitado? (alineado con `company-scope.md`).
- [ ] Nombre/ubicación final del archivo del componente (propongo `components/layout/CompanySelector.tsx`).
