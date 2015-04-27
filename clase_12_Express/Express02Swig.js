var express = 	require("express"),
	app		= 	express(), 
	cons 	=	require("consolidate"), 
	puerto 	= 	8081;

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));



var array = ["uno", "dos", "tres", "cuatro", "Cinco"];
var objeto = [
				{
					nombre 		: 	"Jorge", 
					apellido	: 	"Rubiano", 
					email		: 	"correo@correo.com", 
					activo		: 	true
				},
				{
					nombre 		: 	"María", 
					apellido	: 	"Pérez", 
					email		: 	"maria@correo.com",
					activo		: 	false
				},
				{
					nombre 		: 	"Pedro", 
					apellido	: 	"García", 
					email		: 	"pedro@correo.com", 
					activo		: 	true
				}];

app.get("/", function(req, res){
	//Para el request...
	//Nombre de la página a renderizar...
	res.render("hola", {
		nombre 	:  	"UDEC", 
		ubica 	: 	"Colombia", 
		array 	: 	array, 
		objeto	: 	objeto, 
		imagen	: 	"img/img_01.png"
	});
	//res.send("Hola Mundo");
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	//Para el request...
	//res.send("Página no encontrada :(", 404);
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);