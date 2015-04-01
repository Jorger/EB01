var debug = "";
window.onload = function()
{
	var operacion = "";
	var fraccionarios = false; //Saber si está opetando franccionarios...
	var cifras = []; //Guardará las cifras...
	var operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+", 
							"code"		: 187
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-", 
							"code"		: 189
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "x", 
							"code"		: 88
						},
						{
							"tipo" 		: "División", 
							"operador"	: "%", 
							"code"		: 68
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			capturaValor(event.target.id.split("_")[1], 1);
		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				var operador = Number(event.target.id.split("_")[1]);
				capturaValor(operaciones[operador - 1].operador, 2);
			});
			//Para las demás acciones (limpiar, igual y punto)...
		}
		if(i >= 1 && i <= 7)
		{
			nom_div("acciones_" + i).addEventListener('click', function(event)
			{
				var accion = Number(event.target.id.split("_")[1]);
				switch(accion)
				{
					case 1: capturaValor("", 3); break;
					case 2: capturaValor("", 4); break;
					case 3: capturaValor("", 5); break;
					case 4: capturaValor("(", 6); break;
					case 5: capturaValor(")", 7); break;
					case 6: borrarUltimo(); break;
					case 7: ofraDec(); break;
				}
			});
		}
	}

	//Para cambiar de fraccionarios a decimales y vicerversa...
	var ofraDec = function()
	{
		fraccionarios = !fraccionarios;
		var tipoAccion = "Decimal";
		var tipoOpera = ".";
		if(fraccionarios)
		{
			tipoAccion = "Fracción";
			tipoOpera = "/";
		}
		this.innerHTML = tipoAccion;
		nom_div("acciones_2").innerHTML = tipoOpera;
		capturaValor("", 5);
	};

	//Captura el valor dado...
	var capturaValor = function(valor, tipo)
	{
		var imprime = false;
		var buscaOpera = fraccionarios ? "/" : ".";
		if(tipo === 1)//Números...
		{
			operacion += valor;
			var cont = 0;
			cifras[cont] = "";
			for(var c = 0; c < operacion.length; c++)
			{
				if(!existeOperador(operacion.charAt(c)) || operacion.charAt(c) === buscaOpera)
				{
					if(operacion.charAt(c) !== "(" && operacion.charAt(c) !== ")")
					{
						cifras[cont] += operacion.charAt(c);
					}
				}
				else
				{
					cont++;
					cifras[cont] = "";
				}
			}
			imprime = true;
		}
		else
		{
			//Para los operadores Matemáticos...
			if(tipo === 2)
			{
				//Saber si el final hay un operador...
				var ultimo = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ultimo))
				{
					imprime = true;
					operacion += valor;
				}
			}
			else
			{
				//Para Borrar...
				if(tipo === 3)
				{
					imprime = true;
					operacion = "";
					cifras = [];
				}
				else
				{
					//Para el punto o el fraccionario...
					if(tipo === 4)
					{
						if(operacion !== "")
						{							

							//Traer la última cifra...
							var ultimaCifra = cifras[cifras.length - 1];
							//Buscar si ya existe un punto...
							if(ultimaCifra.indexOf(buscaOpera) < 0)
							{
								imprime = true;
								operacion += buscaOpera;
								cifras[cifras.length - 1] += buscaOpera;
							}
						}
					}
					else
					{
						//Para el igual...
						if(tipo === 5)
						{
							//Buscar al final si existe un operador...
							if(operacion !== "")
							{
								var ultimo = operacion.charAt(operacion.length - 1);
								if(existeOperador(ultimo))
								{
									operacion = operacion.substr(0, operacion.length - 1);
								}
								//Sustituir los valores de división y multiplicación...
								var reemplaza = [{busca : 	"x", cambia	: 	"*"}, 
												 {busca : 	"%", cambia	: 	"/"}];
								for(var i in reemplaza)
								{
									do
									{
										if(operacion.indexOf(reemplaza[i].busca) >= 0)
										{
											operacion = operacion.replace(reemplaza[i].busca, reemplaza[i].cambia);
										}
										else
										{
											break;
										}
									}while(1);
								}
								//Capturar el error...
								try
								{
									var respuesta = eval(operacion);
									if(fraccionarios && String(respuesta).indexOf(".") >= 0)
									{
										respuesta = convierteFraccionario(respuesta);
									}
									operacion = String(respuesta);
									cifras = [];
									cifras[0] = operacion;
									imprime = true;
								}
								catch(e)
								{
									swal({
					                    title: "Error en la operación",
					                    text: e.message, 
					                    showCancelButton: false,   
					                    confirmButtonColor: "#DD6B55",  
					                    confirmButtonText: "Aceptar", 
					                    closeOnConfirm: false, 
					                    type: "error"
					                });
								}
							}
						}
						else
						{
							if(tipo === 6 || tipo === 7)
							{
								operacion += valor;
								imprime = true;
							}
						}
					}
				}
			}
		}
		if(imprime)
		{
			tamanoFuente();
			nom_div("pantalla").innerHTML = operacion;
		}
	};

	//Para saber si existe un operador...
	var existeOperador = function(operador)
	{
		var existe = false; //Para saber si existe un operador al final...
		//Saber si es un operador...
		for(var c in operaciones)
		{
			if(operaciones[c].operador === operador)
			{
				existe = true;
				break;
			}
		}
		return existe;
	};

	//Borrar el último caractert...
	var borrarUltimo = function()
	{
		if(operacion.length >= 0)
		{
			operacion = operacion.substr(0, operacion.length - 1);
			tamanoFuente();
			nom_div("pantalla").innerHTML = operacion;
		}
	};

	//Cambiar el tamaño de la fuente...
	var tamanoFuente = function()
	{
		var fuente = 220;
		var maximoFuente = 10;
		if(operacion.length > maximoFuente)
		{
			fuente -= Math.round(fuente * ((operacion.length + 25) / 100));
		}
		nom_div("pantalla").style.fontSize = fuente + "%";
	};


	//Para validar el teclado...
	window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(code === 66) //Para borrar...
		{
			borrarUltimo();
		}
		else
		{
			if(code === 70) //Para Cambiar de tipo de operación...
			{
				ofraDec();
			}
			else
			{
				accionesTeclado(code, 1);
			}
		}
	};

	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		accionesTeclado(code, 2);
	};

	var accionesTeclado = function(code, tipo)
	{
		var ID = "";
		var clase = "";
		if(code >= 48 && code <= 57)
		{
			//Para los números...
			var numero = code - 48;
			ID = "numero_" + numero;
			clase = "presionado";
			if(tipo === 2)
			{
				capturaValor(String(numero), 1);
			}
		}
		else
		{
			//Para los operadores...
			if(code === 187 || code === 189 || code === 68 || code === 88)
			{
				for(var i = 1; i <= operaciones.length; i++)
				{
					if(operaciones[i - 1].code === code)
					{
						capturaValor(operaciones[i - 1].operador, 2);
						break;
					}
				}
			}
			else
			{
				//Los demás valores...
				switch(code)
				{
					case 27 	: capturaValor("", 3); 
								  break;
					case 191	:
					case 190 	: capturaValor("", 4); 
								  break;
					case 13 	: capturaValor("", 5); 
								  break;
				}
			}
		}
		if(ID !== "")
		{
			if(tipo === 1)
			{
				nom_div(ID).setAttribute("class", clase);
			}
			
			else
			{
				nom_div(ID).removeAttribute("class", "presionado");
			}
		}
	};
	//Fin de capturar el teclado...

	//Función que convierte a fraccionarios...
	var convierteFraccionario = function(valor)
	{
		var negativo = false;		
		if(valor < 0)
		{
			valor *= -1; //Se deja positivo por defecto...
			negativo = true;
		}
		//console.log("Valor llega es: " + valor);
		var periodico = numPeriodico(valor);
		parteValor = String(valor).split(".");
		var numerador = 0;
		var denominador = 0;
		if(periodico)
		{
			var repite = periodico[1]; //El valor que se repite...
			entero = Number(parteValor[0]);
			var decimal = parteValor[1];
			denominador = Math.pow(10, repite.length) - 1;
			//Saber si se repite desde el principio...
			if(decimal.indexOf(repite) === 0)
			{
				//Inicia desde el principio...
				numerador = (denominador * entero) + Number(repite);
			}
			else
			{
				var norepite = decimal.substr(0, decimal.indexOf(repite));
				denominador *= Math.pow(10, norepite.length);
				//Une el valor que no se repite con el valor periódico...
				var uneRepite = Number(norepite + repite) - Number(norepite);
				numerador = (denominador * entero) + Number(uneRepite);
			}
		}
		else
		{
			//No es periodico...
			denominador = Math.pow(10, parteValor[1].length);
			numerador = valor * denominador;
		}
		return (negativo ? "-" : "") + simplificaFraccionario(numerador + "/" + denominador);
	};

	//Para saber si un decimal es periódico y saber el valor que lo es...
	var numPeriodico = function(val)
	{
		val = (val || "").toString();
		var RE_PatternInRepeatDec = /(?:[^\.]+\.\d*)(\d{2,})+(?:\1)$/, 
		   RE_RepeatingNums = /^(\d+)(?:\1)$/,
		   match = RE_PatternInRepeatDec.exec( val );
		if(!match)
		{
			val = val.replace( /\d$/, '' );
			match = RE_PatternInRepeatDec.exec( val );
		}
		if( match && 1 < match.length )
		{
			match[1] = RE_RepeatingNums.test(match[1]) ? RE_RepeatingNums.exec(match[1])[1] : match[1];
		}
		return match;
   	};

   	//Simplicar fraccionarios, utilizando el máximo común divisor...
   	var simplificaFraccionario = function(val)
   	{
   		var parteVal = val.split("/");
   		var numerador = Number(parteVal[0]);
   		var denominador = Number(parteVal[1]);
   		var maximoComunDivisor = function(a, b)
   		{
   			return b ? maximoComunDivisor(b, a%b) : a;
   		};
   		maximoComunDivisor = maximoComunDivisor(numerador,denominador);
   		return (numerador/maximoComunDivisor) + "/" + (denominador/maximoComunDivisor);
   	};
   	//160256516923/25000000
   	//Simplificar fracciones buscando el valor divisible por ambos...
   	//Más demorado...
	/*
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
				numerador /= cont;
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
		return numerador + "/" + denominador;
	};
	*/
	//Acceder a elementos del DOM...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};