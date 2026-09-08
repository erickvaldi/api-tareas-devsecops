# Guía paso a paso - Actividad 5 con JMeter

## 1. Archivos preparados

Dentro de la carpeta `jmeter` se encuentran:

- `Actividad5_PruebasJMeter.jmx`: plan completo con siete pruebas funcionales y tres escenarios de carga.
- `datos-tareas.csv`: diez registros para parametrizar el título y el estado de las tareas.

Mantenga ambos archivos dentro de la misma carpeta para que JMeter encuentre el CSV.

## 2. Comprobar que la API esté funcionando

1. Abra Docker Desktop y espere hasta que indique **Engine running**.
2. Abra CMD.
3. Ejecute:

```bat
docker run -d --name api-tareas-jmeter --rm -p 8080:8080 ekvaldi/api-tareas-devsecops:1.0.0
```

4. Compruebe la API:

```bat
curl http://localhost:8080/health
```

La respuesta esperada es:

```json
{"status":"ok"}
```

Si Docker indica que el nombre ya está ocupado, ejecute primero:

```bat
docker stop api-tareas-jmeter
```

Luego repita el comando `docker run`.

## 3. Instalar y abrir Apache JMeter

JMeter necesita Java. Primero escriba en CMD:

```bat
java -version
```

Si aparece una versión de Java, continúe. Si Windows indica que no reconoce el comando, puede instalar Java 17 con:

```bat
winget install EclipseAdoptium.Temurin.17.JDK
```

Después cierre y vuelva a abrir CMD, y repita `java -version`.

1. Entre a <https://jmeter.apache.org/download_jmeter.cgi>.
2. En **Binaries**, descargue el archivo ZIP de Apache JMeter 5.6.3.
3. Descomprímalo en una ruta corta y sin espacios, por ejemplo `C:\jmeter`.
4. Abra la carpeta descomprimida y entre en `bin`.
5. Haga doble clic en `jmeter.bat`.

La guía oficial de inicio está disponible en <https://jmeter.apache.org/usermanual/get-started.html>.

## 4. Abrir el Test Plan

1. Copie la carpeta `jmeter` del proyecto a una ubicación fácil, por ejemplo `C:\actividad5-jmeter`.
2. En JMeter seleccione **File > Open**.
3. Abra `Actividad5_PruebasJMeter.jmx`.
4. Confirme que el archivo `datos-tareas.csv` esté junto al `.jmx`.

Al abrirlo verá cuatro grupos:

1. `01 - PRUEBAS FUNCIONALES F01-F07`.
2. `02 - CARGA LIGERA - 5 usuarios, 10 s, 60 s`.
3. `03 - CARGA MEDIA - 20 usuarios, 20 s, 120 s`.
4. `04 - CARGA ALTA - 50 usuarios, 30 s, 120 s`.

El grupo funcional aparecerá habilitado. Los tres grupos de carga estarán deshabilitados para evitar ejecutarlos accidentalmente al mismo tiempo.

## 5. Pruebas funcionales

El grupo funcional realiza este flujo:

| Caso | Petición | Validación implementada |
|---|---|---|
| F01 | `POST /tasks` | HTTP 201, respuesta JSON, ID generado y título correcto. |
| F02 | `GET /tasks` | HTTP 200 y búsqueda de la tarea mediante el ID extraído. |
| F03 | `PUT /tasks/${taskId}` | HTTP 200, título actualizado y `completed=true`. |
| F04 | `GET /tasks` | HTTP 200, lista JSON válida y cambios persistidos. |
| F05 | `DELETE /tasks/${taskId}` | HTTP 200 e ID eliminado correcto. |
| F06 | `GET /tasks/999999999` | HTTP 404 y mensaje de error controlado. |
| F07 | `POST /tasks` sin `title` | HTTP 400 y validación del título obligatorio. |

### Cómo ejecutarlas

1. Seleccione `EVIDENCIA - Ver arbol de resultados`.
2. Presione el botón de escoba para limpiar resultados anteriores.
3. Presione el triángulo verde **Start**.
4. Espere unos segundos.
5. Todos los casos F01-F07 deben aparecer en verde.

F06 y F07 son pruebas negativas. Se consideran exitosas cuando la API rechaza correctamente la solicitud con HTTP 404 y HTTP 400, respectivamente.

### Capturas necesarias

- Capture el árbol completo de la izquierda con F01-F07, el extractor y las aserciones.
- Capture `EVIDENCIA - Ver arbol de resultados` con los siete casos en verde.
- Seleccione F07, abra **Response data** y capture el mensaje `El título es obligatorio.`.

## 6. Pruebas de carga

Los escenarios consultan `GET /tasks`, validan HTTP 200 y comprueban que la respuesta sea una lista JSON. Se agregó una pausa de un segundo para representar actividad continua sin saturar arbitrariamente la computadora.

Ejecute únicamente un grupo a la vez.

### Carga ligera

1. Clic derecho sobre `01 - PRUEBAS FUNCIONALES F01-F07` y seleccione **Toggle** para deshabilitarlo.
2. Clic derecho sobre `02 - CARGA LIGERA...` y seleccione **Toggle** para habilitarlo.
3. Confirme que carga media y alta permanezcan deshabilitadas.
4. Limpie resultados con la escoba.
5. Presione **Start** y espere 60 segundos.
6. Abra el Summary Report y el Aggregate Report del grupo.
7. Tome una captura completa de cada reporte.

### Carga media

1. Deshabilite carga ligera.
2. Habilite `03 - CARGA MEDIA...`.
3. Limpie resultados.
4. Ejecute y espere 120 segundos.
5. Capture Summary Report y Aggregate Report.

### Carga alta

1. Deshabilite carga media.
2. Habilite `04 - CARGA ALTA...`.
3. Limpie resultados.
4. Ejecute y espere 120 segundos.
5. Capture Summary Report y Aggregate Report.

## 7. Métricas que debe copiar

Para cada escenario anote los valores que muestre JMeter:

| Escenario | Muestras | Average | Median | p90 | p95 | Min | Max | Throughput | Error % |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Ligera |  |  |  |  |  |  |  |  |  |
| Media |  |  |  |  |  |  |  |  |  |
| Alta |  |  |  |  |  |  |  |  |  |

No invente datos. Copie exactamente los valores de sus reportes.

Como criterio académico, se considerará satisfactorio un error menor al 1 % y un p95 menor a 1,000 ms.

## 8. Justificación del escenario

Se aceptaron los valores de 5, 20 y 50 usuarios sugeridos por la actividad porque permiten observar el comportamiento de la misma API en tres niveles de concurrencia. Se seleccionaron duraciones de 60, 120 y 120 segundos para obtener suficientes muestras sin alargar innecesariamente la práctica. También se añadió una pausa de un segundo entre solicitudes, ya que el objetivo es medir un incremento progresivo y no saturar arbitrariamente el equipo.

## 9. Evidencias recomendadas

Guarde las capturas con estos nombres fuera del repositorio:

1. `01-estructura-jmeter.png`
2. `02-pruebas-funcionales.png`
3. `03-prueba-negativa.png`
4. `04-carga-ligera-summary.png`
5. `05-carga-ligera-aggregate.png`
6. `06-carga-media-summary.png`
7. `07-carga-media-aggregate.png`
8. `08-carga-alta-summary.png`
9. `09-carga-alta-aggregate.png`

Al terminar, envíe estas capturas y la tabla de métricas para completar el reporte final en PDF.

## 10. Detener el ambiente

Cuando termine todas las pruebas, cierre JMeter y ejecute:

```bat
docker stop api-tareas-jmeter
```

