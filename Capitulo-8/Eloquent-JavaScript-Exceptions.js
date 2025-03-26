

// Exceptions

/*
Throw produce una excepcion
try comienza ejecutando el bloque, y si este bloque causa una excepcion para ser producida
se evalua el bloque catch.
A la derecha de trow va lo que se le va apasar como argument a catch.

new Error()
Es un constructor (Estandar) que crea un objeto con una propiedad massage (mensaje).

En la mayoría de los entornos de
JavaScript, las instancias de este constructor también recopilan información
sobre la pila de llamadas que existía cuando se creó la excepción, algo llamado
seguimiento de la pila.

Esta información se almacena en la propiedad stack
(“pila”) y puede ser útil al intentar depurar un problema: esta nos dice la función     
donde ocurrió el problema y qué funciones realizaron la llamada.
*/ 

function promptDirection (question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw Error("Invalid direction " + result);
};

function look () {
    if (promptDirection("Which way") == "L") {
        return "a house";
    } else {
        return "two angry bears"
    };
};


try {
    console.log("You see", look());
} catch (error) {
    console.log("Something went wrong " + error)
    console.log(error.stack);
}




// Otro ejemplo
try {
    let number = "a";
    if (isNaN(number)) {
        throw new Error("Input character is not a number")
    };

    console.log(number * number);
} catch (error) {
    console.log(`Error: ${error}`);
};