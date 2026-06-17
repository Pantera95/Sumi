# Update Protocol

Este documento define como avisarle al resto del equipo que hubo cambios sin depender de memoria o mensajes largos.

## Regla simple

Cada vez que una sesion haga un cambio relevante, debe hacer 3 cosas:

1. actualizar `docs/progress/feature-*.md`
2. dejar un aviso corto en el chat del equipo o donde se coordinen
3. si hay handoff, dejar tambien el siguiente paso y el bloqueo

## Cuando avisar

Debes avisar cuando ocurra cualquiera de estas cosas:

- se crea una rama nueva
- se toca un archivo con candado
- se termina un bloque funcional
- se cambia una decision tecnica
- se hace merge a `dev`
- se hace deploy a Vercel
- se detecta un bloqueo que afecta a otra sesion

## Formato minimo del aviso

Todo aviso debe incluir:

- modulo o rama
- que se hizo
- archivos o zonas afectadas
- siguiente paso
- bloqueo, si existe

## Canal recomendado

Usen siempre el mismo formato aunque sea por WhatsApp, Telegram, Slack o un chat interno. Lo importante no es la herramienta, sino la consistencia.

## Regla para archivos con candado

Si tocas uno de estos, debes avisarlo antes y despues:

- `prisma/schema.prisma`
- `app/layout.tsx`
- `app/globals.css`
- `components/ui/*`
- `components/layout/*`
- `lib/auth/*`
- `lib/permissions/*`
- `package.json`

## Regla para deploy

Si alguien despliega algo, el aviso debe incluir:

- rama desplegada
- tipo de deploy: preview, staging o produccion
- URL resultante
- si hubo cambio de env vars

## Regla para handoff

Si una sesion deja trabajo para otra, el mensaje debe responder:

- que ya esta hecho
- que falta exactamente
- que no debe tocar la otra sesion
- si hay riesgo o bloqueo

## Fuente de verdad

El mensaje en chat sirve para alertar rapido.

La fuente de verdad sigue siendo:

- `docs/progress/feature-*.md`
- `docs/decisions/*`
- `docs/deployment/vercel-workflow.md`

## Mensajes listos

Hay mensajes ya preparados para copiar y pegar en:

- `docs/communication/message-to-salem.txt`
- `docs/communication/message-to-claude-greeg.txt`
- `docs/communication/message-general-project-chat.txt`
- `docs/communication/reparto-orden-salem.txt`
- `docs/communication/reparto-orden-claude-greeg.txt`
- `docs/communication/reparto-orden-general.txt`
