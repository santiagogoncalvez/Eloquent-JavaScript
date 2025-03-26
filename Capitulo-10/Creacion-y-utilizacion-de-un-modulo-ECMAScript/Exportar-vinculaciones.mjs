// Creación de módulo

// Exportar vinculacion por default:
const word = "Binding default"
export default  word;


// Exportar variables:
export const date = 10;

// Exportar más de una variable en una sola sentencia:
let num1 = 1, num2 = 2;

export {num1, num2};

// Exportar funciones
export const plusOne = function (number) {
    return number + 1;
};

export const plusTwo = function (number) {
    return number + 2;
};

export let plusThree = function (number) {
    return number + 3;
};



// Exportar clases
export class MultiplyByTwo {
    constructor (number) {
        this.result = number * 2
    }
};