var mysql      = require('mysql');
var conexion = mysql.createConnection({
  host     	: 'localhost',
  user     	: 'root',
  password 	: 'root'
});
 
conexion.connect();

conexion.query('SELECT 1 + 1 AS solucion', function(err, rows, fields)
{
	if (err) throw err;
  	console.log('La solución es: ', rows[0].solucion);
});
conexion.end();