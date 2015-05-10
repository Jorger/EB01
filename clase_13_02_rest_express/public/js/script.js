$(function()
{
	var nomServicios = [
							{
								servicio 	: 	"Trae todos los datos", 
								urlServicio	: 	"/getAllData", 
								metodo		: 	"GET"
							}, 
							{
								servicio 	: 	"Crear dato", 
								urlServicio	: 	"/createData",
								metodo		: 	"POST"
							},
							{
								servicio 	: 	"Editar dato", 
								urlServicio	: 	"/updateData",
								metodo		: 	"PUT"
							},
							{
								servicio 	: 	"Eliminar dato", 
								urlServicio	: 	"/deleteData",
								metodo		: 	"DELETE"
							},
							{
								servicio 	: 	"Trae dato", 
								urlServicio	: 	"/getData", 
								metodo		: 	"GET"
							}];
	var listadoDatos = [];
	var indEdita = -1;
	var elementos = ["identifica", "nombre", "apellido", "email", "fechanace"];
	//Consumo de servicios...
	var consumeServicios = function(tipo, val)
	{
		servicio = {
						url 	: nomServicios[tipo - 1].urlServicio, 
						metodo	: nomServicios[tipo - 1].metodo, 
						datos 	: ""
					};
		if(tipo === 4 || tipo === 5)
		{
			servicio.url += "/" + val;
		}
		else
		{
			servicio.datos = val !== "" ? JSON.stringify(val) : "";
		}
		$.ajax(
		{
			url 		: servicio.url,
			type 		: servicio.metodo, 
			data 		: servicio.datos, 
			dataType 	: "json",
			contentType: "application/json; charset=utf-8"
		}).done(function(data)
		{
			//Todos los datos...
			if(tipo === 1)
			{
				listadoDatos = [];
				for(var i = 0; i < data.length; i++)
				{
					//console.log(data[i]);
					listadoDatos.push(new datoData(data[i]));
				}
				imprimeDatos();
			}
			else
			{
				if(tipo === 2 || tipo === 3)
				{
					if(data.status)
					{
						limpiarCampos();
					}
					else
					{
						alert("Ya existe un usuario con los datos digitados");
					}					
				}
				else
				{
					if(tipo === 4 && !data.status)
					{
						alert("No se ha encontrado el usuario a eliminar");
					}
				}
				if(tipo !== 5)
				{
					consumeServicios(1, "");
				}
				else
				{
					if(data.status)
					{
						$("#identifica").val(data.datos.identifi);
						$("#nombre").val(data.datos.nombre);
						$("#apellido").val(data.datos.apellido);
						$("#email").val(data.datos.email);
						$("#fechanace").val(data.datos.fecha);
					}
					else
					{
						alert("El usuario no existe");
						consumeServicios(1, "");
					}
				}
			}
		});
	};
	consumeServicios(1, "");	
	
	//Constructor datos...
	function datoData(datos)
	{
		this.id = datos.id;
		this.identificacion = datos.identifi;
		this.primernombre = datos.nombre;
		this.primerapellido = datos.apellido;
		this.email = datos.email;
		this.fechanacimiento = datos.fecha;
		this.calculaEdad = function()
		{
			var fecha_actual = new Date();
			var parteFn = this.fechanacimiento.split("-");
			var fechaCompara = new Date(parteFn[0], parteFn[1], parteFn[2]); //año, mes día
			return Math.floor((fecha_actual - fechaCompara) / 1000 / 3600 / 24 / 365);
		}
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						this.identificacion, 
						this.primernombre + " " + this.primerapellido, 
						this.email, 
						this.fechanacimiento, 
						this.calculaEdad()
					];
		}
	}

	//Imprimer usuarios en pantalla...
	var imprimeDatos = function()
	{
		var txt = "<table class = 'table-fill'>";
			txt += "<thead><tr>";		
			txt += "<th>ID</th>";
			txt += "<th>Nombre</th>";
			txt += "<th>E-mail</th>";
			txt += "<th>Fecha</th>";
			txt += "<th>Edad</th>";
			txt += "<th>Editar</th><th>Eliminar</th></tr></thead>";
			txt += "<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoDatos.length; i++)
		{
			txt += "<tr>";
			var datosPersona = listadoDatos[i].imprime();
			for(var c = 0; c < datosPersona.length; c++)
			{
				txt += "<td><center>"+(datosPersona[c])+"</center></td>";
			}
			//Editar...
			txt += "<td><center>";
			txt += "<img src = 'img/editar.png' border = '0' id = 'e_"+i+"'/>";
			txt += "</center</td>";
			//Eliminar...
			txt += "<td><center>";
			txt += "<img src = 'img/eliminar.png' border = '0' id = 'd_"+i+"'/>";
			txt += "</center</td>";
			txt += "</tr>";
		}
		txt += "</tbody></table>";
		$("#imprime").html(txt);
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoDatos.length; i++)
		{
			//Editar...
			$("#e_" + i).click(function(event)
			{
				var indice = event.target.id.split("_")[1];
				var idUser = listadoDatos[indice].identificacion;
				var ind = buscaIndice(idUser);
				if(ind >= 0)
				{
					consumeServicios(5, listadoDatos[ind].id);
					indEdita = ind;
				}
				else
				{
					alert("No existe el ID");
				}
			});
			//Eliminar...
			$("#d_" + i).click(function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoDatos[ind].identificacion;
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					ind = buscaIndice(idUser);
					if(ind >= 0)
					{
						consumeServicios(4, listadoDatos[ind].id);
					}
				}
			});
		}
	}
	
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoDatos)
		{
			if(listadoDatos[i].identificacion === id)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		indEdita = -1; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			$("#" + elementos[i]).val("");
		}
	}

	//Acciones sobre el botón guardar...
	$("#guarda").click(function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if($("#" + elementos[i]).val() === "")
			{
				alert("Digite todos los campos");
				$("#" + elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = $("#" + elementos[i]).val();
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{
			var nuevoDato = {
								id 			: 	indEdita < 0 ? 0 : listadoDatos[indEdita].id, 
								identifi 	: 	valores[0], 
								nombre 	 	: 	valores[1], 
								apellido 	: 	valores[2], 
								email 		: 	valores[3], 
								fecha 		: 	valores[4]
							};				
			consumeServicios(indEdita < 0 ? 2 : 3, nuevoDato);
		}
	});
});
*/
