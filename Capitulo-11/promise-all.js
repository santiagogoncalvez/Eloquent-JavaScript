// Utilizando y entendiendo Promise.all

/*
Promise.all: se utiliza al trabajar con colecciones de promesas que se ejecutan al mismo tiempo.

Esta retorna una promesa que espera a que se resuelvan todas las promesas del array, y luego resuelve un array de los valores que estas promesas produjeron. 

Si alguna promesa es rechazada, el el resultado de Promise.all es en sí mismo rechazado.

*/


function asyncOperation(id) {
    return new Promise((resolve, reject) => {
        // Simulación de un tiempo de espera aleatorio entre 1 y 3 segundos
        let delay = Math.floor(Math.random() * 3000) + 1000;
        setTimeout(() => {
            resolve(`Async operation ${id} completed at ${delay}ms`);
        }, delay)
    });
}


// Array de promesas que representan operaciones asincrónicas
let promises = [
    asyncOperation(1),
    asyncOperation(2),
    asyncOperation(3)
];

// Utilización de Promise.all() para esperar a que todas las promesas se resuelvan
Promise.all(promises)
    .then((results) => {
        // Se ejecuta cuando todas las promesas se han resuelto correctamente
        console.log("All asynchronous operations completed:");
        console.log("Results");
        console.log(results);
        results.forEach((result) => {
            console.log(result)
        })
    })
    .catch((error) => {
        console.error("At least one asynchronous operation failed", error)
    })