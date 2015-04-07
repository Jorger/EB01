# Ejercicio Calculadora Fraccionarios/Decimales

Es este ejercicio el estudiante realizará las validaciones necesarias para operar números fraccionarios a través de una calculadora.

![Image of Yaktocat](https://dl.dropboxusercontent.com/u/181689/calOfradec.png)

### Operaciones

* Suma
* Resta
* Multiplicación
* División

El resultado deberá ser un fraccionario simplificado.

### Decimales Periódicos

Para el presente ejercicio no es necesario hacer conversiones de [Decimales Periódicos] a Fraccionarios.

###Demostración.

En la dirección http://goo.gl/7nf903 se puede apreciar la actividad en funcionamiento la cual realiza:

* Conversiones y operaciones entre fraccionarios y decimales.
* Entrega el resultado en un fraccionario simplificado o en un entero.
* Conversiones de decimales periódicos puros.
* Convierte de decimal a fraccionario y viceversa.

Se deberá entregar la url del ejercicio publicada en [Google Drive], así como el código versionado en [GitHub].

###Ejemplo simplificación Fracciones.

```javascript
var simplificaFraccionario = function(val)
{
	var parteVal = val.split("/");
	var numerador = Number(parteVal[0]);
	var denominador = Number(parteVal[1]);
	var maximo = numerador <= denominador ? numerador : denominador;
	var cont = 2;
	do
	{
		if(numerador % cont === 0 && denominador % cont === 0)
		{
			numerador /= cont; // numerador = numerador / cont;
			denominador /= cont;
			maximo = numerador <= denominador ? numerador : denominador;
		}
		else
		{
			cont++;
			if(cont > maximo)
			{
				break;
			}
		}
	}while(1);
	var respuesta = numerador + "/" + denominador;
	if(denominador === 1)
	{
		respuesta = numerador;
	}
	return respuesta;
};
```

### Función saber si un número es periódico

```javascript
var numPeriodico = function(val)
	{
		val = (val || "").toString();
		var PATRON_DECIMALES = /(?:[^\.]+\.\d*)(\d{2,})+(?:\1)$/, 
		   	PATRON_NUM_REPETIDOS = /^(\d+)(?:\1)$/,
		   	patron = PATRON_DECIMALES.exec(val);
		if(!patron)
		{
			val = val.replace( /\d$/, '' );
			patron = PATRON_DECIMALES.exec(val);
		}
		if(patron && 1 < patron.length)
		{
			patron[1] = PATRON_NUM_REPETIDOS.test(patron[1]) ? PATRON_NUM_REPETIDOS.exec(patron[1])[1] : patron[1];
		}
		return patron;
   	};
```

### Ejemplo

La función devolverá  **null**, en el caso de que el número no sea periódico, si lo es, devolverá un *array* el cual en la posicón cero (0) el número comparado y en la posición uno (1) el número periódico que se repite.

```javascript
numPeriodico(1.3)
//null
numPeriodico(1.33333)
//["1.33333", "3"]
numPeriodico(1.5777777)
//["1.5777777", "7"]
numPeriodico(1.34777777)
//["1.34777777", "7"]
numPeriodico(1.3475757575)
//["1.3475757575", "75"]
```

### Consideraciones.

La forma de realizar la conversión de decimales a fraccionarios, varia dependiendo si el número es periódico o no, en el caso de ser periódico se deberá tener en cuenta la cantidad de cifras que se repiten.

Este es un tip para el ejercicio a realizar de conversión de números periódicos a fraccionarios, ejercicio a entregar por parte de los estudiantes.


### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[Decimales Periódicos]:http://es.wikipedia.org/wiki/N%C3%BAmero_decimal_peri%C3%B3dico
[Google Drive]:https://support.google.com/drive/answer/2881970?hl=es
[GitHub]:https://github.com/
