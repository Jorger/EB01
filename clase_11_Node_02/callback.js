var tiempoMaximo = 1000; //Milisegundos...

// Sí es par, se dobla el valor.
// Si es imar, devuelve un error.
// las llamadas toman un tiempo aletorio de respuesta menor a un segundo.

var doblarValor = function(v, callback)
{
    var tiempoEspera = Math.floor(Math.random()*(tiempoMaximo+1));
    if(v % 2 !== 0)
    {
        setTimeout(function()
        {
            callback(new Error("Número Impar"));
        }, tiempoEspera);
    }
    else
    {
        setTimeout(function()
        {
            callback(null, v * 2, tiempoEspera);
        }, tiempoEspera);
    }
};

var contador = 0;
for (var i = 0; i < 10; i++)
{
    console.log("LLamado a la función doblarValor para el valor: " + i);
    doblarValor(i, function(error, resultado, tiempo)
    {
        if(error)
        {
            console.log("Error : "+ error.message);
        }
        else
        {
            console.log((resultado / 2) + ", El resultado es: " + resultado + " (" + tiempo + "ms)");
        }   
        if(++contador === 10)
        {
            console.log("Terminó!");
        }
    });
}
console.log("-----");