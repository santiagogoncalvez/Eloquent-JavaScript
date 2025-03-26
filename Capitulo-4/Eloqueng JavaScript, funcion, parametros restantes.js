// Aceptar todos los parametros que se le pasen a una funcion
function maximo(...numeros) {
    let numeroMax = -Infinity;

    for (let numero of numeros) {
        if (numero > numeroMax) numeroMax = numero;
    }

    return numeroMax;
}

console.log(maximo(1, 2, 3, 4))

// Se puede usar la notacion de tres-puntos para pasar un array de argumentos:
let arrayNumeros = [1, 2, 4, 8];

console.log(maximo(...arrayNumeros))    //  8


// La notación de corchetes para crear arrays permite al operador de tres-puntos
// extender otro array en el nuevo array:
let palabras = ["nunca", "entenderas"];
console.log(["tu", ...palabras, "completamente"]);   //['tu', 'nunca', 'entenderas', 'completamente']



