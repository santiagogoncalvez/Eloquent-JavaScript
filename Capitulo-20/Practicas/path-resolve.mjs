import { resolve } from "node:path";

//La función path.resolve([...paths]) se usa para resolver una ruta absoluta combinando los segmentos de ruta que le pases como argumentos.

// Convertir una ruta relativa en una absoluta
console.log(resolve("docs", "index.js"));

// Si hay una ruta absoluta, la devuelve sin cambios
console.log(resolve("/var/www", "index.js"));

// Normalización de ".." y "." en la ruta.
console.log(resolve("/foo/bar", "..", "docs", "./index.js"));

// Si no se le pasa ningun argumento devuelve el directorio actual
console.log(resolve());

console.log(resolve("/foo/bar", "/tmp/file/"));

console.log(resolve("wwwroot", "static_files/png/", "../gif/image.gif"));
