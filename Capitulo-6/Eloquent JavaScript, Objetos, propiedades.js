// Objetos, principios.
// Declarar un objeto.
let dia1 = {
  ardilla: false,
  eventos: ["caminata nocturna", "jugar a la pelota", "ir a comprar"],
  horas: undefined
};

// Asignarle un valor a una propiedad de un objeto, y si no existe crearla y asignarle ese valor.
dia1.lobo = false;
console.log(dia1.lobo);
console.log(dia1.eventos);
dia1.castor = false;
console.log(dia1);



// Eliminar una propiedad de un objeto.
delete dia1.lobo;
console.log(dia1);



// Evaluar con el operador binario in si un nombre de propiedad pertenece a un objeto.
console.log('ardilla' in dia1);
console.log('horas' in dia1);



// La funcion Object.keys(objeto) devuelve un array con los nombres de las propiedades que tiene objeto.
console.log(Object.keys(dia1));

console.log(Object.keys(dia1).length)




// Valores de propiedades

// valores: si se cambia el valor de una vinculacion a la cual otra hace referencia, la vinculacion b va a seguir valiendo lo que valia en su momento, no mutan.
let a = 1
let b = a;

console.log(a)
console.log(b)
a = 2;
console.log(a)
console.log(b)

let objeto1 = { valor: 10 };
let objeto2 = objeto1;
let objeto3 = { valor: 10 };
console.log(objeto1 == objeto2);
// → true
console.log(objeto1 == objeto3);
// → false



// Si se cambia una propiedad a un objeto, en todas las vinculaciones que hagan referencia a ese objeto va a cambiar tambien esa misma propiedad. Mutabilidad, son mutables.
objeto1.valor = 15;
console.log(objeto2.valor);
// → 15
console.log(objeto3.valor);
// → 10
const array = [1, 2, 3]
array[0] = 0
console.log(array)



// Aunque sea una vinculacion constante, lo que cambia son las propiedades del objeto y no el valor en si
const objeto = { valor: 0 };



// Esto es permitido
objeto.valor = 1;
console.log(objeto)
//Se esta cambiando el valor de una propiedad y no el valor de la vinculacion en si

// Esto no esta permitido:
//objeto = 1     Assignment to constant variable.





let JOURNAL = [1, 2, 3, 4]

// Recorre los elementos de un array
for (entrada of JOURNAL) {
  console.log(entrada)
}

let palabra = "abcdef"
for (caracteres of palabra) {
  console.log(caracteres)
}