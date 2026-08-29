# API Tareas DevSecOps

API REST sencilla desarrollada en Node.js para administrar una lista de tareas. El proyecto forma parte de la actividad de la Unidad IV del curso Diseño e Implementación del Software y permite practicar un flujo básico con Sonar, Docker, Trivy y Docker Hub.

## Funcionalidades

- Crear una tarea.
- Listar todas las tareas.
- Actualizar el título o estado de una tarea.
- Eliminar una tarea.
- Consultar el estado de salud de la API.

Las tareas se guardan en memoria. Por eso, se eliminan al detener la aplicación. Esta decisión mantiene el proyecto pequeño y fácil de explicar.

## Requisitos

- Node.js 20 o superior.
- Docker Desktop para crear y ejecutar la imagen.
- Trivy para analizar la imagen.
- SonarQube o SonarCloud para analizar el código.

## Estructura del proyecto

```text
api-tareas-devsecops/
├── src/
│   ├── app.js          # Rutas y lógica de la API
│   ├── http-utils.js   # Lectura y respuesta de datos JSON
│   ├── server.js       # Inicio del servidor
│   └── task-store.js   # Almacenamiento de tareas en memoria
├── test/
│   └── app.test.js     # Pruebas automáticas
├── docs/               # Prompts, informe y guía de evidencias
├── evidencias/         # Capturas reales de las herramientas
├── Dockerfile
├── sonar-project.properties
└── package.json
```

## Ejecución local

1. Clonar el repositorio y entrar en la carpeta:

```bash
git clone https://github.com/erickvaldi/api-tareas-devsecops.git
cd api-tareas-devsecops
```

2. Ejecutar las pruebas. El proyecto utiliza únicamente funciones incluidas en Node.js, por lo que no necesita descargar paquetes:

```bash
npm test
```

3. Iniciar la API:

```bash
npm start
```

4. Abrir `http://localhost:8080/health`. La respuesta esperada es:

```json
{
  "status": "ok"
}
```

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/health` | Verifica que la API esté disponible. |
| `GET` | `/tasks` | Lista todas las tareas. |
| `POST` | `/tasks` | Crea una tarea. |
| `PUT` | `/tasks/:id` | Actualiza una tarea. |
| `DELETE` | `/tasks/:id` | Elimina una tarea. |

### Crear una tarea

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudiar la Unidad IV"}'
```

### Listar las tareas

```bash
curl http://localhost:8080/tasks
```

### Actualizar una tarea

```bash
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Eliminar una tarea

```bash
curl -X DELETE http://localhost:8080/tasks/1
```

## Análisis con Sonar

El archivo `sonar-project.properties` incluye la configuración básica del proyecto. Después de configurar SonarQube o SonarCloud, ejecutar el escáner correspondiente y revisar:

- Bugs.
- Vulnerabilidades.
- Code smells.
- Resultado de la compuerta de calidad.

La captura debe mostrar claramente el nombre **API Tareas DevSecOps**. Los resultados reales y las correcciones se registran en `docs/INFORME_ENTREGA.md`.

## Construcción y ejecución con Docker

```bash
docker build -t ekvaldi/api-tareas-devsecops:1.0.0 .
docker run --rm -p 8080:8080 ekvaldi/api-tareas-devsecops:1.0.0
```

Comprobar el contenedor en `http://localhost:8080/health`.

## Escaneo con Trivy

```bash
trivy image ekvaldi/api-tareas-devsecops:1.0.0
```

Si aparecen vulnerabilidades `HIGH` o `CRITICAL` corregibles, se debe actualizar la imagen base del `Dockerfile`, volver a construir la imagen y repetir el escaneo.

## Publicación en Docker Hub

```bash
docker login
docker push ekvaldi/api-tareas-devsecops:1.0.0
```

**URL pública de la imagen:** https://hub.docker.com/r/ekvaldi/api-tareas-devsecops

**Repositorio del código:** https://github.com/erickvaldi/api-tareas-devsecops

## Uso responsable de inteligencia artificial

Los cinco prompts utilizados, su aporte y la validación realizada se encuentran en [`docs/REGISTRO_IA.md`](docs/REGISTRO_IA.md).

## Evidencias y reflexión

- Guía de capturas: [`docs/GUIA_EVIDENCIAS.md`](docs/GUIA_EVIDENCIAS.md).
- Resultados y reflexión final: [`docs/INFORME_ENTREGA.md`](docs/INFORME_ENTREGA.md).
