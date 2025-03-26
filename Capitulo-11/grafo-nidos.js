// Crear grafo de las conecciones de los nidos:

const { connections } = require("./conection-nests");
const {
  buildGraph,
} = require("../Capitulo-10/Ejercicio-modulo-de-caminos/graph");
const { find_path } = require("../node_modules/dijkstrajs");

function separateStartEnd(roads) {
  return roads.map((c) => c.split("-"));
}

// Construir grafo:
const graphNests = buildGraph(connections.map((c) => c.split("-")));
console.log(graphNests);

function transformForDijkstrajs(graph) {
    let adaptedGraph = {};
    for (let node of Object.keys(graph)) {
        let edges = (adaptedGraph[node] = {});
        // graph[node]= {}
        // edges = {}
        // {graph[node]: edges} => {propiedad: {}}
        for (let dest of graph[node]) {
            edges[dest] = 1;
        }
    }

    return adaptedGraph;
}

console.log(transformForDijkstrajs(graphNests))

console.log(find_path(transformForDijkstrajs(graphNests), "Woods",
"Great Pine"));
