/* comenzando desde el número 1 y repetidamente agregando 5 o multiplicando por 3, 
una cantidad infinita de números nuevos pueden
ser producidos. ¿Cómo escribirías una función que, dado un número, intente
encontrar una secuencia de tales adiciones y multiplicaciones que produzca ese
número? */

function encontrarSolucion(objetivo) {

    function encontrar(actual, historia) {
        if (actual == objetivo) {
            return historia;
        } else if (actual > objetivo) {
            return null;
        } else {
            return encontrar(actual + 5, `(${historia} + 5)`) ||
                encontrar(actual * 3, `(${historia} * 3)`);
        }
    }
    return encontrar(1, "1");
}

console.log(20)