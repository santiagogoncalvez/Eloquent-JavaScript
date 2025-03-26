// Funcioo Promise

/*
Promise.resolve: es una funcion que se asegura de que el valor que le des, sea envuelto en una promesa. Si ya es una promesa, simplemente es retornada, de lo contrario, obtienes una nueva promesa que termina de inmediato con tu valor
como su resultado.
*/

let fiveteen = Promise.resolve(15);
fiveteen.then(result => console.log(`I got ${result}`));


/*
Promise.reject: es una funcion  que crea una nueva promesa inmediatamente rechazada.
*/

let error = Promise.reject(new Error("Error critico"))
error.catch(exception => console.log(exception))