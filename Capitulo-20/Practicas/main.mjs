import { reverse } from "./imports/reverse.mjs";

// El índice 2 contiene el primer argumento de línea de comando real
let argument = process.argv[2];
console.log(reverse(argument));