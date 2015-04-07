# Ejercicio LocalStorage / CRUD

Es este ejercicio el estudiante verá el manejo de [LocalStorage], sobre este se hacen procesos básicos de CRUD.

* Se podrá almacenar usuarios.
* Se podrá buscar usuarios.

![Image of LocalStorage](https://dl.dropboxusercontent.com/u/181689/localStorageDemo.png)

El estudiante deberá completar los procesos de:

* Edición.
* Eliminación.

Se entrega estructura báscia del ejercicio.

Se puede ver en línea en la siguiente dirección: http://goo.gl/eAZC1g

### Consideraciones ordenamiento de tabla.

El presente ejercicio da al estudiante la oportunidad de añadir los elementos faltantes de un proceso CRUD, en este caso edición y eliminación.

Se ha solicitado una nueva funcionalidad (actividad de recuperación), la cual tiene que ver con el ordenamiento de la tabla de usuarios, por los campos de:

* Identificación.
* Nombre.
* E-mail

![Image of order](https://dl.dropboxusercontent.com/u/181689/ordenaTabla.gif)

### Función sort de Javascript.

La función [sort] de Javascript realiza el ordenamiento de elementos de un Array.

```javascript
var frutas = ['Manzana', 'Pera', 'Curuba'];
frutas.sort(); // ["Curuba", "Manzana", "Pera"]
```
Pero en nuestro ejercicio el array está compuesto a la vez por objetos persona.

```javascript
var listadoPersonas = [
   {
      "identificacion":"234234",
      "primernombre":"Juan",
      "primerapellido":"Mede",
      "email":"jua@correo.com",
      "fechanacimiento":"2003-06-10"
   },
   {
      "identificacion":"11276",
      "primernombre":"Jorge",
      "primerapellido":"Rubiano",
      "email":"jorge.rubiano@ymail.com",
      "fechanacimiento":"1987-06-02"
   }
];
```

Para acceder al elemento a realizar el ordenamiento se deberá indicar el campo en la función sort.

```javascript

listadoPersonas.sort(function (a, b)
{
  if (a["campo"] > b["campo"])
  {
    return 1;
  }
  if (a["campo"] < b["campo"])
  {
    return -1;
  }
  //Son iguales...
  return 0;
});

```

La función anterior realizará el ordenamiento de forma ascedente, se deberá adicionar la opción para realizar un ordenamiento descentente.

El valor **"campo"** corresponde al nombre de la propiedad del objeto persona a ordenar (*identificacion*, *primernombre*, *email*)

Si el valor a ordenar está en minúsculas o mayúsculas, el ordenamiento puede variar, por lo que se recomienda estándarizar el proceso sólo a mayúsculas o sólo a minúsculas.

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT

[LocalStorage]:http://www.w3schools.com/html/html5_webstorage.asp
[@ostjh]:https://twitter.com/ostjh
[sort]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
