var MongoClient = 	require("mongodb").MongoClient, 
	fs      	= 	require('fs'), coleccion; 

exports.conectaDatabase = function(nomBase, nomColeccion, callback)
{
	MongoClient.connect("mongodb://127.0.0.1:27017/" + nomBase, function(err, database)
	{
		if(err) throw err;
		coleccion =  database.collection(nomColeccion);
		callback(err);
	});
};

exports.crearEditarUsuario = function(data, tipo, callback)
{
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
	console.log(query, tipo);
	var cursor = coleccion.find(query);
	cursor.count(function(err, count)
	{
  		if(count === 0)
  		{
  			if(tipo === 1)
  			{
	  			if(data.foto != "")
	  			{
	  				creaFotoUser(data.foto, function(foto)
	  				{
	  					data.foto = foto;
	  					coleccion.insert(data, function(err, records)
						{
	  						callback({status : true});
						});
	  				});
	  			}
	  			else
	  			{
	  				data.foto = "sinFoto.png";
	  				coleccion.insert(data, function(err, records)
					{
	  					callback({status : true});
					});
	  			}
	  		}
	  		else
	  		{
	  			if(data.foto !== "" && data.tomada)
	  			{
	  				creaFotoUser(data.foto, function(foto)
	  				{
	  					data.foto = foto;
	  					coleccion.update({identifi : data.identifi}, data, function(err, actualiza)
						{
		  					//console.log("Acrtualiza: " + actualiza);
		  					callback({status : true});
						});
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
  		}
  		else
  		{
  			callback({status : false});
  		}
	});
};

exports.crudUser = function(query, tipo, callback)
{
	if(tipo === 1)
	{
		var opciones = {"sort" : ["nombre", "acs"]};
		var cursor = coleccion.find(query, opciones);
		cursor.toArray(function(err, doc)
		{
			if(err)
			{
				throw err;
			}
			callback(doc);
		});
	}
	else
	{
		if(tipo === 2)
		{
			coleccion.findOne(query, function(err, doc)
			{
				var devuelve = {datos : doc !== null ? doc : "", status : doc !== null ? true : false};
				callback(devuelve);
			});
		}
		else
		{
			if(tipo === 3)
			{
				coleccion.remove(query, function(err, eliminado)
				{
					//res.json({status : ind >= 0 ? true : false});
					callback({status : true});
				});
			}
		}
	}	
};

var creaFotoUser = function(data, callback)
{
	var base64Data = data.replace(/^data:image\/png;base64,/, "");
	base64Data  +=  base64Data.replace('+', ' ');
	var binaryData = new Buffer(base64Data, 'base64').toString('binary');
	//Crear el nombre de la imagen...
	var nomImagen = generateUUID() + ".png";
	var imagen = __dirname + "/public/fotos/" + nomImagen;
	fs.writeFile(imagen, binaryData, "binary", function (err)
	{
    	callback(nomImagen);
    	//console.log(err);
	});
};

var generateUUID = function()
{
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};