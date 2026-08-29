# Evidencia del escaneo con Trivy

## Primer escaneo

```text
api-tareas-devsecops:1.0.0 (alpine 3.24.1)
Total: 20 (LOW: 12, MEDIUM: 6, HIGH: 2, CRITICAL: 0)

Node.js (node-pkg)
Total: 9 (LOW: 0, MEDIUM: 5, HIGH: 4, CRITICAL: 0)
```

El primer análisis encontró 29 vulnerabilidades en total: 6 HIGH y 0 CRITICAL.

## Corrección aplicada

- Actualización de los paquetes de Alpine mediante `apk upgrade --no-cache`.
- Eliminación de npm, Corepack y Yarn de la imagen final, ya que la API solo necesita el ejecutable de Node.js.
- Reconstrucción completa de la imagen con la opción `--no-cache`.

## Segundo escaneo

```text
Report Summary

api-tareas-devsecops:1.0.0 (alpine 3.24.1) | alpine  | 0 vulnerabilidades
app/package.json                           | node-pkg | 0 vulnerabilidades

Clean (no security findings detected)
```

Resultado final: 0 vulnerabilidades HIGH y 0 CRITICAL.
