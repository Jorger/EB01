var mysql   = 	require('mysql'), 
	express = 	require("express"),
	app		= 	express(), 
	cons 	=	require("consolidate"), 
	puerto 		= 	8081;

var conexion = mysql.createConnection({
  host     	: 'localhost',
  user     	: 'root',
  password 	: 'root', 
  database 	: 'aplicacion'
});
conexion.connect();

app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");

app.get("/", function(req, res)
{
	//var sql = "select nombre, apellido from usuarios where nombre like '%jo%' order by nombre";
	var sql = "select nombre, apellido from usuarios where nombre like '%jo%' and apellido like '%a%' order by nombre";
	conexion.query(sql, function(err, rows, fields)
	{
		//conexion.end();
		var usuarios = [];
		if (err) throw err;
		for(var i in rows)
		{
			usuarios.push(rows[i]);
		}
		res.render("usuarios", {usuarios : usuarios, titulo : "Usuarios Mysql"});
	});
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res){
	//Para el request...
	//res.send("Página no encontrada :(", 404);
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);	