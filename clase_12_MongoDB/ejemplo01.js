//Buscar un elemento en una colección...
//Módulo síncrono...

var doc = db.names.findOne();
//var doc = db.usuarios.find({edad : {$gte : 30, $lte : 60}}, {"nombre" : true, "edad" : true}).sort({edad : 1}).pretty();
//Imprimir el resultado...
printjson(doc);