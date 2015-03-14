var debug = "";
window.onload = function()
{
	operacion = "";
	var operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+"
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-"
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "*"
						},
						{
							"tipo" 		: "División", 
							"operador"	: "/"
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			debug = event;
			var numero = event.target.id.split("_")[1];
			


			operacion += numero;
			nom_div("pantalla").innerHTML = operacion;
			//console.log(operacion);
		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				var operador = Number(event.target.id.split("_")[1]);
				var txtOperador = operaciones[operador - 1].operador;
				operacion += txtOperador;
				nom_div("pantalla").innerHTML = operacion;
				console.log(operaciones[operador - 1].tipo);
				//Tiene que existir un número antes...
				//No pueden existir dos operadores seguidos...
				//No puede quedar un operador al final...
			});
			//Para las demás acciones (limpiar, igual y punto)...
			if(i <= 3)
			{
				//console.log("acciones_" + i);
				nom_div("acciones_" + i).addEventListener('click', function(event)
				{
					var accion = Number(event.target.id.split("_")[1]);
					console.log("Acción es: " + accion);
					var resultado = "";
					switch(accion)
					{
						case 1: operacion = ""; break;
						case 2: operacion += ".";
								resultado = operacion;
								break;
						case 3: operacion = eval(operacion);
								resultado = operacion;
								break;
					}
					nom_div("pantalla").innerHTML = resultado;
				});
			}
		}
	}
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};