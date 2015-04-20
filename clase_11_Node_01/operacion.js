var numero = process.argv[2] || 0;
//Saber si el número es periodico...
var numPeriodico = function(val, callback)
{
	val = (val || "").toString();
	var PATRON_DECIMALES = /(?:[^\.]+\.\d*)(\d{2,})+(?:\1)$/, 
	   	PATRON_NUM_REPETIDOS = /^(\d+)(?:\1)$/,
	   	patron = PATRON_DECIMALES.exec(val);
	if(!patron)
	{
		val = val.replace( /\d$/, '' );
		patron = PATRON_DECIMALES.exec(val);
	}
	if(patron && 1 < patron.length)
	{
		patron[1] = PATRON_NUM_REPETIDOS.test(patron[1]) ? PATRON_NUM_REPETIDOS.exec(patron[1])[1] : patron[1];
	}
	callback(patron);
};
//Para hacer la conversión a fraccionarios...
numPeriodico(numero, function(valor)
{
	var negativo = false;		
	if(valor < 0)
	{
		valor *= -1; //Se deja positivo por defecto...
		negativo = true;
	}
	var parteValor = String(valor[0]).split(".");
	var numerador = denominador = 0;
	if(valor)
	{
		var repite = valor[1]; //El valor que se repite...
		var entero = Number(parteValor[0]);
		var decimal = parteValor[1];
		denominador = Math.pow(10, repite.length) - 1;
		//Saber si se repite desde el principio...
		if(decimal.indexOf(repite) === 0)
		{
			//Inicia desde el principio...
			numerador = (denominador * entero) + Number(repite);
		}
		else
		{
			var norepite = decimal.substr(0, decimal.indexOf(repite));
			denominador *= Math.pow(10, norepite.length);
			//Une el valor que no se repite con el valor periódico...
			var uneRepite = Number(norepite + repite) - Number(norepite);
			numerador = (denominador * entero) + Number(uneRepite);
		}
	}
	else
	{
		denominador = Math.pow(10, parteValor[1].length);
		numerador = valor * denominador;
	}
	console.log((negativo ? "-" : "") + simplificaFraccionario(numerador + "/" + denominador));
});