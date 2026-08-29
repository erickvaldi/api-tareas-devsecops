# Guía para reunir las evidencias

No deben inventarse capturas ni resultados. Cada evidencia debe obtenerse al ejecutar el proyecto.

## Evidencia 1: aplicación local

1. Ejecutar `npm start`.
2. Abrir `http://localhost:8080/health`.
3. Guardar la captura como `evidencias/01-api-local.png`.

## Evidencia 2: pruebas

1. Ejecutar `npm test`.
2. Capturar el resultado con todas las pruebas aprobadas.
3. Guardar la captura como `evidencias/02-pruebas.png`.

## Evidencia 3: Sonar

1. Ejecutar el análisis de SonarQube o SonarCloud.
2. Mostrar el nombre **API Tareas DevSecOps** y el resultado del análisis.
3. Guardar la captura como `evidencias/03-sonar.png`.
4. Documentar los hallazgos en `docs/INFORME_ENTREGA.md`.

## Evidencia 4: Docker

1. Construir la imagen con `docker build -t ekvaldi/api-tareas-devsecops:1.0.0 .`.
2. Ejecutarla con `docker run --rm -p 8080:8080 ekvaldi/api-tareas-devsecops:1.0.0`.
3. Comprobar nuevamente `/health`.
4. Guardar la captura como `evidencias/04-docker.png`.

## Evidencia 5: Trivy

1. Ejecutar `trivy image ekvaldi/api-tareas-devsecops:1.0.0`.
2. Guardar una captura legible como `evidencias/05-trivy.png`.
3. Si se modifica la imagen base, volver a construir y escanear la misma etiqueta.

## Evidencia 6: Docker Hub

1. Publicar la etiqueta `1.0.0`.
2. Abrir el repositorio público en Docker Hub.
3. Guardar la captura como `evidencias/06-docker-hub.png`.
4. Copiar la URL pública en `README.md` y `docs/INFORME_ENTREGA.md`.
