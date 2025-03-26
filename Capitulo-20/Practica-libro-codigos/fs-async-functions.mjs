//El 'node:fs/promises' módulo exporta la mayoría de las mismas funciones que el 'node:fs' módulo anterior, pero utiliza promesas en lugar de funciones de devolución de llamada.
import { readFile } from "node:fs/promises";
readFile("./sample-files/text.txt", "utf8").then(text => console.log("El archivo contiene:",  text));