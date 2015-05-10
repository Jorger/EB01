# Servicios REST/Express, Vista consumo

Parte dos del ejemplo de consumo de servicios REST, en la [parte uno] se mostró los métodos realizados, así como su forma de consumo, 
en este caso a través de [Postman], en este ejemplo se hace uso de una vista la cual realiza el 
consumo de los servicios.

![Vista_REST01](https://dl.dropboxusercontent.com/u/181689/vistaREST01.png)

Se hace uso del método [$.ajax] de [Jquery] para facilidad del manejo de los métodos por cada servicio:

```javascript
$.ajax({
  method: "POST",
  url: "servicio",
  data: JSON.stringify(datos)
})
  .done(function( msg ) {
    consolode.log(msg);
  });
```

### Instalación ejemplos modulos.

Para la instación se deberá ejecutar el comando:

```
npm install
```

El cual leerá el archivo **package.json** descargando las dependencias necesarias.

### Uso de Clod9 para despliegue de la aplicación.

[Cloud9] permite el desarrollo y despliegue de aplicaciones, en este caso para [Node.js], la aplicación ya se encuentra en funcionamiento 
en dicho sistema: https://nodeudec-jorger-1.c9.io/ la persistencia de información aún se realiza a través de un Array.

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[parte uno]:https://github.com/Jorger/EB01/blob/master/clase_13_01_rest_array/readme.md
[Jquery]:https://jquery.com/
[$.ajax]:http://api.jquery.com/jquery.ajax/
[Postman]:https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop
[Cloud9]:https://c9.io/
[Node.js]:https://nodejs.org/
