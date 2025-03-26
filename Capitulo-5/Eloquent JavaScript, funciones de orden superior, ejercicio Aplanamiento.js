// Ejercicio aplanamiento; capitulo 4
let array = [[1,2,3], [4,5,6]];
console.log(array.reduce((n, elemento) => n.concat(elemento)));

// el metodo reduce devuelve un array ya que empieza a iterar desde el segundo elemento del array,
// y empieza a concatenar


// El metodo concat() concatena los elementos de 2 arrays o de un array con un valor. 
let valor = 1;
let array2 = [2,3];
console.log(array2.concat(valor))