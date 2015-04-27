var clienteMongo = require("mongodb").MongoClient;

clienteMongo.connect("mongodb://127.0.0.1:27017/test", function(err, db)
{
	if(err) throw err;
	//Buscar un documento en la colección...
	var query = {"nombre" : "Carlos"};
	db.collection("usuarios").findOne(query, function(err, doc)
	{
		//Se imprime el resultado...
		console.log(doc);
		//Cerrar conexión a la base de datos...
		db.close();
	});
	console.log("Búqueda findOne");
});