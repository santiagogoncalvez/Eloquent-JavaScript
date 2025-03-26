// Buscar cache de alimento del Gran Roble:
const { bigOak, defineRequestType, everywhere } = require("./crow-tech.js");
const http = require("http");

/*
bigOak.readStorage("food caches", (caches) => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, (info) => {
        console.log(info);
    });
});
*/

// Metodo enviar (nombre del nido, tipo de solicitud, contenido, fucion a llamar cuando llega una respuesta).
// No se puede enviar este mensaje porque no esta definito el tipo de nota:


// Definir solicitud "nota" en todos los nidos:
defineRequestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
});

// Ahora si se puede enviar este tipo de nota:
/*
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM", () =>
    console.log("Note delivered.")
);
*/

function storage(nest, name) {
    return new Promise((resolve) => {
        nest.readStorage(name, (result) => resolve(result));
    });
}

// storage(bigOak, "enemies").then((value) => console.log("Got", value));

//Funcion que envia un mensaje, estructurado con promesas;

// Definir error específico
class Timeout extends Error { }

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else reject(new Timeout("Timed out"));
            }, 250);
        }
        attempt(1);
    });
}

function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(nest, content, source))
                .then(
                    (response) => callback(null, response),
                    (failure) => callback(failure)
                );
        } catch (exception) {
            callback(exception);
        }
    });
}

// Esta funcion verifica los nidos accesibles desde un cierto nido:
requestType("ping", () => "pong");

function availableNeighbors(nest) {
    let requests = nest.neighbors.map((neighbor) => {
        return request(nest, neighbor, "ping").then(
            () => true,
            () => false
        );
    });
    return Promise.all(requests).then((result) => {
        return nest.neighbors.filter((_, i) => result[i]);
    });
}

// Funcion que ejecuta codigo en cada nido:
everywhere((nest) => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "gossip", message);
    }
}

requestType("gossip", (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} received gossip '${message}' from ${source}`);
    sendGossip(nest, message, source);
});

// Enviar mensaje a todos los nidos:
// bigOak.send("Cow Pasture", "gossip", "There are wolves nearby", () => { });

// Definir tipo de mensaje "concections" para evaluar los nidos existentes y alcance de cada uno.
requestType("connections", (nest, { name, neighbors },
    source) => {
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) ==
        JSON.stringify(neighbors)) return;
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "connections", {
            name,
            neighbors: nest.state.connections.get(name)
        });
    }
}

everywhere(nest => {
    nest.state.connections = new Map();
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name);
});





// La funcion findRoute() busca la forma de llegar a un determinado nodo de la red:

function findRoute(from, to, connections) {
    let work = [{ at: from, via: null }];
    for (let i = 0; i < work.length; i++) {
        let { at, via } = work[i];
        for (let next of connections.get(at) || []) {

            if (next == to) {
                return via;
            };
            if (!work.some((w) => w.at == next)) {
                work.push({ at: next, via: via || next });
            }
        }
    }
    return null;
}

// Funcion que envia mensajes a larga distancia:
function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target,
            nest.state.connections);
        if (!via) throw new Error(`No route to ${target}`);
        return request(nest, via, "route",
            { target, type, content });
    }
}


requestType("route", (nest, { target, type, content }) => {
    return routeRequest(nest, target, type, content);
});

/*
Se supone que esto tiene que funcionar pero no funciona, porque la funcion que crea el mapa de todas las concexiones no esta guardando el mapa en cada nido y solo guarda la coneccion acutales con los vecinos.
Y como no existe ese mapa no puede conseguir las conexiones para ir de un lugar a otro la funcion findRoute.

Este error estaba ocurriendo porque intentaba acceder a los datos antes de que se terminaran de procesar, si se accede a las conexiones luego de que todos los nidos difundan las conexiones, si se van a poder mostrar los resultados.
*/


// Esto es lo que sucede si se intenta acceder a las conexiones antes de se terminene de procesar.
// Por ejemplo calcular las claves de las conecciones o el tamaño del mapa:

/*
console.log("\nBeafore data processing: ");
console.log("Connections: ", bigOak.state.connections);
*/

// Si se realizan las operaciones luego del proceso de la comunicaccion de las conexiones por parte de la funcion broadcastConnections() los resultados van a ser correctos


setTimeout(() => {
    // console.log("Send reques long distance: ", routeRequest(bigOak, "Church Tower", "note",
    //     "Incoming jackdaws!"));
}, 1000);

// Ahora se pueden enviar notas a larga distancia:



// Funcion que busca en todos los nodos un mensaje en el almacenamiento y que utiliza formato asyn-await:

requestType("storage", (nest, name) => storage(nest, name));

function network(nest) {
    return Array.from(nest.state.connections.keys());
}

async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        let source = sources[Math.floor(Math.random() *
            sources.length)];
        sources = sources.filter(n => n != source);
        try {
            let found = await routeRequest(nest, source, "storage",
                name);
            if (found != null) return found;
        } catch (_) { }
    }
    throw new Error("Not found");
}

// Ejecutar funcion findInStorage()
setTimeout(() => {
    // findInStorage(bigOak, "events on 2017-12-21").then(console.log)
}, 1500);




// Asynchronous Bugs

//  Calcular polluelos con bug
function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

async function chicksWithBug(nest, year) {
    let list = "";
    await Promise.all(network(nest).map(async name => {
        list += `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)
            }\n`;
    }));
    return list;
}


/*
Se produce un error asincrónico.

La expresión map se ejecuta antes de que se haya agregado algo a la lista, por lo que cada uno de los operadores += comienza desde un string vacío y termina cuando su recuperación de almacenamiento finaliza (brecha asincrónica),  estableciendo "lista" como una lista de una sola línea, el resultado de agregar su línea al string vacío.


*/

setTimeout(() => {
    // console.log("Recuento de polluelos con bug:")
    // chicksWithBug(bigOak, 2017).then(console.log);
}, 2000);



/**
 Esto se puede evitar  retornando las líneas de las promesas mapeadas y llamando a join en el resultado de Promise.all
    
 - "Calcular nuevos valores es menos propenso a errores que cambiar  valores existentes."
 */

//  Calcular polluelos sin bug
async function chicks(nest, year) {
    let lines = network(nest).map(async name => {
        return name + ": " +
            await anyStorage(nest, name, `chicks in ${year}`);
    });
    return (await Promise.all(lines)).join("\n");
}

setTimeout(() => {
    // console.log("Recuento de polluelos sin bug:")
    // chicks(bigOak, 2018).then(console.log)
}, 2500);

