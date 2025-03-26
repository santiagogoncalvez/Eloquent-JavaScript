
// Desesctructuracion:

// La sintaxis de desestructuración es una expresión de JavaScript que permite desempacar
//  valores de arreglos o propiedades de objetos en distintas variables.


// Si se le pasa un array como argumento a una funcion, dentro de los parametros de la funcion, 
// en el array ya se pueden establecer las vinculaciones de esos elementos para utilizarlos en la funcion
function phi([n00, n01, n10, n11]) {
    return (n11 * n00 - n10 * n01) /
        Math.sqrt((n10 + n11) * (n00 + n01) *
            (n01 + n11) * (n00 + n10));
};



// Desestructuración de arrays:

/* Se puede asignar a un array de vinculaciones un array de valores, en el que cada
elemento del array de la derecha se le va a asignar respectivamente a cada vinculacion del
el array de la izquierda */

/* La desestructuración utiliza una sintaxis en la que en el lado izquierdo se encuentran
las vinculaciones en las que se va a desempacar los valores  del array u objeto de la derecha respectivamente */
{
    let a, b;
    [a, b] = [10, 20];

    console.log(a);   // 10
    console.log(b);
}  // 20



// Asignacion basica de variables

// Desestructuracion junto a la declaracion de variables
const foo = ['uno', 'dos', 'tres'];
const [d, e, h] = foo;          // Se le asigna a cada valor del array, cada valor de la vinculacion foo, que es un array, respectivamente.

console.log(d);      // 'uno'
console.log(e);      //'dos'
console.log(h);      //'tres'


// Desestructuracion separada de la declaracion de variables
let i, j;

[i, j] = [10, 20];

console.log(i);     //10
console.log(j);     //20


// Valores predeterminados
/*  A una variable se le puede asignar un valor predeterminado en el caso 
    de que el valor del arreglo desempacado sea undefined o no se pase ningun valor */
let k, l;

[k = 1, j = 2] = [5];

console.log(k);     //5
console.log(j);     //6


// Intercambio de variables
/*  Los valores de dos variables de pueden intercambiar por medio de una 
    expresion de desestructuracion*/
let m = 1;
let n = 2;

[m, n] = [n, m];

console.log(m);     // 2
console.log(n);     // 1


// se puede hacer lo mismo con una funcion que retorna un array
function fu() {
    return [2, 4];
};

let o, p;
[o, p] = fu();

console.log(o);     // 2
console.log(p);     // 4


// Asignar el resto de un arreglo a una variable
[a, b, ...rest] = [30, 40, 50, 60, 70];
console.log(a);         // 30
console.log(b);         // 40
console.log(rest);      // [50, 60, 70]





// Desestructuración de objetos

// Asignacion basica
const user = {
    id: 42,
    is_verified: true
};

const { id, is_verified } = user;

console.log(id);                // 42
console.log(is_verified);       // true


// Asignacion sin declaracion
/* Si no se declararor previamente las variables hay que poner la expresion
dentro de parentesis ya que la expresion de la izquierda {} es entendida como un bloque de 
codigo*/
let nombre, edad;

({ nombre, edad } = { nombre: 'Pablo', edad: '18' });

console.log(nombre)         // 'Pablo'
console.log(edad)           // 18

/*Se le asigna a cada vinculacion de la izquierda, cada valor de propiedad del mismo nombre
que este en el objeto de la derecha */


// Una propiedad se puede desempacar de un objeto y asignar a una variable con un 
// nombre diferente al de la propiedad del objeto.
const objeto = { p: 44, q: true };
const { p: fooo, q: bar } = objeto;

console.log(fooo); // 42
console.log(bar); // true


// Esto no se puede realizar. las propiedades de la derecha tienen que tener los mismos nombres
// que las vinculaciones de la izquierda.
({ f, g } = { c: 20, d: 30 });

console.log(f);