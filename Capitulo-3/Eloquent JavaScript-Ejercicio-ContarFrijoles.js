// Funcion que cuenta cuantos caracteres hay de uno en especifico en un string:

// Con funcion recursiva
function contarFs(palabra) {
    if (palabra.length == 1) {
        if (palabra[0] == "F") {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (palabra[0] == "F") {
            return 1 + contarFs(palabra.slice(1, palabra.length))
        } else {
            return 0 + contarFs(palabra.slice(1, palabra.length))
        }
    }
};
console.log(contarFs("holaFFFkajsFkdksFF"));


function contarCaracteres(palabra, caracter) {
    if (palabra.length == 1) {
        if (palabra[0] == caracter) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (palabra[0] == caracter) {
            return 1 + contarCaracteres(palabra.slice(1, palabra.length), caracter)
        } else {
            return 0 + contarCaracteres(palabra.slice(1, palabra.length), caracter)
        }
    }
};
console.log(contarCaracteres("santiagoaaa", "a"))


// Con una funcion con un ciclo:
function contarFs2(palabra) {
    let contador = 0;

    for (i = 0; i <= palabra.length - 1; i++) {
        if (palabra[i] == "F") {
            contador += 1;
        };
    };

    return contador;
}

console.log(contarFs2("FiFa"));


function contarCaracter(palabra, caracter) {
    let contador = 0;

    for (i = 0; i <= palabra.length - 1; i++) {
        if (palabra[i] == caracter) {
            contador += 1;
        };
    };

    return contador;
}

console.log(contarCaracter("FiFaajda","a"));