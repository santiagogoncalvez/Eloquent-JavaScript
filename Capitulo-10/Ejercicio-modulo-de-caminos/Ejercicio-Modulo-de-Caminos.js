// Ejercicio Modulos de caminos, capitulo 10
// Modulo GrafoCaminos


// Dependencia de este modulo
let {buildGraph} = require("./graph");

const roads = [
    "Casa de Alicia-Casa de Bob", "Casa de Alicia-Cabaña",
    "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
    "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
    "Casa de Grete-Tienda", "Mercado-Granja",
    "Mercado-Oficina de Correos", "Mercado-Tienda",
    "Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];

function separateStartEnd (roads) {
    return roads.map(c => c.split("-"))
}


// crear grafo de caminos y exportarlo
exports.roadGraph = buildGraph(separateStartEnd(roads));