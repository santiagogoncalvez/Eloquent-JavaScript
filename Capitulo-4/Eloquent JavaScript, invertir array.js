// Invertir array

// Funcion que retorna un array nuevo invertido
function invertirNuevo(array) {
    let arrayInv = array;
    let j = 0;
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        [arrayInv[j], arrayInv[i]] = [arrayInv[i], arrayInv[j]]

        j--
    }

};

// Funcion que modifica el mismo array y lo invierte metodo 1;
function invertirMismo(array) {
    let aux;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            aux = array[i];
            array[i] = array[j];
            array[j] = aux;

        };
    };
};


// Funcion que modifica el mismo array y lo invierte metodo 2
// El metodo consiste en intercambiar primero con ultimo, segundo con penultimo... y asi;
function invertirMismo2(array) {
    let j = array.length - 1;
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        [array[j], array[i]] = [array[i], array[j]]

        j--
    }
}




let array1 = [3, 4, 5, 6];
console.log(array1)
console.log(invertirNuevo(array1));

let array2 = [2, 3, 4, 5];
invertirMismo(array2)
console.log(array2)

let array3 = [10, 11, 12, 13];
invertirMismo2(array3)
console.log(array3)

// for (element of array1) {
//     console.log(element)
//     console.log(array1[element])
//     console.log(array1)
// }