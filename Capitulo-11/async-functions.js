// Funciones asincronas:

/*
Las funciones asincronicas "async function" no se ejecutan como una función regular de JavaScript de principio a fin de una sola vez.

Puede ser congelada en cualquier punto que tenga un await, esperando su devolucion de promesa, y se reanuda, la ejecucion de la funcion, solo cuando la promesa sea resuelta o rechazada.

La funcion se pausa en ese lugar, pero la ejecucion del codigo en general sigue su flujo.
 */

// Ejemplo:

function someAsyncFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 7000)
    })
};

async function ejemplo() {
    console.log('Inicio de la función asíncrona');

    const resultado = await someAsyncFunction();

    console.log('Después de esperar la promesa');
    console.log(resultado);
}

async function otraFuncion() {
    console.log('Inicio de otra función');

    await new Promise(resolve => setTimeout(resolve, 4000)); // Espera 2 segundos

    console.log('Fin de otra función');
}

ejemplo();
otraFuncion();
console.log('Fuera de las funciones');




/*
Dentro de una función async, la palabra await se puede poner delante de una
expresión para esperar a que se resuelva una promesa, y solo entonces continua
la ejecución de la función.

Para código asincrónico no-trivial, esta notación suele ser más conveniente
que usar promesas directamente. Incluso si necesitas hacer algo que no se ajuste
al modelo síncrono, como realizar múltiples acciones al mismo tiempo, es fácil
combinar await con el uso directo de promesas.
*/