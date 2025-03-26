// Funcion para encontrar bisturí:
async function locateScalpel(nest) {
    let local = await storage(nest, "scalpel");
    if (local == nest.name) return local;
    let next = local;

    while (true) {
        try {
            let found = await routeRequest(nest, next, "storage",
                "scalpel");
            if (found == next) return found;
            next = found;
        } catch (_) { }
    };
}

setTimeout(async () => {
    console.log("Scalpel location:", await locateScalpel(bigOak));
}, 3000);



// Solucion del libro
async function locateScalpel(nest) {
    let current = nest.name;
    for (; ;) {
        let next = await anyStorage(nest, current, "scalpel");
        if (next == current) return current;
        current = next;
    }
}