# Decisión técnica — Contraseñas visibles

## Decisión

Dueño y administrador podrán ver las contraseñas actuales de los usuarios.

## Riesgo

Esto implica guardar contraseñas de forma visible o reversible, lo cual no es una práctica segura.

## Riesgo aceptado

El riesgo queda aceptado por decisión operativa del proyecto.

## Restricciones mínimas

1. Solo OWNER y ADMIN pueden ver contraseñas.
2. Cada visualización debe generar un AuditLog.
3. AUDITOR no puede ver contraseñas.
4. DISTRIBUIDOR no puede ver contraseñas de otros usuarios.
5. Debe existir opción de resetear contraseña.
6. Al crear usuario, se debe mostrar una contraseña temporal.

## Recomendación futura

Migrar a contraseñas con hash seguro y permitir solo reset/generación temporal.
