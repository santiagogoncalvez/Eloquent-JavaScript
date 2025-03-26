// Calculando correlacion de variables a traves del coeficiente phi(φ)
function phi(tabla) {
    return (tabla[3] * tabla[0] - tabla[2] * tabla[1]) /
        Math.sqrt((tabla[2] + tabla[3]) *
            (tabla[0] + tabla[1]) *
            (tabla[1] + tabla[3]) *
            (tabla[0] + tabla[2]));
};
console.log(phi([76, 9, 4, 1]));

// Funcion que calcula cuantas veces se relaciona evento con otro, dentro de un array de objetos
// y va guardando las cantidades en en array booleano
function tablaPara(evento, diario) {
    let tabla = [0, 0, 0, 0];

    for (let i = 0; i < diario.length; i++) {
        let entrada = diario[i], index = 0;

        if (entrada.events.includes(evento)) index += 1; 
        if (entrada.squirrel) index += 2;
        tabla[index] += 1;
    };

    return tabla;
};

// Funcion que calcula todos los tipos de eventos (valores de la propiedad evento) que hay en los objetos.
function eventosDiario(diario) {
    let eventos = []

    for (let entrada of diario) {

        for (let evento of entrada.events) {
            if (!eventos.includes(evento)) {
                eventos.push(evento);
            };
        };
    };

    return eventos;
};


// Registro de sucesos guardados en la vinculacion JOURNAL
var JOURNAL = [
    { "events": ["carrot", "exercise", "weekend"], "squirrel": false },
    { "events": ["bread", "pudding", "brushed teeth", "weekend", "touched tree"], "squirrel": false },
    { "events": ["carrot", "nachos", "brushed teeth", "cycling", "weekend"], "squirrel": false },
    { "events": ["brussel sprouts", "ice cream", "brushed teeth", "computer", "weekend"], "squirrel": false },
    { "events": ["potatoes", "candy", "brushed teeth", "exercise", "weekend", "dentist"], "squirrel": false },
    { "events": ["brussel sprouts", "pudding", "brushed teeth", "running", "weekend"], "squirrel": false },
    { "events": ["pizza", "brushed teeth", "computer", "work", "touched tree"], "squirrel": false },
    { "events": ["bread", "beer", "brushed teeth", "cycling", "work"], "squirrel": false },
    { "events": ["cauliflower", "brushed teeth", "work"], "squirrel": false },
    { "events": ["pizza", "brushed teeth", "cycling", "work"], "squirrel": false },
    { "events": ["lasagna", "nachos", "brushed teeth", "work"], "squirrel": false },
    { "events": ["brushed teeth", "weekend", "touched tree"], "squirrel": false },
    { "events": ["lettuce", "brushed teeth", "television", "weekend"], "squirrel": false },
    { "events": ["spaghetti", "brushed teeth", "work"], "squirrel": false },
    { "events": ["brushed teeth", "computer", "work"], "squirrel": false },
    { "events": ["lettuce", "nachos", "brushed teeth", "work"], "squirrel": false },
    { "events": ["carrot", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["brushed teeth", "work"], "squirrel": false },
    { "events": ["cauliflower", "reading", "weekend"], "squirrel": false },
    { "events": ["bread", "brushed teeth", "weekend"], "squirrel": false },
    { "events": ["lasagna", "brushed teeth", "exercise", "work"], "squirrel": false },
    { "events": ["spaghetti", "brushed teeth", "reading", "work"], "squirrel": false },
    { "events": ["carrot", "ice cream", "brushed teeth", "television", "work"], "squirrel": false },
    { "events": ["spaghetti", "nachos", "work"], "squirrel": false },
    { "events": ["cauliflower", "ice cream", "brushed teeth", "cycling", "work"], "squirrel": false },
    { "events": ["spaghetti", "peanuts", "computer", "weekend"], "squirrel": true },
    { "events": ["potatoes", "ice cream", "brushed teeth", "computer", "weekend"], "squirrel": false },
    { "events": ["potatoes", "ice cream", "brushed teeth", "work"], "squirrel": false },
    { "events": ["peanuts", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["potatoes", "exercise", "work"], "squirrel": false },
    { "events": ["pizza", "ice cream", "computer", "work"], "squirrel": false },
    { "events": ["lasagna", "ice cream", "work"], "squirrel": false },
    { "events": ["cauliflower", "candy", "reading", "weekend"], "squirrel": false },
    { "events": ["lasagna", "nachos", "brushed teeth", "running", "weekend"], "squirrel": false },
    { "events": ["potatoes", "brushed teeth", "work"], "squirrel": false },
    { "events": ["carrot", "work"], "squirrel": false },
    { "events": ["pizza", "beer", "work", "dentist"], "squirrel": false },
    { "events": ["lasagna", "pudding", "cycling", "work"], "squirrel": false },
    { "events": ["spaghetti", "brushed teeth", "reading", "work"], "squirrel": false },
    { "events": ["spaghetti", "pudding", "television", "weekend"], "squirrel": false },
    { "events": ["bread", "brushed teeth", "exercise", "weekend"], "squirrel": false },
    { "events": ["lasagna", "peanuts", "work"], "squirrel": true },
    { "events": ["pizza", "work"], "squirrel": false },
    { "events": ["potatoes", "exercise", "work"], "squirrel": false },
    { "events": ["brushed teeth", "exercise", "work"], "squirrel": false },
    { "events": ["spaghetti", "brushed teeth", "television", "work"], "squirrel": false },
    { "events": ["pizza", "cycling", "weekend"], "squirrel": false },
    { "events": ["carrot", "brushed teeth", "weekend"], "squirrel": false },
    { "events": ["carrot", "beer", "brushed teeth", "work"], "squirrel": false },
    { "events": ["pizza", "peanuts", "candy", "work"], "squirrel": true },
    { "events": ["carrot", "peanuts", "brushed teeth", "reading", "work"], "squirrel": false },
    { "events": ["potatoes", "peanuts", "brushed teeth", "work"], "squirrel": false },
    { "events": ["carrot", "nachos", "brushed teeth", "exercise", "work"], "squirrel": false },
    { "events": ["pizza", "peanuts", "brushed teeth", "television", "weekend"], "squirrel": false },
    { "events": ["lasagna", "brushed teeth", "cycling", "weekend"], "squirrel": false },
    { "events": ["cauliflower", "peanuts", "brushed teeth", "computer", "work", "touched tree"], "squirrel": false },
    { "events": ["lettuce", "brushed teeth", "television", "work"], "squirrel": false },
    { "events": ["potatoes", "brushed teeth", "computer", "work"], "squirrel": false },
    { "events": ["bread", "candy", "work"], "squirrel": false },
    { "events": ["potatoes", "nachos", "work"], "squirrel": false },
    { "events": ["carrot", "pudding", "brushed teeth", "weekend"], "squirrel": false },
    { "events": ["carrot", "brushed teeth", "exercise", "weekend", "touched tree"], "squirrel": false },
    { "events": ["brussel sprouts", "running", "work"], "squirrel": false },
    { "events": ["brushed teeth", "work"], "squirrel": false },
    { "events": ["lettuce", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["candy", "brushed teeth", "work"], "squirrel": false },
    { "events": ["brussel sprouts", "brushed teeth", "computer", "work"], "squirrel": false },
    { "events": ["bread", "brushed teeth", "weekend"], "squirrel": false },
    { "events": ["cauliflower", "brushed teeth", "weekend"], "squirrel": false },
    { "events": ["spaghetti", "candy", "television", "work", "touched tree"], "squirrel": false },
    { "events": ["carrot", "pudding", "brushed teeth", "work"], "squirrel": false },
    { "events": ["lettuce", "brushed teeth", "work"], "squirrel": false },
    { "events": ["carrot", "ice cream", "brushed teeth", "cycling", "work"], "squirrel": false },
    { "events": ["pizza", "brushed teeth", "work"], "squirrel": false },
    { "events": ["spaghetti", "peanuts", "exercise", "weekend"], "squirrel": true },
    { "events": ["bread", "beer", "computer", "weekend", "touched tree"], "squirrel": false },
    { "events": ["brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["lettuce", "peanuts", "brushed teeth", "work", "touched tree"], "squirrel": false },
    { "events": ["lasagna", "brushed teeth", "television", "work"], "squirrel": false },
    { "events": ["cauliflower", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["carrot", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["carrot", "reading", "weekend"], "squirrel": false },
    { "events": ["carrot", "peanuts", "reading", "weekend"], "squirrel": true },
    { "events": ["potatoes", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["lasagna", "ice cream", "work", "touched tree"], "squirrel": false },
    { "events": ["cauliflower", "peanuts", "brushed teeth", "cycling", "work"], "squirrel": false },
    { "events": ["pizza", "brushed teeth", "running", "work"], "squirrel": false },
    { "events": ["lettuce", "brushed teeth", "work"], "squirrel": false },
    { "events": ["bread", "brushed teeth", "television", "weekend"], "squirrel": false },
    { "events": ["cauliflower", "peanuts", "brushed teeth", "weekend"], "squirrel": false }
];


// Crear el array con todos los valores de la propiedad eventos sin repetir
let eventosDiarios = eventosDiario(JOURNAL)

// Calcular las medidas de correlacion de cada evento con el convertirse en una ardilla
for (evento of eventosDiarios) {
    console.log(evento + ": ", phi(tablaPara(evento, JOURNAL)))
};

console.log("<------------------------------------------>")

// Mostrar las medidas de correlacion superiores a 0.1 e inferiores a -0.1
for (evento of eventosDiarios) {
    let correlacion = phi(tablaPara(evento, JOURNAL))
    if(correlacion > 0.1 || correlacion < -0.1) {
        console.log(evento + ": ", correlacion)
    }
};


// se entiende que cuando la persona se lava los dientes, en general, tiene el efecto opuesto en la otra variable, 
// es decir, no se convierte en ardilla. Por lo tanto se puede extraer la expresion contraria, si "no se lava los dientes" entonces
// convertirse en ardilla es verdadero, en la misma medida que su expresion opuesta.

for (element of JOURNAL){
    if (element.events.includes("peanuts") && !(element.events.includes("brushed teeth"))) {
        element.events.push("peanut teeth")   
    };
};



console.log(phi(tablaPara("peanut teeth", JOURNAL)))


let transformacionArdilla = JOURNAL.filter(elemento => elemento.squirrel == true);
console.log(transformacionArdilla)

