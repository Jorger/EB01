var express = require("express"),
	app		= express(), puerto = 8081;

app.get("/", function(req, res){
	//Para el request...
	res.send("Hola Mundo");
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	//Para el request...
	//res.send("Página no encontrada :(", 404);
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el "+puerto);