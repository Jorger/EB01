window.onload = function()
{
	var listadoPersonas = [];
	var elementos = ["identifica", "nombre", "apellido", "email", "fechanace"];
	var resultadoBusca = []; //Gurda los usuarios que cumplen con el criterio de búsqueda...
	//Constructor Persona...
	function persona(id, pn, pa, em, fe)
	{
		this.identificacion = id;
		this.primernombre = pn;
		this.primerapellido = pa;
		this.email = em;
		this.fechanacimiento = fe;
		this.calculaEdad = function()
		{
			var fecha_actual = new Date();
			var parteFn = this.fechanacimiento.split("-");
			var fechaCompara = new Date(parteFn[0], parteFn[1], parteFn[2]); //año, mes día
			return Math.floor((fecha_actual - fechaCompara) / 1000 / 3600 / 24 / 365);
			//Milisegundos, segundos en una hora, horas en un día, días en un año...
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

	//Para cargar la información de localStorage...
	if(localStorage.getItem("listado"))
	{
		var objTMP = eval(localStorage.getItem("listado"));
		var id = pn = pa = em = fn = "";
		for(var i in objTMP)
		{
			var id = objTMP[i].identificacion;
			var pn = objTMP[i].primernombre;
			var pa = objTMP[i].primerapellido;
			var em = objTMP[i].email;
			var fn = objTMP[i].fechanacimiento;
			var nuevaPersona = new persona(id, pn, pa, em, fn);
			listadoPersonas.push(nuevaPersona);
		}
	}

	imprimeUsuarios();
	//Imprimer usuarios en pantalla...
	function imprimeUsuarios()
	{
		var muestra = true;
		var txt = "<table class = 'table-fill'>";
			txt += "<thead><tr><th>ID</th><th>Nombre</th><th>E-mail</th>";
			txt += "<th>Fecha</th><th>Edad</th>";
			txt += "<th>Editar</th><th>Eliminar</th></tr></thead>";
			txt += "<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			muestra = true;
			for(var c in resultadoBusca)
			{
				if(resultadoBusca[c] === i)
				{
					muestra = false;
				}
			}
			if(muestra)
			{
				txt += "<tr>";
				var datosPersona = listadoPersonas[i].imprime();
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
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;

		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			muestra = true;
			for(var c in resultadoBusca)
			{
				if(resultadoBusca[c] === i)
				{
					muestra = false;
				}
			}
			if(muestra)
			{
				//Editar...
				nom_div("e_" + i).addEventListener('click', function(event)
				{
					var ind = event.target.id.split("_")[1];
					var idUser = listadoPersonas[ind].identificacion;
					ind = buscaIndice(idUser);
					/*
						Agregar función de edición de datos...
					*/
				});
				//Eliminar...
				nom_div("d_" + i).addEventListener('click', function(event)
				{
					var ind = event.target.id.split("_")[1];
					var idUser = listadoPersonas[ind].identificacion;
					if(confirm("¿Está segur@ de realizar está acción?"))
					{
						ind = buscaIndice(idUser);
						/*
							Agregar acción de eliminar Usuario...
						*/
					}
				});
			}
		}
	}
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoPersonas)
		{
			if(listadoPersonas[i].identificacion === id)
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
		for(var i = 0; i < elementos.length; i++)
		{
			nom_div(elementos[i]).value = "";	
		}
	}

	//Saber si un usuario ya existe, bien por identificación o por e-mail...
	function existeUsuario(id, email)
	{
		var existe = 0; //0 Ningún campo existe...
		for(var i in listadoPersonas)
		{
			//Cédula...
			if(listadoPersonas[i].identificacion === id)
			{
				existe = 1; // la cédula existe...
				break;
			}
			//Correo existe...
			if(listadoPersonas[i].email.toLowerCase() === email.toLowerCase())
			{
				existe = 2; //El correo existe...
				break;
			}
		}
		return existe;
	}

	//Acciones sobre el botón guardar...
	nom_div("guarda").addEventListener('click', function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if(nom_div(elementos[i]).value === "")
			{
				alert("Digite todos los campos");
				nom_div(elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = nom_div(elementos[i]).value;
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{
			var existeDatos = existeUsuario(valores[0], valores[3]);
			if(existeDatos == 0) //No existe...
			{
				if(ValidaEmail(valores[3]))
				{
					var nuevaPersona = new persona(valores[0], valores[1], valores[2], valores[3], valores[4]);
					listadoPersonas.push(nuevaPersona);
					localStorage.setItem("listado", JSON.stringify(listadoPersonas));
					imprimeUsuarios();
					limpiarCampos();
				}
				else
				{
					alert("El correo no es válido");
					nom_div(elementos[3]).focus();
				}
			}
			else
			{
				if(existeDatos == 1)
				{
					alert("El usuario con la cédula: " + valores[0] + " Ya existe");
					nom_div(elementos[0]).focus();
				}
				else
				{
					alert("El correo : " + valores[3] + " Ya existe");
					nom_div(elementos[3]).focus();	
				}
			}
		}
	});
	
	//Para la acción de buscar...
	nom_div("buscUser").addEventListener('keyup', function(event)
	{
		resultadoBusca = []; //Reiniciar el array de resultados de búsqueda...
		var busca = false;
		if(this.value !== "")
		{
			for(var i = 0; i < listadoPersonas.length; i++)
			{
				busca = listadoPersonas[i].identificacion.search(this.value) < 0;
				busca = busca && listadoPersonas[i].primernombre.search(this.value) < 0;
				busca = busca && listadoPersonas[i].primerapellido.search(this.value) < 0;
				busca = busca && listadoPersonas[i].email.search(this.value) < 0;
				if(busca)
				{
					resultadoBusca.push(i);
				}
			}
		}
		imprimeUsuarios();
	});


	//Función que valida que un e-mail se encuentre "sintácticamente" bien escrito...
	function ValidaEmail(email)
	{
		var correcto = true;
		var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!emailReg.test(email))
		{
			correcto =  false;
		}
		return correcto;
	}

	//Accedera los elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}