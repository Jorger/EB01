exports.fecha = function()
{
	var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundo = fecha.getSeconds();
    var dia = fecha.getDate();
    var mes = Number(fecha.getMonth()) + 1;
    var year = fecha.getFullYear();
    var ampm = hora < 12 ? "am" : "pm";
    dia = dia <= 9 ? "0" + dia : dia;
    mes = mes <= 9 ? "0" + mes : mes;
    hora = hora > 12 ? hora -= 12 : hora;
    hora = hora <= 9 ? "0" + hora : hora;
    minutos = minutos <= 9 ? "0" + minutos : minutos;
    segundo = segundo <= 9 ? "0" + segundo : segundo;
    return  {
                "fecha" :   dia + "/" + mes + "/" + year, 
                "hora"  :   hora + ":" + minutos + ":" + segundo + ":" + ampm
            };
};