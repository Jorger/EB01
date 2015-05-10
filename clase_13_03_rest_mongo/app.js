var express 	= 	require("express"),
	app			= 	express(), 
	cons 		=	require("consolidate"), 
	puerto 		= 	8081, 
	bodyParser 	= require('body-parser'), 
	MongoClient = 	require("mongodb").MongoClient, db;

//Conectarse a la base de datos de MngoDB...
MongoClient.connect("mongodb://127.0.0.1:27017/crud", function(err, database)
{
	if(err) throw err;
	//Buscar un documento en la colección...
	db = database;
	app.listen(puerto);
	console.log("Express server iniciado en el " + puerto);	
});

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Datos de prueba...

//Servicios REST...
app.get("/", function(req, res)
{
	res.render("index", {
		titulo 	:  	"Pueba RESTFul MongoDB"
	});
});

app.get('/getAllData', function(req, res)
{
	var coleccion = db.collection("usuarios");
	var opciones = {"sort" : ["nombre", "acs"]};
	var cursor = coleccion.find({}, opciones);
	cursor.toArray(function(err, doc)
	{
		if(err)
		{
			throw err;
		}
		res.json(doc);
	});
});

app.post('/createData', function (req, res)
{
	crearEditarUsuario(req.body, 1, function(status)
	{
		res.json(status);
	});
});

app.put('/updateData', function (req, res)
{
	crearEditarUsuario(req.body, 2, function(status)
	{
		res.json(status);
	});
});

app.get('/getData/:id', function(req, res)
{
	var coleccion = db.collection("usuarios");
	var query = {identifi : req.param("id")};
	coleccion.findOne(query, function(err, doc)
	{
		var devuelve = {datos : doc !== null ? doc : "", status : doc !== null ? true : false};
		res.json(devuelve);
	});
});

app.delete('/deleteData/:id', function(req, res)
{
	var coleccion = db.collection("usuarios");
	var query = {identifi : req.param("id")}
	coleccion.remove(query, function(err, eliminado)
	{
		//res.json({status : ind >= 0 ? true : false});
		res.json({status : true});
	});
});


var crearEditarUsuario = function(data, tipo, callback)
{
	var coleccion = db.collection("usuarios");
	//Saber si un usuario ya existe...
	var query = {
					$or : [
							{identifi 	: data.identifi}, 
							{email 		: data.email}
						]
				};
	if(tipo === 2)
	{
		query.identifi = {$ne : data.identifi};
	}
	var cursor = coleccion.find(query);
	cursor.count(function(err, count)
	{
  		if(count === 0)
  		{
  			if(tipo === 1)
  			{
	  			coleccion.insert(data, function(err, records)
				{
	  				callback({status : true});
				});
	  		}
	  		else
	  		{
	  			coleccion.update({identifi : data.identifi}, data, function(err, actualiza)
				{
	  				//console.log("Acrtualiza: " + actualiza);
	  				callback({status : true});
				});
	  		}
  		}
  		else
  		{
  			callback({status : false});
  		}
	});
};

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});