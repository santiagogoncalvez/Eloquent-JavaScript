// Funciones generadoras

/*
- Cuando defines una función con function* se convierte en un generador.

-Cuando llamas un generador, este retorna un iterador.


-Cada vez que llames next en el iterador, la función se ejecuta hasta
que encuentre una expresión yield (“arrojar”), que la pausa y causa que el valor arrojado se convierta en el siguiente valor producido por el iterador.

-Cuando La función retorne, si es que retorna, el iterador está completo.

-Yield solo pueden ocurrir directamente en la función
generadora en sí y no en una función interna que definas dentro de ella.
*/

function* powers(n) {
    for (let current = n; ; current *= n) {
        yield current;
    };
}

for (let power of powers(3)) {
    if (power > 50) break;
    console.log(power);
}

// 3
// 9
// 27


// Ejemplo de iterador con funcion generadora
class Group {
    constructor(elements) {
        this.members = elements;
    }
}

Group.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this.members.length; i++) {
        yield this.members[i];
    }
};

let group1 = new Group([1, 2, 3]);
let iterator = group1[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (element of group1) {
    console.log(element)
};




// Funciones generadoras asíncronas

// Hacer peticiones http varias veces a traves de un iterador asíncrono, asi se piden datos solo cuando se necesitan (bajo demanda):

async function* request() {
    let i = 1;
    let url = 'https://jsonplaceholder.typicode.com/todos/';

    while (true) {
        let resp = await fetch(url + i);
        let json = await resp.json();

        yield json;
        i++;
    }
}

let response = request()

async function get() {
    console.log(await response.next())
}

get();
get();
get();