# Informe de entrega - Tarea Unidad IV

**Estudiante:** Erick Guillermo Valdiviezo Buezo  
**Aplicación:** API Tareas DevSecOps  
**Versión:** 1.0.0

## Enlaces de entrega

- Repositorio público: https://github.com/erickvaldi/api-tareas-devsecops
- Imagen en Docker Hub: https://hub.docker.com/r/ekvaldi/api-tareas-devsecops
- Análisis de SonarQube Cloud: proyecto público `api-tareas-devsecops` en la organización `erickvaldi`.

## Resultado de Sonar

- Código analizado: 297 líneas en la rama `main`.
- Bugs o problemas de confiabilidad: 0, calificación A.
- Vulnerabilidades o problemas de seguridad: 0, calificación A.
- Code smells o problemas de mantenibilidad: 0, calificación A.
- Puntos críticos de seguridad: 0.
- Duplicación: 0.0 %.
- Estado de la compuerta de calidad: `Passed`.
- Hallazgos corregidos: no aplicó. SonarQube Cloud no reportó hallazgos relevantes, por lo que se documentó el resultado real según lo permitido por la actividad.

## Resultado de Trivy

- Imagen analizada: `ekvaldi/api-tareas-devsecops:1.0.0`
- Primer escaneo: 29 vulnerabilidades, de las cuales 6 eran HIGH y 0 CRITICAL.
- Escaneo final: 0 vulnerabilidades HIGH y 0 CRITICAL; el reporte quedó limpio.
- Corrección aplicada: se actualizaron los paquetes de Alpine con `apk upgrade --no-cache` y se retiraron npm, Corepack y Yarn de la imagen final porque no son necesarios para ejecutar la API.
- Digest publicado: `sha256:72682e4ee90a9150f642bacb3895bd1fba58833d7ab17dd46355b3e317f893a1`.

## Decisión técnica explicada

Las tareas se almacenan en memoria porque el objetivo de la actividad es practicar calidad, contenedores y seguridad. Agregar una base de datos aumentaría la complejidad sin aportar una funcionalidad obligatoria. La información se reinicia al detener la aplicación, lo cual se documenta como una limitación consciente del proyecto.

## Reflexión final

Durante el desarrollo, el primer reto fue organizar la API sin agregar complejidad innecesaria.  
Se separaron las rutas, el almacenamiento y las funciones HTTP para que el código fuera fácil de comprender.  
Las pruebas permitieron comprobar que las operaciones principales funcionaban antes de crear la imagen.  
SonarQube Cloud no encontró hallazgos relevantes y el proyecto superó la compuerta de calidad.  
Trivy detectó seis vulnerabilidades HIGH y permitió comprobar que la imagen corregida quedó sin vulnerabilidades.  
Aprendí que publicar una aplicación no consiste únicamente en que funcione, sino también en revisar su calidad y seguridad.  
El flujo DevSecOps ayuda a detectar problemas antes de que una aplicación llegue a producción.
