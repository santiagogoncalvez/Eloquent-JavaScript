const caminos = [
    "Casa de Alicia-Casa de Bob", "Casa de Alicia-Cabaña",
    "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
    "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
    "Casa de Grete-Tienda", "Mercado-Granja",
    "Mercado-Oficina de Correos", "Mercado-Tienda",
    "Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];


function construirGrafo(bordes) {
    let grafo = Object.create(null);
    function añadirBorde(desde, hasta) {
        if (grafo[desde] == null) {
            grafo[desde] = [hasta];
        } else {
            grafo[desde].push(hasta);
        }
    }
    for (let [desde, hasta] of bordes.map(c => c.split("-"))) {
        añadirBorde(desde, hasta);
        añadirBorde(hasta, desde);
    }
    return grafo;
}
const grafoCamino = construirGrafo(caminos);



class EstadoPueblo {
    constructor(lugar, paquetes) {
        this.lugar = lugar;
        this.paquetes = paquetes;
    }
    mover(destino) {
        if (!grafoCamino[this.lugar].includes(destino)) {
            return this;
        } else {
            let paquetes = this.paquetes.map(p => {
                if (p.lugar != this.lugar) return p;
                return { lugar: destino, direccion: p.direccion };
            }).filter(p => p.lugar != p.direccion);
            return new EstadoPueblo(destino, paquetes);
        }
    }
}


function correrRobot(estado, robot, memoria) {
    ;
    let turno = 0
    for (turno; ; turno++) {
        if (estado.paquetes.length == 0) {
            break;
        }
        let accion = robot(estado, memoria);
        estado = estado.mover(accion.direccion);
        memoria = accion.memoria;
    };

    return turno;
};



function eleccionAleatoria(array) {
    let eleccion = Math.floor(Math.random() * array.length);

    return array[eleccion];
};
function robotAleatorio(estado) {
    return { direccion: eleccionAleatoria(grafoCamino[estado.lugar]) };
};

EstadoPueblo.aleatorio = function (numeroDePaquetes = 5) {
    let paquetes = [];
    for (let i = 0; i < numeroDePaquetes; i++) {
        let direccion = eleccionAleatoria(Object.keys(grafoCamino));
        let lugar;
        do {
            lugar = eleccionAleatoria(Object.keys(grafoCamino));
        } while (lugar == direccion);
        paquetes.push({ lugar, direccion });
    }
    return new EstadoPueblo("Oficina de Correos", paquetes);
};




const rutaCorreo = [
    "Casa de Alicia", "Cabaña", "Casa de Alicia", "Casa de Bob",
    "Ayuntamiento", "Casa de Daria", "Casa de Ernie",
    "GCasa de Grete", "Tienda", "Casa de Grete", "Granja",
    "Mercado", "Oficina de Correos"
];


function robotRuta(estado, memoria) {
    if (memoria.length == 0) {
        memoria = rutaCorreo;
    }
    return { direccion: memoria[0], memoria: memoria.slice(1) };
};




function encontrarRuta(grafo, desde, hasta) {
    let trabajo = [{ donde: desde, ruta: [] }];
    for (let i = 0; i < trabajo.length; i++) {
        let { donde, ruta } = trabajo[i];
        for (let lugar of grafo[donde]) {
            if (lugar == hasta) return ruta.concat(lugar);
            if (!trabajo.some(w => w.donde == lugar)) {
                trabajo.push({ donde: lugar, ruta: ruta.concat(lugar) });
            };
        };
    };
};

// console.log(encontrarRuta(grafoCamino, "Oficina de Correos", "Granja"));

function robotOrientadoAMetas({ lugar, paquetes }, ruta) {
    if (ruta.length == 0) {
        let paquete = paquetes[0];
        if (paquete.lugar != lugar) {
            ruta = encontrarRuta(grafoCamino, lugar, paquete.lugar);
        } else {
            ruta = encontrarRuta(grafoCamino, lugar, paquete.direccion);
        };
    };

    return { direccion: ruta[0], memoria: ruta.slice(1) };
};


// correrRobot(EstadoPueblo.aleatorio(), robotRuta, []);


function contarPasos(estado, robot, memoria) {

    for (let turno = 0; ; turno++) {
        if (estado.paquetes.length == 0) {
            return turno;
        }

        // Accion dentro va a tener un objeto
        let accion = robot(estado, memoria);

        estado = estado.mover(accion.direccion);
        memoria = accion.memoria;
    };
}

function compararRobots(robot1, memoria1, robot2, memoria2) {

    let total1 = 0;
    let total2 = 0;

    for (let i = 0; i < 100; i++) {

        let pueblo = EstadoPueblo.aleatorio();

        total1 += contarPasos(pueblo, robot1, memoria1);
        total2 += contarPasos(pueblo, robot2, memoria2);
    }

    console.log(`El robot 1 necito ${total1 / 100} en promedio para completar las tareas`);
    console.log(`El robot 2 necito ${total2 / 100} en promedio para completar las tareas`);

}

compararRobots(robotRuta, [], robotOrientadoAMetas, []);


