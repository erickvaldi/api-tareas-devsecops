# Informe de entrega - Tarea Unidad IV

**Estudiante:** Erick Guillermo Valdiviezo Buezo  
**Aplicación:** API Tareas DevSecOps  
**Versión:** 1.0.0

## Enlaces de entrega

- Repositorio público: https://github.com/erickvaldi/api-tareas-devsecops
- Imagen en Docker Hub: `[AGREGAR URL DE DOCKER HUB]`
- Análisis de SonarCloud, si se utilizó: `[AGREGAR URL O INDICAR CAPTURA]`

## Resultado de Sonar

Completar después de ejecutar el análisis:

- Bugs encontrados: `[PENDIENTE]`
- Vulnerabilidades encontradas: `[PENDIENTE]`
- Code smells encontrados: `[PENDIENTE]`
- Estado de la compuerta de calidad: `[PENDIENTE]`
- Hallazgos corregidos o justificación si no existieron: `[PENDIENTE]`

## Resultado de Trivy

Completar después de escanear la imagen final:

- Imagen analizada: `TU_USUARIO/api-tareas-devsecops:1.0.0`
- Vulnerabilidades CRITICAL: `[PENDIENTE]`
- Vulnerabilidades HIGH: `[PENDIENTE]`
- Corrección aplicada o justificación: `[PENDIENTE]`

## Decisión técnica explicada

Las tareas se almacenan en memoria porque el objetivo de la actividad es practicar calidad, contenedores y seguridad. Agregar una base de datos aumentaría la complejidad sin aportar una funcionalidad obligatoria. La información se reinicia al detener la aplicación, lo cual se documenta como una limitación consciente del proyecto.

## Reflexión final

Durante el desarrollo, el primer reto fue organizar la API sin agregar complejidad innecesaria.  
Se separaron las rutas, el almacenamiento y las funciones HTTP para que el código fuera fácil de comprender.  
Las pruebas permitieron comprobar que las operaciones principales funcionaban antes de crear la imagen.  
El análisis de Sonar mostró `[COMPLETAR RESULTADO Y CORRECCIÓN]`.  
Trivy permitió identificar `[COMPLETAR RESULTADO]` en la imagen utilizada.  
Aprendí que publicar una aplicación no consiste únicamente en que funcione, sino también en revisar su calidad y seguridad.  
El flujo DevSecOps ayuda a detectar problemas antes de que una aplicación llegue a producción.
