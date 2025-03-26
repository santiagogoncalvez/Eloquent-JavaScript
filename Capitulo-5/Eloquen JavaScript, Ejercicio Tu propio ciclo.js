// Ejercicio tu propio ciclo, capitulo 4

// Con funcion recursiva
function ciclo(valor, funcionPrueba, funcionActualizacion, funcionCuerpo) {
    if (!funcionPrueba(valor)) {
        return null;
    }

    funcionCuerpo(valor)

    return ciclo(funcionActualizacion(valor), funcionPrueba, funcionActualizacion, funcionCuerpo);
}

console.log(ciclo(4, n => n > 0, n => n - 1, console.log));


// Con funcion con ciclo
function ciclo2 (valor, funcionPrueba, funcionActualizacion,funcionCuerpo) {


    for(valor; funcionPrueba(valor); funcionActualizacion(valor)) {
funcionCuerpo(valor);
    };
}

console.log(ciclo2(5, n => n > 0, n => n - 1, console.log))
