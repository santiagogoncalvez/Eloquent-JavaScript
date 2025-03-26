// Utilizacion de un módulo ECMAScript

// Importar vinculacion default. Si se importa una vinculacion sin cochetes alrededor, esta va a importar la vinculacion default del módulo:
import defaultBinding from "./Exportar-vinculaciones.mjs";
console.log(defaultBinding);


// Importar vinculaciones o datos:
import {date} from "./Exportar-vinculaciones.mjs";
console.log(date);



// Importar una o mas funciones:
import {plusOne, plusTwo} from "./Exportar-vinculaciones.mjs";

console.log(plusOne(1));     // 2
console.log(plusTwo(1));



// Importar y cambiar el nombre de la vinculacion con "as" (como):
import { plusThree as addThree } from "./Exportar-vinculaciones.mjs";

console.log(addThree(1));



// Importar clases:
import { MultiplyByTwo } from "./Exportar-vinculaciones.mjs";
console.log(new     MultiplyByTwo(10));