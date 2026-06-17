# SumiControl

SumiControl es una plataforma SaaS interna para Sumigases Oriente C.A. y Sudematin. Este repositorio arranca con el planning funcional y tecnico del proyecto para organizar el desarrollo de la primera demo operativa.

## Documentacion base

- Planning general: [PLANNING.md](./PLANNING.md)
- Planning detallado: [docs/planning/sumicontrol-planning.md](./docs/planning/sumicontrol-planning.md)
- Plan de colaboracion: [docs/collaboration-plan.md](./docs/collaboration-plan.md)
- Prompts de arranque: [docs/prompts](./docs/prompts)
- Deploy Vercel: [docs/deployment/vercel-workflow.md](./docs/deployment/vercel-workflow.md)
- Avisos y handoff: [docs/communication/update-protocol.md](./docs/communication/update-protocol.md)
- Decisiones clave: [docs/decisions](./docs/decisions)
- Seguimiento por modulo: [docs/progress](./docs/progress)
- Prompt maestro de coordinacion: [docs/prompts/master-agent-prompt.md](./docs/prompts/master-agent-prompt.md)

## Stack confirmado

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL / Supabase
- Supabase Storage
- Vercel
- Login propio con usuario y contrasena

## Flujo de trabajo

No trabajar directo sobre `main`.

```text
feature/* -> dev -> main
```

Cada modulo debe mantener actualizado su archivo en `docs/progress`.
