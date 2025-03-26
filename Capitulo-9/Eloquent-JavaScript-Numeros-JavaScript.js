// Capítulo 9, Ejercicio Números otra vez.

// El numero que hice yo:
// let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)$|^\d+[eE]([+\-]?\d+)$/;


// El resultado del libro:
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "13e2", "1E-4", "1e+12"]) {
    if (!number.test(str)) {
        console.log(`Failed to match '${str}'`);
    }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1","1e4.5",".5.", "1f5", "."]) {
    if (number.test(str)) {
        console.log(`Incorrectly accepted '${str}'`);
    }
}