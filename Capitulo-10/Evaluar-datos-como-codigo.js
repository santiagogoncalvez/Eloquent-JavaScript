// Evaluar datos como código:

// Funcion eval()
// La funcion eval recibe una cadena de texto (string) y lo que hace es ejecutar esa cadena como si fuera código de JavaScript:

eval("console.log('Hola')");
console.log(eval('3 + 5'));



// Usar constructor Function():
/* Este toma dos argumentos: un string que contiene una
lista de nombres de argumentos separados por comas y un string que contiene
el cuerpo de la función: */

let plusOne = Function("n", "return n + 1;");
console.log(plusOne(5));