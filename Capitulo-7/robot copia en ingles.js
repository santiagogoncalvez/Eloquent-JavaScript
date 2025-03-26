var roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);
console.log(roadGraph)

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return { place: destination, address: p.address };
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0, total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`)
  console.log(`Robot 2 needed ${total2 / 100}`)
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

let first = new VillageState(
  "Post Office",
  [{ place: "Post Office", address: "Shop" },
  { place: "Post Office", address: "Farm" }]
);
let next = first.move("Alice's House");

// console.log(next);
// console.log(next.parcels.every(element => element.place == next.place))
// console.log(next.parcels);
// console.log(first.place);



function bubbleOrder(tamanio, matrizElementos) {
  var i;
  var j;
  var auxiliar;

  for (i = 0; i < tamanio - 1; i++) {

    for (j = i + 1; j < tamanio; j++) {

      if (matrizElementos[i].length > matrizElementos[j].length) {

        auxiliar = matrizElementos[i];
        matrizElementos[i] = matrizElementos[j];
        matrizElementos[j] = auxiliar;
      };
    };
  };

  return matrizElementos;

};

// console.log(VillageState.random())
function searchDeliveryRobot({ place, parcels }, route) {
  if (route.length == 0) {

    // Ruta de busqueda
    if (!parcels.every(element => element.place == place)) {

      let searchRoute = [];

      for (let i = 0; parcels.length != 0;) {
        let routeNearPoint;
        let indicePoint;

        for (let j = 0; j < parcels.length; j++) {


          if (j == 0) {
            routeNearPoint = findRoute(roadGraph, place, parcels[j].place);

            indicePoint = j;
            continue;
          };

          let route1 = findRoute(roadGraph, place, parcels[j].place);

          if (route1.length < routeNearPoint.length) {
            routeNearPoint = route1;
            indicePoint = j;
          };

        };

        searchRoute.push(routeNearPoint);
        place = parcels[indicePoint].place;
        parcels = parcels.filter(element => parcels.indexOf(element) != indicePoint);
      };

      route = [].concat(...searchRoute);
    } else {

      // Ruta de entrega
      if (parcels.every(element => element.place == place)) {
        let deliveryRoute = [];

        for (let i = 0; parcels.length != 0;) {

          let routeNearPoint;
          let indicePoint;

          for (let j = 0; j < parcels.length; j++) {

            if (j == 0) {
              routeNearPoint = findRoute(roadGraph, place, parcels[j].address);
              indicePoint = j;
              continue;
            };

            let route1 = findRoute(roadGraph, place, parcels[j].address);

            if (route1.length < routeNearPoint.length) {
              routeNearPoint = route1;
              indicePoint = j;
            };
          };

          deliveryRoute.push(routeNearPoint);
          place = parcels[indicePoint].address;
          parcels = parcels.filter(element => parcels.indexOf(element) != indicePoint);

        };
        route = [].concat(...deliveryRoute);
      };
    }

  };

  return { direction: route[0], memory: route.slice(1) };
};


/*
let village1 = new VillageState("Post Office", [{ place: "Post Office", address: 'Town Hall' },
{ place: "Post Office", address: 'Bob\'s House' },
{ place: "Post Office", address: 'Farm' },
{ place: "Post Office", address: 'Shop' },
{ place: "Post Office", address: 'Grete\'s House' }]);
// console.log(villige1)    
let village2 = VillageState.random();
console.log(village2);

console.log(findRoute(roadGraph, "Shop", "Farm"));

console.log(searchDeliveryRobot(village1, []));
*/
// compareRobots(goalOrientedRobot, [], searchDeliveryRobot, []);



// Robot optimizado
function lazyRobot({ place, parcels }, route) {
  console.log(parcels)
  if (route.length == 0) {

    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return { route: findRoute(roadGraph, place, parcel.place), pickUp: true };
      } else {
        return { route: findRoute(roadGraph, place, parcel.address), pickUp: false };
      };
    });

    // Esta funcion determina la prioridad que tiene una ruta al elegir
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  };

  return { direction: route[0], memory: route.slice(1) };
};

runRobot(VillageState.random(), lazyRobot, []);
compareRobots(goalOrientedRobot, [], lazyRobot, []);




/*
Comentario: Esta fallando la funcion searchDeliveryRobot, hay que corregir y ver que falla.

Error cometido:
La concatenacion de las rutas esta agregando arrays a un array, cuando deberia
agregar los elementos por separado del array, siendo un array de elementos simples en vez de
un array con arrays anidados.
*/




// console.log(findRoute(roadGraph, "Post Office", "Shop"));
// compareRobots(goalOrientedRobot, [], searchDeliveryRobot, [])


// compareRobots(goalOrientedRobot, [], improvedGoalOrientedRobot, []);

// console.log(findRoute(roadGraph, "Farm", "Bob's House"))
// console.log(findRoute(roadGraph, "Farm", "Bob's House"))


// Idea de robot:
// un robot que cree una ruta por todos los lugares en donde hay paquetes y luego una ruta par entregarlos
// Va a un lugar recoge el paquete, va a otro lugar y recoge el paquete asi hasta que haya recogido todos los paquetes
// y luego los entrega todos.

// Comprobar si todos los paquetes fueron recogidos: evaluar array usando metodo every()


// si hay un paquete en donde esta el robot ya se detecta como recogido.

// Metodo de entrega:
// Seria ir repartiendo en el orden de las rutas que esten mas cerca al punto de donde esta el robot

// Idea:
// cada vez que se avanza a un punto, elegir el punto siguiente que este mas cerca