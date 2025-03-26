// Ejercicio cada, capitulo 4

// Funcion every con ciclo:
function everyConCiclo(array, funcionPredicado) {
    contadorTrue = 0;

    for (element of array) {
        if (funcionPredicado(element)) {
            contadorTrue++;
        };
    };

    if (contadorTrue == array.length) {
        return true;
    } else return false;
}

// Segunda opcion con ciclo:
function everyConCiclo2 (array, funcionPredicado) {

    for (element of array) {
        if (!funcionPredicado(element)) return false;
    }

    return true;
}

console.log(everyConCiclo([2, 4, 6, 8, 4], n => n % 2 == 0))
console.log(everyConCiclo2([10,12,14], n => n % 2 == 0))




// Funcion every con metodo some:
function everyConSome (array, funcionPredicado) {

    // El metodo some va a buscar en vez de un elemento que cumple el predicado,
    // un elemento que no cumpla el predicado, y si lo encuentra significa que no todos cumplen el predicado.
    // Por lo tanto el resultado final seria el opuesto al resultado encontrado, el resultado seria false en ese caso.
    return !array.some(element => !funcionPredicado(element));
}

console.log(everyConSome([2,4,6], n => n % 2 == 0));



