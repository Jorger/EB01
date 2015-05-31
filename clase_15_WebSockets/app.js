var express = require('express'), 
    app     = express(), 
    server  = require('http').createServer(app), 
    io      = require('socket.io').listen(server, {log: false}), 
    cons    = require("consolidate");

app.engine("html", cons.swig);
app.set("view engine", "jade");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

app.get("/", function(req, res)
{
    res.render("index", {
        titulo  :   "CHAT UDEC"
    });
});

io.sockets.on('connection', function (socket)
{
	socket.on('enviaMensaje', function (data) 
	{
		io.sockets.emit('nuevoMensaje', data);
	});
});
server.listen(process.env.PORT || 8081);