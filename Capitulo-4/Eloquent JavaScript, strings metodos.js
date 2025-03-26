// Caracteristicas y metodos en strings

// slice(): recorta un string
console.log("abcd".slice(0,3));   // "abc"


//indexOf(): retorna el indice del string que se le pasa
console.log("abcd".indexOf("d"));   //  "3"


// trim(): Elimina los espacios en blanco (espacios, saltos
// de linea, tabulaciones y caracteres similares) de inicio al final de un string
console.log("  palabra  \n   ".trim());    //  "palabra"


// padStart(): toma la longitud como argumento, y rellena el resultado 
// con el segundo argumento que se le pase
console.log("1".padStart(4, 0));

// split(): perimite dividir un strin en sus ocurrencias
let palabra = "hola como estas"
let palabraDividida = palabra.split(" ")
console.log(palabraDividida)

let palabraUnida = palabraDividida.join(" ")
console.log(palabraUnida)

console.log(palabraUnida[3])


// repeat(): crea unnuevo string que contiene múltiples copias concatenadas del string original.
console.log("LA".repeat(3));   // → LALALA

