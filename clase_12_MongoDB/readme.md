# Conexión MongoDB

Conexión a [MongoDB] a través de [Node.js] y muestra de información a través de [Express]

### Instalación ejemplos modulos.

Para la instación se deberá ejecutar el comando:

```
npm install
```

El cual tomará el archivo **package.json** descargando las dependencias necesarias, las cuales son:

* express
* consolidate
* swig
* mongodb

### Ejemplo poblar Base de datos.

El archivo ```poblarDB.js``` realiza el proceso de poblar una base de datos **usuarios** con nombres, apellido y edades de forma aleatoria, para la ejecución del mismo es necesario ejecutarlo a través de la shell de mongo:

```
./mongod ruta_archivo/poblarDB.js
```


### Autor
Jorge Rubaino [@ostjh]
License
----
MIT

[@ostjh]:https://twitter.com/ostjh
[Node.js]:https://nodejs.org/
[MongoDB]:https://www.mongodb.org/
[Express]:http://expressjs.com/
