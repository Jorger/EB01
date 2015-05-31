$(function()
{
    var socketURL = 'http://' + window.location.host;
    var socket = io.connect(socketURL);
    $('#nombre').val(localStorage.getItem("nombre") ? localStorage.getItem("nombre") : "");
    $("#nombre").focusout(function()
    {
        if($(this).val() !== "")
        {
            localStorage.setItem("nombre", $(this).val());
        }
    });

    //Presione sobre el botón enviar
    $('#enviar').click(function()
    {
        enviarMensaje();
    });
    //Presione la tecla ENTER...
    $('#mensaje').keyup(function(evt)
    {
        if ((evt.keyCode || evt.which) == 13)
        {
            enviarMensaje();
            return false;
        }
    });
    
    //Cuando llega un nuevo mensaje...
    socket.on('nuevoMensaje', function(data)
    {
        var nombre = data.nombre || 'Anónimo';
        var msg = $('<div class="msg"></div>')
            .append('<span class="nombre">' + nombre + '</span>: ')
            .append('<span class="text">' + data.msg + '</span>');
        $('#mensajes')
            .append(msg)
            .animate({scrollTop: $('#mensajes').prop('scrollHeight')}, 0);
    });

    //Para enviar un mensaje...
    var enviarMensaje = function()
    {
        if($('#mensaje').val() !== "")
        {
            socket.emit('enviaMensaje', {
                                    nombre: $('#nombre').val(),
                                    msg: $('#mensaje').val()
                                });
            $('#mensaje').val('');
        }
        return false;
    };
});