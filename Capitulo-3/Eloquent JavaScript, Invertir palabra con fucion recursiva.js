function invertirString(palabra) {
  // Caso base: Si la palabra tiene longitud 0 o 1, ya está invertida.
  if (palabra.length <= 1) {
    return palabra;
  } else {
    // La última letra de la palabra se coloca al principio y se llama recursivamente con la subcadena restante.
    return palabra[palabra.length - 1] + invertirString(palabra.slice(0, palabra.length - 1));
  }
}

console.log(invertirString("hola")); // Devuelve la palabra invertida