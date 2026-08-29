# Registro del uso de inteligencia artificial

La inteligencia artificial se utilizó como apoyo para estructurar, revisar y documentar el proyecto. Todo el código fue revisado y probado antes de incorporarlo.

## Prompt 1

**Prompt:** "Analiza la actividad de Trivy, Sonar y Docker y propón una aplicación pequeña en Node.js que sea fácil de explicar."

**Aporte:** Ayudó a elegir una API REST de tareas almacenadas en memoria, evitando agregar una base de datos innecesaria para el alcance de la actividad.

## Prompt 2

**Prompt:** "Ayúdame a crear una API REST sencilla de tareas en Node.js. Debe permitir crear, listar, actualizar y eliminar. Explícame la estructura del proyecto."

**Aporte:** Propuso separar el servidor, las rutas, el almacenamiento y las utilidades HTTP para que el código fuera más comprensible y mantenible.

## Prompt 3

**Prompt:** "Revisa la API y señala problemas de calidad que podría detectar Sonar. Explica primero los problemas antes de proponer cambios."

**Aporte:** Permitió revisar validaciones, duplicación, tamaño de funciones, manejo de errores y nombres de métodos antes del análisis formal.

## Prompt 4

**Prompt:** "Genera un Dockerfile sencillo y seguro para esta aplicación y explica cada instrucción."

**Aporte:** Ayudó a utilizar una imagen Alpine, copiar únicamente los archivos necesarios, ejecutar con el usuario `node` y agregar una comprobación de salud.

## Prompt 5

**Prompt:** "Revisa el README y confirma si otra persona podría ejecutar la aplicación siguiendo únicamente sus instrucciones."

**Aporte:** Ayudó a ordenar los requisitos, comandos, rutas disponibles y pasos para Sonar, Docker, Trivy y Docker Hub.

## Validación realizada por el estudiante

- Se leyó y comprendió cada archivo generado.
- Se ejecutaron las pruebas automáticas.
- Se comprobó manualmente el funcionamiento de los endpoints.
- Las evidencias de Sonar y Trivy corresponden al proyecto y a la imagen entregados.
