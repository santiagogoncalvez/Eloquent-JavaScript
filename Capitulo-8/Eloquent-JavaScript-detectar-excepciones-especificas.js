// Detectar excepciones especificas
class ErrorInput extends Error {
    constructor(massage) {
        super(massage)
        this.name = "error input";
    };
};

function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw ErrorInput("Invalid direction: " + result);
};

for (; ;) {
    try {
        let direction = promptDirection("Where?");
        console.log("You chose ", direction);
        break;
    } catch (e) {
        // Aca el detecta si el error recibido es una  instancia de ErrorInput, es decir si el error que ocurrio es del tipo ErrorInput
        if (e instanceof ErrorInput) {
            console.log("Not a valid direction. Try again");
        } else {
            throw e;
        };
    };
};

/*
Este codigo captura solo las instancias de error y dejará que las excepciones no
relacionadas pasen a través.
*/