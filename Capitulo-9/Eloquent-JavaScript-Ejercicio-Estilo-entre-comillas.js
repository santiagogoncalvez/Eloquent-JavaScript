// Capitulo 9, ejercicio Estilo entre comillas

let text = "'I'm the cook,' he said, 'it's my job.'";
let expReg = /(\B)'(\w|\W)|(\w|\W)'(\B)/g;

console.log(text.replace(/(\w|\W)'(\B)/g, '$1"$2'));
console.log(text.replace(/(\B)'(\w|\W)/g, '$1"$2'));

function replaceQuotes(...arrGroups) {

    if (/'./.test(arrGroups[0])) {
        return arrGroups[1] + '"' + arrGroups[2];
    } else {
        if (/.'/g.test(arrGroups[0])) {
            return arrGroups[3] + '"' + arrGroups[4];
        }
    }
}

console.log(text.replace(expReg, replaceQuotes));




// Solucion del libro
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'))

// Explicacion:
/*
Las opciones son 
Comilla simple de apertura:
    Puede ser una comilla simple que le preceda un caracter no alfanumerico o una que este al principio de la cadena.

Comilla simple de cierre:
    Puede ser una comillasimple que le siga un caracter no alfanumerico o una que este al final de la cadena
        
*/