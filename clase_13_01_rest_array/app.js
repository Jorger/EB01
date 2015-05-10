var express = 	require("express"),
	app		= 	express()
	puerto 	= 	8081, 
	bodyParser 	= require('body-parser');

//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Datos de prueba...
var objeto = [
				{
					id 			: 	1, 
					identifi	: 	"12345",
					nombre 		: 	"Jorge", 
					apellido	: 	"Rubiano", 
					email		: 	"correo@correo.com", 
					fecha		: 	"1985-06-15"
				},
				{
					id 			: 	2, 
					identifi	: 	"453453",
					nombre 		: 	"María", 
					apellido	: 	"Pérez", 
					email		: 	"maria@correo.com",
					fecha		: 	"1970-04-25"
				},
				{
					id 			: 	3, 
					identifi	: 	"893434",
					nombre 		: 	"Pedro", 
					apellido	: 	"García", 
					email		: 	"pedro@correo.com", 
					fecha		: 	"1990-08-23"
				}];

//Servicios REST...
app.get('/getAllData', function(req, res)
{
	res.json(objeto);   
});

app.post('/createData', function (req, res)
{
	res.json(crearEditarUsuario(req.body, 1));
});

app.put('/updateData', function (req, res)
{
	res.json(crearEditarUsuario(req.body, 2));
});

app.delete('/deleteData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	if(ind >= 0)
	{
		objeto.splice(ind, 1);
	}
	res.json({status : ind >= 0 ? true : false});
});

app.get('/getData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	var devuelve = {datos : ind >= 0 ? objeto[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

//Crear o edita un usuario...
var crearEditarUsuario = function(data, tipo)
{
	var idedita = tipo === 1 ? 0 : data.id;
	var existe = userExiste(data.identifi, data.email, idedita);
	if(!existe)
	{
		if(tipo === 1)
		{
			objeto.push(data);
			objeto[objeto.length - 1].id = objeto.length;
			idedita = objeto[objeto.length - 1].id;
		}
		else
		{
			objeto[buscarIDUser(idedita)] = data;
		}
	}
	return {id : !existe ? idedita : 0, status : !existe};
}

//Busca la posición del usuario en el array...
var buscarIDUser = function(id)
{
	var ind = -1;
	for(var i = 0; i < objeto.length; i++)
	{
		if(Number(objeto[i].id) === Number(id))
		{
			ind = i;
			break;
		}
	}
	return ind;
};

//Para saber si un usuario ya existe...
var userExiste = function(identifica, email, ind)
{
	var existe = false;
	for(var i = 0; i < objeto.length; i++)
	{
		if(identifica === objeto[i].identifi || email.toLowerCase() === objeto[i].email.toLowerCase())
		{
			if(Number(objeto[i].id) !== Number(ind))
			{
				existe = true;
				break;
			}
		}
	}
	return existe;
};

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);