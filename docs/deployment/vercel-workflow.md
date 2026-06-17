# Vercel Workflow

Este documento define como se publicara SumiControl en Vercel y que puede hacer cada sesion sin pisar configuracion sensible.

## Cuenta objetivo

Panel indicado por Greeg:

```text
https://vercel.com/pantera95s-projects
```

## Objetivo

- Tener un flujo simple para previews y produccion.
- Evitar que varias sesiones cambien configuraciones sensibles al mismo tiempo.
- Dejar claro como desplegar aunque una sesion no haya creado el proyecto original.

## Ownership de Vercel

- `Greeg`: owner de Vercel, proyecto, variables de entorno y dominio.
- `Codex-Greeg`: puede preparar el repo para deploy y ejecutar despliegues cuando la sesion este autenticada.
- `Salem` y `Codex-Salem`: pueden modificar codigo que se desplegara, pero no deben cambiar configuracion de Vercel sin avisar.
- `Claude-Greeg`: puede documentar el flujo, revisar readiness de deploy y registrar pendientes.

## Regla clave

La configuracion sensible de Vercel no se toca en paralelo.

Eso incluye:

- variables de entorno
- proyecto enlazado
- dominio
- comandos de build en panel
- ajustes de produccion

## Flujo recomendado por ramas

```text
feature/* -> preview opcional
dev       -> staging compartido
main      -> produccion
```

## Politica de despliegue

- `feature/*`: deploy de prueba si hace falta validar algo puntual.
- `dev`: deploy compartido para validar integracion entre sesiones.
- `main`: solo deploy cuando Greeg lo apruebe como corte estable.

## Comandos base

Primera vinculacion local al proyecto:

```bash
vercel link
```

Traer variables del entorno remoto a local:

```bash
vercel env pull .env.local
```

Deploy preview:

```bash
vercel
```

Deploy de produccion:

```bash
vercel --prod
```

## Variables de entorno esperadas

Minimas para esta fase:

```text
DATABASE_URL
AUTH_SESSION_NAME
```

Futuras:

```text
NEXT_PUBLIC_APP_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Checklist antes de deploy

1. Estar en la rama correcta.
2. Confirmar que no hay cambios locales accidentales.
3. Correr `npm run lint`.
4. Correr `npm run build`.
5. Revisar si hay cambios en auth, schema o variables de entorno.
6. Actualizar `docs/progress` del modulo afectado.

## Checklist despues de deploy

1. Guardar URL del preview o produccion.
2. Registrar el resultado en `docs/progress` del modulo.
3. Si se tocaron env vars, documentarlo.
4. Si el deploy fallo, registrar la causa real y el siguiente paso.

## Lo que deben hacer las otras sesiones

- trabajar normalmente sobre codigo y ramas
- no tocar configuracion del proyecto en Vercel sin coordinacion
- pedir deploy de `dev` cuando necesiten validar integracion real
- usar previews de feature solo si aportan a una revision concreta

## Bloqueo actual

En esta sesion el repo queda preparado para deploy, pero la vinculacion efectiva al proyecto de Vercel depende de una sesion autenticada y enlazada a la cuenta/panel correcto.

## Siguiente paso operativo

Cuando una sesion tenga acceso confirmado a Vercel:

1. ejecutar `vercel link`
2. enlazar este repo al proyecto correcto dentro de `pantera95s-projects`
3. ejecutar `vercel env pull .env.local`
4. registrar el nombre exacto del proyecto y el flujo final aqui mismo
