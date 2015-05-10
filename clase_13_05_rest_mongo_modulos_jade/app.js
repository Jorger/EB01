var express 	= 	require("express"),
	app			= 	express(), 
	cons 		=	require("consolidate"), 
	puerto 		= 	8081, 
	bodyParser 	= 	require('body-parser'), 
	bd 			= 	require('./database');

bd.conectaDatabase("crudJade", "usuarios", function(err)
{
	app.listen(puerto);
	console.log("Express server iniciado en el " + puerto);	
});

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "jade");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

/*
	Para indicar que se envía y recibe información por medio de Json
	y el tamaño del encabezado permitido.
*/
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//Servicios REST...
app.get("/", function(req, res)
{
	res.render("index", {
		titulo 	:  	"RESTFul MongoDB - Módulos - Jade"
	});
});

//Traer todos los datos...
app.get('/getAllData', function(req, res)
{
	bd.crudUser({}, 1, function(devuelve){
		res.json(devuelve);
	});
});

//Crear un nuevo usuario...
app.post('/createData', function (req, res)
{
	bd.crearEditarUsuario(req.body, 1, function(status)
	{
		res.json(status);
	});
});

//Actualizar un usuario...
app.put('/updateData', function (req, res)
{
	bd.crearEditarUsuario(req.body, 2, function(status)
	{
		res.json(status);
	});
});

//Llevar un usuario...
app.get('/getData/:id', function(req, res)
{
	bd.crudUser({identifi : req.param("id")}, 2, function(devuelve){
		res.json(devuelve);
	});
});

//Eliminar un usuario...
app.delete('/deleteData/:id', function(req, res)
{
	bd.crudUser({identifi : req.param("id")}, 3, function(devuelve){
		res.json(devuelve);
	});
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});