// Ejemplo de módulo hasta 2015 JavaScript

// Usa funciones para crear alcances locales y objetos para representar las interfaces de los módulos

// Módulo para ir entre los días y números (como son retornados por el método getDay):

const weekDay = function () {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];

    return {
        name(number) { return names[number]; },
        number(name) { return names.indexOf(name) }
    };
}();

console.log(weekDay.name(0));
console.log(weekDay.number("Monday"));


/*Durante mucho tiempo, este fue el enfoque principal utilizado en la programación web,
pero ahora está mayormente obsoleto.*/