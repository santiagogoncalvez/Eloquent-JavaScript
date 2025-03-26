// Metodos en arrays
let array = [1,2,3];

// array.push(): Agrega el elemento dado como argumento al final de un array
array.push(3);
console.log(array);

// array.pop(): Quita el ultimo elemento de un array y lo retorna
array.pop();
console.log(array);

// array.unshift(): Agrega el elemento dado al principio de un array
array.unshift(4);
console.log(array);

// array.shift(): Quita el primer elemento de un array y lo retorna
console.log(array.shift());
console.log(array);

let JOURNAL = [1,2,3,4];

// El ciclo for(... of variable): Recorre los elementos de un array dado a la derecha del conector of ("en")
for (entrada of JOURNAL) {
  console.log(entrada);
};

// Lo mismo pasa con un string
let palabra = "abcdef"
for(caracteres of palabra) {
  console.log(caracteres);
};


// array.indexOf(valor): Retorna el indice donde se encuentra el valor dado en un array,
// y si no esta el elemento retorna -1
console.log(JOURNAL.indexOf(4)); // 3


// array.slice(): Este metodo toma indices de inicio y fin, 
// y retorna un array que solo tiene los elementos entre ellos
console.log([1,2,3,4].slice(2,4));


// array.concat(): Este metodo ("concatenar") se puede usar para unir arrays y crear un nuevo array
let array1 = [1,2];
let array2 = [3,4];;
console.log(array1.concat(array2));   // [1,2,3,4]

// Funcion que toma un array y un índice, y retorna un nuevo array que es una copia del 
// array original pero eliminando al elemento en el índice dado:
function remover (array, indice) {
    return array.slice(0, indice).concat(array.slice(indice + 1));
};

console.log(remover([1,2,3,4], 2));


let array3 = [10];
// Si se le pasa a .concat() un argumento que no es un array ese valor se agrega al nuevo array
// como si fuera un array de un solo elemento
console.log(array3.concat(23))