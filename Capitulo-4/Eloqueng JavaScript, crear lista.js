// Funcion que contruye una esctructura de lista cuando se le da [1,2,3]

function arrayLista([n1, n2, n3]) {
    let list = {};

    list.value = n1;
    list.rest = {};

    list.rest.value = n2;
    list.rest.rest = {};

    list.rest.rest.value = n3;
    list.rest.rest.rest = null;

    return list;
}


// Funcion que pasa una lista a un array
function listaArray(list) {
    let array = [];

    array[0] = list.value;
    array[1] = list.rest.value;
    array[2] = list.rest.rest.value;

    return array;
}

// Funcion que toma un array de cualquier tamaño distinto de 0, y crea una lista enlazada con esos elementos.
function arrayLista2(array) {
    if (array.length == 0) return null;

    let lista = {
        valor: array[0],
        resto: null
    };

    let actual = lista

    for (let i = 1; i < array.length; i++) {

        actual.resto = {
            valor: array[i],
            resto: null
        };

        actual = actual.resto;
    };

    return lista;
};

// Funcion que toma una lista enlazada y devuelve un array con los elementos de esa lista
function listaArray2(lista) {
    let array = [];

    array[0] = lista.valor;

    let actual = lista.resto;

    for (let i = 1; actual != null; i++) {
        array[i] = actual.valor;
        actual = actual.resto;
        console.log()
    };

    return array;
}

// Funcion que hace una copia de una lista y agrega al frente el valor que se le pase
function preceder(listaBase, precedente) {

    let listaa = {
        valor: precedente,
        resto: listaBase
    };

    return listaa;
};


// Funcion que busca un elemento en una lista y devuelve su pocision, con ciclo
function posicion(lista, valor) {
    let actual = lista;
    let posicion = undefined;

    for (let i = 0; actual != null; i++) {
        if (actual.valor == valor) posicion = i;
        actual = actual.resto;
    };

    return posicion;
}

// Otra version de la funcion anterior

// Funcion que busca un elemento en una lista y devuelve su pocision, recursivo
function posicionRec(lista, valor) {
    function posicion(lista, valor, i = 0) {



        if (lista === null) {
            return undefined
        };

        if (lista.valor === valor) {
            return i;
        }


        return posicion(lista.resto, valor, i + 1);
    };

    return posicion(lista, valor)
}




let list = arrayLista([1, 2, 3]);
console.log(list);

let array = listaArray(list);
console.log(array);

let lista = arrayLista2([1, 2, 3, 4]);
console.log(lista);

let array2 = listaArray2(lista);
console.log(array2)

console.log(preceder(list, 3));


console.log(posicion(lista, 3))
console.log(posicionRec(lista, 4))


