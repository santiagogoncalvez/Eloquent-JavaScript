// Utilizar paquete dijkstrajs.js para crear grafo de caminos de autómata del capitulo 7:

const {roadGraph} = require("./roadGraph");
const { find_path } = require("../../node_modules/dijkstrajs");

let graph = {};
for (let node of Object.keys(roadGraph)) {
    let edges = graph[node] = {};
    // graph[node]= {}
    // edges = {}
    // {graph[node]: edges} => {propiedad: {}}
    for (let dest of roadGraph[node]) {
        edges[dest] = 1;
    };
};

console.log(graph);

console.log(find_path(graph, "Oficina de Correos", "Ayuntamiento"));

