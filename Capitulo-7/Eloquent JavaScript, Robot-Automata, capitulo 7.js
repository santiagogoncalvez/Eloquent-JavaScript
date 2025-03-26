// Proyecto: un Robot. Capitulo 7.

const caminos = [
    "Casa de Alicia-Casa de Bob", "Casa de Alicia-Cabaña",
    "Casa de Alicia-Oficina de Correos", "Casa de Bob-Ayuntamiento",
    "Casa de Daria-Casa de Ernie", "Casa de Daria-Ayuntamiento",
    "Casa de Ernie-Casa de Grete", "Casa de Grete-Granja",
    "Casa de Grete-Tienda", "Mercado-Granja",
    "Mercado-Oficina de Correos", "Mercado-Tienda",
    "Mercado-Ayuntamiento", "Tienda-Ayuntamiento"
];



// Funcion que va a construir una lista con cada lugar que existe y a que lugares se puede ir desde ese lugar
function construirGrafo(bordes) {
    let grafo = Object.create(null);

    // Funcion que agrega nodos al grafo
    function añadirBorde(desde, hasta) {
        if (grafo[desde] == null) {
            grafo[desde] = [hasta];
        } else {
            grafo[desde].push(hasta);
        };
    }

    // Ciclo que recorre los caminos ingresados
    for (let [desde, hasta] of bordes.map(c => c.split("-"))) { // split() va a dividir cada elemento en 2 elementos separandolos por "-"
        // Grafo que cumple simetria, todos los caminos que pueden ir a un lugar, tambien pueden volver.
        añadirBorde(desde, hasta);
        añadirBorde(hasta, desde);
    }

    return grafo;
}

// Lista con los lugares a los que se puede ir desde cada punto
const grafoCamino = construirGrafo(caminos);
console.log(grafoCamino);





// Clase que crea un estado de un pueblo con los paquetes distribuidos.
class EstadoPueblo {
    constructor(lugar, paquetes) {
        this.lugar = lugar;
        this.paquetes = paquetes;
    };
    // Lugar es donde se encuentra el robot.
    // paquetes son los lugares y destinos de los paquetes.

    mover(destino) {
        // Si no es un movimiento valido, si desde el lugar donde se encuentra el robot no se puede ir directamente a ese destino.
        if (!grafoCamino[this.lugar].includes(destino)) {
            return this;
        } else {
            // Si es un movimiento valido y se puede ir directamente a ese lugar.

            /*Lo que hace esta parte de codigo es:  
             mapea los paquetes existentes, analiza cada paquete viendo si fue recogido o no, es decir, 
             si el punto de partida del paquete es distinto del lugar acutal del robot, lo que quiere decir que el robot todavia no esta en el lugar de donde se envia el paquete,
             retorna el paquete entero.
             si el robot ya paso por ese punto, 
             entonces cada vez que se llame a la funcion va a guardar en el punto de partida del paquete la ubicacion actual del robot */

            let paquetes = this.paquetes.map(p => {
                if (p.lugar != this.lugar) return p;

                // Si el lugar de partida del paquete es igual al lugar donde esta el robot significa que el robot ya recogio el paquete, 
                // por lo tanto el punto de partida del paquete ahora va a ser el lugar donde este el robot ya que el robot ya recogio el paquete, pero todavia no lo entrego.
                return { lugar: destino, direccion: p.direccion }


                /* El filtro elimina los paquetes que ya fueron entregados, es decir deja de lado los paquetes en los cuales 
                el punto de partida del paquete es igual a la direccion de destino del paquete, y deja los que tienen distintos valores 
                en sus propiedades lugar y direccion*/
            }).filter(p => p.lugar != p.direccion);

            return new EstadoPueblo(destino, paquetes);
        }
    }


    // Metodo estatico que crea Estado de pueblo con paquetes aleatorios y con el robot ubicado en "Oficin de correos".

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



// Funcion que pone en funcionamiento al robot
function correrRobot(estado, robot, memoria) {

    for (let turno = 0; ; turno++) {
        if (estado.paquetes.length == 0) {
            console.log(`Listo en ${turno} turnos`);
            break;
        }

        // Accion dentro va a tener un objeto
        let accion = robot(estado, memoria);

        estado = estado.mover(accion.direccion);
        memoria = accion.memoria;
        console.log(`Moverse a ${accion.direccion}`);
    };
}


// Funcion que retorna una direccion aleatoria.
function eleccionAleatoria(array) {
    let eleccion = Math.floor(Math.random() * array.length);

    return array[eleccion];
}

// Funcion que dirige al robot a una direccion aleatoria.
function robotAleatorio(estado) {
    return { direccion: eleccionAleatoria(grafoCamino[estado.lugar]) };
}


// Nuevo mundo virtual:
// correrRobot(EstadoPueblo.aleatorio(), robotAleatorio);







// Robot que utilza una ruta

// Ruta que pasa por todos los lugares del pueblo.
const rutasCorreo = [
    "Casa de Alicia", "Cabaña", "Casa de Alicia", "Casa de Bob",
    "Ayuntamiento", "Casa de Daria", "Casa de Ernie",
    "GCasa de Grete", "Tienda", "Casa de Grete", "Granja",
    "Mercado", "Oficina de Correos"
];



// Funcion que retorna la memoria del robot
function robotRuta(estado, memoria) {
    if (memoria.length == 0) {
        memoria = rutasCorreo;
    }
    return { direccion: memoria[0], memoria: memoria.slice(1) };
};


// Correr robot a traves de una ruta
// console.log("Robot por ruta que pasa por todo el pueblo")
// correrRobot(EstadoPueblo.aleatorio(), robotRuta, []);





// Funcion que encuentra rutas cortas desde un punto hasta otro punto. Son rutas que no repiten puntos.
function encontrarRuta(grafo, desde, hasta) {

    let trabajo = [{ donde: desde, ruta: [] }];

    for (let i = 0; i < trabajo.length; i++) {

        let { donde, ruta } = trabajo[i];

        for (let lugar of grafo[donde]) {

            if (lugar == hasta) {
                console.log(ruta.concat(lugar));
                return ruta.concat(lugar);
            }
            if (!trabajo.some(w => w.donde == lugar)) {
                trabajo.push({ donde: lugar, ruta: ruta.concat(lugar) });
            };
        };
    };
};

// console.log("Prueba de ruta:");
// console.log(encontrarRuta(grafoCamino, 'Casa de Alicia', 'Granja'))


// Funcion  que representa a un robot que usa su valor de memoria como una lista de instrucciones para moverse
function robotOrientadoAMetas({ lugar, paquetes }, ruta) {

    if (ruta.length == 0) {
        let paquete = paquetes[0];

        // Si el punto de partida del paquete es distinto de donde se encuentra el robot, el robot todavia no recogio el paquete y debe generar una ruta hasta ese lugar.
        if (paquete.lugar != lugar) {
            ruta = encontrarRuta(grafoCamino, lugar, paquete.lugar);
        } else {
            // Si elpunto de partida del paquete es igual al lugar donde esta el robot, entonces el robot recogio el paquete y debe generar una ruta el destino del paquete.
            ruta = encontrarRuta(grafoCamino, lugar, paquete.direccion);
        };
    }

    return { direccion: ruta[0], memoria: ruta.slice(1) };
};

// correrRobot(EstadoPueblo.aleatorio(1), robotRuta, []);
// correrRobot(EstadoPueblo.aleatorio(1), robotOrientadoAMetas, []);

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

        let pueblo = EstadoPueblo.aleatorio(1);

        total1 += contarPasos(pueblo, robot1, memoria1);
        total2 += contarPasos(pueblo, robot2, memoria2);
    }

    console.log(`El robot 1 necito ${total1 / 100} en promedio para completar las tareas`);
    console.log(`El robot 2 necito ${total2 / 100} en promedio para completar las tareas`);

}

/*Entendi el concepto. el codigo no funciona por alguna razon. funciona bien en archivo 
 robot copia en ingles */


 