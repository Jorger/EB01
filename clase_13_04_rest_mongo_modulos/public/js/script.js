$(function()
{
	//Para la captura de la foto del usuario...
	//http://localhost:8081/
	opcFoto = {
						ejecuta 	: false, 
						reproduce 	: false, 
						video 		: $("#video")[0], 
						canvas 		: $("#canvas")[0], 
						width 		: 200, 
						height 		: 150
				};
	//Guardará la foto que s eha tomando el usuario desde el navegador...
	var fotoUser = {img : "", tomada : false}
	navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    navigator.getMedia(
    {
        video: true,
        audio: false
    },

    function(fuente)//URL blog
    {
        if(navigator.mozGetUserMedia)
        {
            opcFoto.video.mozSrcObject = fuente;
        }
        else
        {
            var URL = window.URL || window.webkitURL;
            opcFoto.video.src = URL.createObjectURL(fuente);
        }
        opcFoto.video.play();
    },
    function(err)
    {
        //alert("El navegador no soporta getMedia");
        console.log("El navegador no soporta getUserMedia");
    });

    opcFoto.video.addEventListener('canplay', function(ev)
    {
        if (!opcFoto.ejecutaVideo)
        {
            //opcFoto.canvas.setAttribute('width', 200);
            //opcFoto.canvas.setAttribute('height', 200);
            console.log("ejecuta el vídeo");
            opcFoto.ejecutaVideo = true;
        }
    });

    $("#fperfil").click(function(event)
    {
    	opcFoto.canvas.width = opcFoto.width;
    	opcFoto.canvas.height = opcFoto.height;
    	var c = opcFoto.canvas.getContext('2d');
    	c.drawImage(opcFoto.video, 0, 0, opcFoto.width, opcFoto.height);
    	fotoUser.img = opcFoto.canvas.toDataURL(); 
    	fotoUser.tomada = true;
    	$(this).attr("src", fotoUser.img);
    });

    $("#efoto").click(function(event)
    {
    	var txt = "¿Está seguro de eliminar la foto";
    	if(confirm(txt))
    	{
	    	fotoUser.img = "sinFoto.png";
	    	fotoUser.tomada = false;
	    	$("#fperfil").attr("src", "fotos/sinFoto.png");
	    	if(idUser !== 0)
	    	{
	    		guardarDatos();
	    	}
	    }
    });

	//Fin de la captura de la foto...
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
	var idUser = 0;
	var elementos = ["identifica", "nombre", "apellido", "email", "fechanace"];
	//Consumo de servicios...
	var consumeServicios = function(tipo, val)
	{
		var servicio = {
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
					if(tipo === 4)
					{
						if(data.status)
						{
							limpiarCampos();	
						}
						else
						{
							alert("No se ha encontrado el usuario a eliminar");	
						}
					}
				}
				console.log("Data llega:");
				console.log(data);
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
						$("#fperfil").attr("src", "fotos/" + data.datos.foto);
						fotoUser.img = data.datos.foto;
						fotoUser.tomada = false;
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
		this.identificacion = datos.identifi;
		this.primernombre = datos.nombre;
		this.primerapellido = datos.apellido;
		this.email = datos.email;
		this.fechanacimiento = datos.fecha;
		this.foto = datos.foto;
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
						"<img src = 'fotos/"+this.foto+"' class = 'ftabla'>", 
						this.primernombre + " " + this.primerapellido, 
						this.email, 
						this.fechanacimiento, 
						this.calculaEdad()
					];
		}
	}

	//Imprimer usuarios en pantalla...
	var imprimeDatos = function imprimeDatos()
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
				idUser = listadoDatos[indice].identificacion;
				consumeServicios(5, idUser);
			});

			//Eliminar...
			$("#d_" + i).click(function(event)
			{
				var ind = event.target.id.split("_")[1];
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					consumeServicios(4, listadoDatos[ind].identificacion);
				}
			});
		}
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		console.log("Limpia campos...");
		fotoUser.img = "";
    	fotoUser.tomada = false;
		idUser = 0; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			$("#" + elementos[i]).val("");
		}
		$("#fperfil").attr("src", "fotos/sinFoto.png");
	}

	//Acciones sobre el botón guardar...
	$("#guarda").click(function(event)
	{
		guardarDatos();
	});

	var guardarDatos = function()
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
			console.log("Valor de id usuario es: " + idUser);
			var nuevoDato = {
								identifi 	: 	valores[0], 
								nombre 	 	: 	valores[1], 
								apellido 	: 	valores[2], 
								email 		: 	valores[3], 
								fecha 		: 	valores[4], 
								foto		: 	fotoUser.img, 
								tomada		: 	fotoUser.tomada
							};				
			consumeServicios(idUser === 0 ? 2 : 3, nuevoDato);
		}
	};
});