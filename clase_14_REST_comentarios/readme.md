# Servicios REST Comentarios.

El presente ejercicio muestra dos de los tres servicios REST que se requieren para el sistema de comentarios como son:

* Crear un nuevo comentario.
* Aumentar cantidad de Likes de un comentario.
* Traer todos los comentarios (que deberá ser desarrollado)

### Crear un comentario.

Para el consumo se exponen dos URl's como son

```
http://localhost:8081/create/
```

El cual consume un Json con la siguiente información:

```json
{
  "nombre"	: "Pedro", 
  "comentario" : "esta es una prueba nada más"
}
```
Los datos son enviados a través del método ```POST```

Se deberá asociar al fecha y hora del comentario, la cual se debería obtener del servidor y no dle cliente.

### Aumentar Likes de un comentario.

La url del servicio es:

```
http://localhost:8081/updateLike/4
```

En la url de ejemplo el **4** representa el id del comentario.


### Traer todos los comentarios.

Se deberá crear el servicio de traer todos los comentarios.


### Instalación ejemplos modulos.

Para la instación se deberá ejecutar el comando:

```
npm install
```

El cual leerá el archivo **package.json** descargando las dependencias necesarias.


### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
