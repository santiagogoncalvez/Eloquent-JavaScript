//Muchas de las funciones de 'node:fs' también tienen una variante síncrona, que tiene el mismo nombre con 'Sync' al final.
import { readFileSync } from "node:fs";
console.log(
   "El archivo contiene:",
   readFileSync("./sample-files/text-2.txt", "utf8")
);
