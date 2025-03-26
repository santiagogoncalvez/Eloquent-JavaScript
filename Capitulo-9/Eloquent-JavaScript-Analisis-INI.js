/*➡️Análisi de un archivo INI*/
// Leer la informacion de un archivo de configuracion tipo INI:

// La tarea es convertir un string del tipo INI en un objeto cuyas propiedades sean: antes de la primera seccion van las propiedades sin seccion, y luego van los nombres de las secciones como propiedades, y sus valores son objetos que contienen las configuraciones de esa sección.


// ✔️Dato: Algunos sistemas operativos, sin embargo, usan no solo un carácter de nueva línea para separar lineas sino un carácter de retorno de carro seguido de una nueva línea ("\r \n").

// ✔️Dato: el método split permite una expresión regular como argumento.


function parseINI (string) {
    // Empezar con un objeto para mantener los campos de nivel superior
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach(line => {
        let match;
        if (match = line.match(/^(\w+)=(.*)$/)) {
            section[match[1]] = match[2];
        } else if (match = line.match(/^\[(.*)\]$/)) {
            section = result[match[1]] = {};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error("Line ´" + line + "'is not valid.");
        }
    });

    return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`
));

console.log(parseINI(`
searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn
`));