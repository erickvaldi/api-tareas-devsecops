# Evidencia de Docker y funcionamiento

## Construcción

```text
docker build --no-cache -t api-tareas-devsecops:1.0.0 .
[+] Building 5.5s (11/11) FINISHED
naming to docker.io/library/api-tareas-devsecops:1.0.0
```

## Contenedor

```text
Imagen: api-tareas-devsecops:1.0.0
Nombre: api-tareas-contenedor
Estado: Up (healthy)
Puerto: 0.0.0.0:8080->8080/tcp
```

## Comprobación de salud

```text
curl http://localhost:8080/health
{"status":"ok"}
```

También se comprobaron correctamente las operaciones de crear, listar, actualizar y eliminar tareas.
