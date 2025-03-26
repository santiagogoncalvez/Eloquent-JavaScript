// Suma de un rango

// funcion que  toma dos argumentos, inicio y final, y
// retorne un array que contenga todos los números desde inicio hasta (e incluyendo) final.
function rango(numero1, numero2, valorPaso = 1) {
    let array = [];

    if (numero2 > numero1) {
        for (let i = numero1; i <= numero2; i += valorPaso) {
            array.push(i);
        };
    } else {
        for (let i = numero1; i >= numero2; i += valorPaso) {
            array.push(i);
        };
    }

    return array;
};

// funcion que suma los valores de un array de numeros
function suma(arrayRango) {
    let suma = 0;

    for (elemento of arrayRango) {
        suma += elemento;
    };

    return suma;
};

console.log(rango( 10,1,-1))
console.log(suma(rango(1, 10)));