# Ejercicio Calculadora Validación Teclado

El presente ejercicio de calculadora, realiza la validación del teclado, donde el usuario no sólo a través de realizar clic sobre los elementos de los botones de la calculadora podrá hacer operaciones, sino también haciendo uso del teclado.


### Funcionalidades.

* Cpatura de Teclado
* Cambio de operadores matemáticos (% para división, x para multiplicación).
* Uso de paréntesis para separación de operaciones.

### Ejemplo Simplificación Fraccionarios.

<pre><code>
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
</code></pre>


### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
