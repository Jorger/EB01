var express 	= 	require("express"),
	app			= 	express(), 
	cons 		=	require("consolidate"), 
	MongoClient = 	require("mongodb").MongoClient,
	puerto 		= 	8081, 
	db;

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");


MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, database)
{
	if(err) throw err;
	//Buscar un documento en la colección...
	db = database;
	app.listen(puerto);
	console.log("Express server iniciado en el " + puerto);	
});

app.get("/", function(req, res)
{
	//{"sort" : "nombre"}
	var opciones = {
					"sort" : ["edad", "acs"]
	}
	/*
	var opciones = {
					"sort" : [["nombre", "asc"], ["apellido", "desc"]]
	}
	*/
	/*
	db.collection("usuarios").find({}, opciones, function(err, datos)
	{
		var usuarios = [];
		datos.each(function(err, dato) 
		{
			if(dato !== null)
			{
				usuarios.push(dato);
			}
			else
			{
				res.render("usuarios", {usuarios : usuarios, titulo : "Usuarios UDEC"});
			}
		});		
	});
	*/
	var query = {edad : {$gt : 30, $lte : 60}};
	db.collection("usuarios").find(query, opciones).toArray(function (err, items){
        //res.json(items);
        res.render("usuarios", {usuarios : items, titulo : "Usuarios UDEC"});
    });
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	//Para el request...
	//res.send("Página no encontrada :(", 404);
	res.status(404).send("Página no encontrada :( en el momento");
});