# Clase 10 - Actividad de Recuperación: Adivina en número

La actividad consiste en adivinar un número dado un tango dado, el cual parte desde uno hasta un valor [aleatorio].
* Valor Mínimo a adivinar (1)
* Valor máximo a adivinar entre 50 y 200.

![Adivina Número](https://dl.dropboxusercontent.com/u/181689/adivinaNumero.gif) 

La actividad deberá entregar pistas al usuario que le indique si esta cerca o lejos del número:

* Frio.
* Templado.
* Caliente.

Deberá tener un número de intentos máximos para adivinar el número, se propone que pueden ser 20.

Para obtner un número aleatorio en el rango específicado anteriomente se hace uso de la función ```Math.random``` para obtener números aleatorios y de la función ```Math.floor``` para redondear

##Ejemplo obtener número aleatorio entre 50 y 200

```javascript
var rangoMaximo = Math.floor((Math.random() * 200) + 50);
```

Se puede ver la aplicación en funcionamiento en el siguiente enlace: http://goo.gl/e2kHsH

La aplicación deberá ser entregada a través de [Google Drive] y el código entregado a través de [GitHub]

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[aleatorio]:https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
[Google Drive]:https://support.google.com/drive/answer/2881970?hl=es
[GitHub]:https://github.com/
