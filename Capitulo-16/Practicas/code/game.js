let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

class Vec {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
   }
   times(factor) {
      return new Vec(this.x * factor, this.y * factor);
   }
}

// Clases de actores

// Actor "Player"
class Player {
   constructor(pos, speed) {
      this.pos = pos;
      this.speed = speed;
   }

   get type() {
      return "player";
   }

   static create(pos) {
      return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
   }
}

Player.prototype.size = new Vec(0.8, 1.5);

// Actor "Lava"
class Lava {
   constructor(pos, speed, reset) {
      this.pos = pos;
      this.speed = speed;
      this.reset = reset;
   }

   get type() {
      return "lava";
   }

   static create(pos, ch) {
      if (ch == "=") {
         return new Lava(pos, new Vec(2, 0));
      } else if (ch == "|") {
         return new Lava(pos, new Vec(0, 2));
      } else if (ch == "v") {
         return new Lava(pos, new Vec(0, 3), pos);
      }
   }
}

Lava.prototype.size = new Vec(1, 1);

// Actor moneda
class Coin {
   constructor(pos, basePos, wobble) {
      this.pos = pos;
      this.basePos = basePos;
      this.wobble = wobble;
   }

   get type() {
      return "coin";
   }

   static create(pos) {
      let basePos = pos.plus(new Vec(0.2, 0.1));
      return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
   }
}

Coin.prototype.size = new Vec(0.6, 0.6);

// Actor Monster: es un enemigo al que puedes derrotar saltando sobre el.
class Monster {
   constructor(pos, speed) {
      this.pos = pos;
      this.speed = speed;
   }

   get type() {
      return "monster";
   }

   static create(pos) {
      return new Monster(pos.plus(new Vec(0, -1)), new Vec(2, 0));
   }

   update(time, state) {
      let newPos = this.pos.plus(this.speed.times(time).a);
      if (!state.level.touches(newPos, this.size, "wall")) {
         return new Monster(newPos, this.speed, this.reset);
      } else {
         return new Monster(this.pos, this.speed.times(-1));
      }
   }

   collide(state) {
      let player = state.player;
      if (player.pos.y + player.size.y < this.pos.y + 0.5) {
         // Sacar al monstruo de los actores
         let filtered = state.actors.filter((a) => a != this);
         return new State(state.level, filtered, state.status);
      } else {
         return new State(state.level, state.actors, "lost");
      }
   }
}

Monster.prototype.size = new Vec(1.2, 2);

const levelChars = {
   ".": "empty",
   "#": "wall",
   "+": "lava",
   "@": Player,
   o: Coin,
   "=": Lava,
   "|": Lava,
   v: Lava,
   M: Monster,
};

// Esta clase agarra un plan, le saca los espacios al principio y al final, separa la cadena por elementos de matrices cuando encuentra un "\n", y luego a cada elemento "fila" lo divide en elementos por cada letra. Luego si algun caracter no representa un tipo "string" y representa una "actor"(que son de tipo "class") encuentra sus coordenadas de matriz, y lo envía a "startActors". Y finalmente transforma cada tipo de string en "empty", "wall", o "lava" según corresponda.

class Level {
   constructor(plan) {
      let rows = plan
         .trim()
         .split("\n")
         .map((l) => [...l]);
      this.height = rows.length;
      this.width = rows[0].length;
      this.startActors = [];

      this.rows = rows.map((row, y) => {
         return row.map((ch, x) => {
            let type = levelChars[ch];
            if (typeof type != "string") {
               let pos = new Vec(x, y);
               this.startActors.push(type.create(pos, ch));
               type = "empty";
            }
            return type;
         });
      });
   }
}

// La clase "state" realiza un seguimiento del estado de un juego en ejecución
class State {
   constructor(level, actors, status) {
      this.level = level;
      this.actors = actors;
      this.status = status;
   }

   static start(level) {
      return new State(level, level.startActors, "playing");
   }

   get player() {
      return this.actors.find((a) => a.type == "player");
   }
}

let simpleLevel = new Level(simpleLevelPlan);
console.log(simpleLevel);

// Función para crear un elemento con ciertos atributos y asignarle elementos secundarios.
function elt(name, attrs, ...children) {
   let dom = document.createElement(name);
   for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
   }
   for (let child of children) {
      dom.appendChild(child);
   }
   return dom;
}

// class DomDisplay: crea una pantalla asignándole un elemento padre al que debe agregarse y un objeto de nivel.
class DOMDisplay {
   constructor(parent, level) {
      this.dom = elt("div", { class: "game" }, drawGrid(level));
      this.actorLayer = null;
      parent.appendChild(this.dom);
   }

   clear() {
      this.dom.remove();
   }
}

const scale = 20;

function drawGrid(level) {
   return elt(
      "table",
      {
         class: "background",
         style: `width: ${level.width * scale}px`,
      },
      ...level.rows.map((row) =>
         elt(
            "tr",
            { style: `height: ${scale}px` },
            ...row.map((type) => elt("td", { class: type }))
         )
      )
   );
}

// Función drawActors: dibuja cada actor creando un elemento DOM para él y configurando la posición y el tamaño de ese elemento en función de las propiedades del actor.
function drawActors(actors) {
   return elt(
      "div",
      {},
      ...actors.map((actor) => {
         let rect = elt("div", { class: `actor ${actor.type}` });
         rect.style.width = `${actor.size.x * scale}px`;
         rect.style.height = `${actor.size.y * scale}px`;
         rect.style.left = `${actor.pos.x * scale}px`;
         rect.style.top = `${actor.pos.y * scale}px`;
         return rect;
      })
   );
}

// Método syncState: se utiliza para hacer que la pantalla muestre un estado determinado.
DOMDisplay.prototype.syncState = function (state) {
   if (this.actorLayer) this.actorLayer.remove();
   this.actorLayer = drawActors(state.actors);
   this.dom.appendChild(this.actorLayer);
   this.dom.className = `game ${state.status}`;
   this.scrollPlayerIntoView(state);
};

// Metodo scrollPlayerIntoView: encuentra la posición del jugador y actualiza la posición de desplazamiento del elemento envolvente.
DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
   let width = this.dom.clientWidth;
   let height = this.dom.clientHeight;
   let margin = width / 3;

   // The viewport
   let left = this.dom.scrollLeft,
      right = left + width;
   let top = this.dom.scrollTop,
      bottom = top + height;

   let player = state.player;
   let center = player.pos.plus(player.size.times(0.5)).times(scale);

   if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
   } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
   }
   if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
   } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
   }
};

// Método touches(): Este método nos dice si un rectángulo toca un elemento de la cuadrícula del tipo dado.
Level.prototype.touches = function (pos, size, type) {
   let xStart = Math.floor(pos.x);
   let xEnd = Math.ceil(pos.x + size.x);
   let yStart = Math.floor(pos.y);
   let yEnd = Math.ceil(pos.y + size.y);

   for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
         let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
         let here = isOutside ? "wall" : this.rows[y][x];
         if (here == type) return true;
      }
   }
   return false;
};

// Método update(): utiliza "touches" para determinar si el jugador está tocando lava.
State.prototype.update = function (time, keys) {
   let actors = this.actors.map((actor) => actor.update(time, this, keys));
   let newState = new State(this.level, actors, this.status);

   if (newState.status != "playing") return newState;

   let player = newState.player;
   if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
   }

   for (let actor of actors) {
      if (actor != player && overlap(actor, player)) {
         newState = actor.collide(newState);
      }
   }
   return newState;
};

// Función overlap(): detecta la superposición entre actores.
function overlap(actor1, actor2) {
   return (
      actor1.pos.x + actor1.size.x > actor2.pos.x &&
      actor1.pos.x < actor2.pos.x + actor2.size.x &&
      actor1.pos.y + actor1.size.y > actor2.pos.y &&
      actor1.pos.y < actor2.pos.y + actor2.size.y
   );
}

// Métodos collide(): Si algún actor se superpone, este método tiene la oportunidad de actualizar el estado.
Lava.prototype.collide = function (state) {
   return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function (state) {
   let filtered = state.actors.filter((a) => a != this);
   let status = state.status;
   if (!filtered.some((a) => a.type == "coin")) status = "won";
   return new State(state.level, filtered, status);
};

// Metodo Lava.prototype.update(): calcula una nueva posición sumando el producto del paso de tiempo y la velocidad actual a su posición anterior. Si ningún obstáculo bloquea esa nueva posición, se mueve hacia allí. Si hay un obstáculo, el comportamiento depende del tipo de bloque de lava
Lava.prototype.update = function (time, state) {
   let newPos = this.pos.plus(this.speed.times(time));
   if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
   } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
   } else {
      return new Lava(this.pos, this.speed.times(-1));
   }
};

// Método Coin.prototype.update(): Las monedas utilizan su updatemétodo para tambalearse. Ignoran las colisiones con la cuadrícula.
const wobbleSpeed = 8,
   wobbleDist = 0.07;

Coin.prototype.update = function (time) {
   let wobble = this.wobble + time * wobbleSpeed;
   let wobblePos = Math.sin(wobble) * wobbleDist;
   return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble
   );
};

// Método Player.prototype.update: se encarga de manejar el movimiento del jugador.
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function (time, state, keys) {
   let xSpeed = 0;
   if (keys.ArrowLeft) xSpeed -= playerXSpeed;
   if (keys.ArrowRight) xSpeed += playerXSpeed;
   let pos = this.pos;
   let movedX = pos.plus(new Vec(xSpeed * time, 0));
   if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
   }

   let ySpeed = this.speed.y + time * gravity;
   let movedY = pos.plus(new Vec(0, ySpeed * time));
   if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
   } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
   } else {
      ySpeed = 0;
   }
   return new Player(pos, new Vec(xSpeed, ySpeed));
};

// Función trackKeys(): es un controlador de teclas que almacenta el estado actual de las teclas "ArrowLeft", "ArrowRight" y "ArrowUp". Esto se hace para que el efecto permanezca activo mientras estén presionadas, y no tengan efecto cada vez que se las presiona.
/*
function trackKeys(keys) {
   let down = Object.create(null);
   function track(event) {
      if (keys.includes(event.key)) {
         down[event.key] = event.type == "keydown";
         event.preventDefault();
      }
   }
   window.addEventListener("keydown", track);
   window.addEventListener("keyup", track);
   return down;
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
*/

// Función runAnimation(): es una interfaz conveniente que permite simplemente llamar a runAnimation, dándole una función que espera una diferencia de tiempo como argumento y dibuja un solo cuadro. Cuando la función de cuadro devuelve el valor false, la animación se detiene.

function runAnimation(frameFunc) {
   let lastTime = null;
   function frame(time) {
      if (lastTime != null) {
         let timeStep = Math.min(time - lastTime, 100) / 1000;
         if (frameFunc(timeStep) === false) return;
      }
      lastTime = time;
      requestAnimationFrame(frame);
   }
   requestAnimationFrame(frame);
}

// Función runLevel(): toma un Level objeto y un constructor de visualización y devuelve una promesa. Muestra el nivel (en document.body) y permite al usuario jugarlo. Cuando el nivel finaliza, runLevel espera un segundo más y luego borra la pantalla, detiene la animación y resuelve la promesa al estado final del juego.
/*
function runLevel(level, Display) {
   let display = new Display(document.body, level);
   let state = State.start(level);
   let ending = 1;

   const scapeKey = trackKeysOnetime(["Escape"]);

   function trackKeysOnetime(keys) {
      let down = Object.create(null);
      function track(event) {
         if (keys.includes(event.key)) {
            if (!Object.keys(down).includes(event.key)) {
               down[event.key] = true;
               event.preventDefault();
            } else if (down[event.key]) {
               down[event.key] = false;

               event.preventDefault();
            } else if (!down[event.key]) {
               down[event.key] = true;
               event.preventDefault();
            }
         }
      }
      window.addEventListener("keydown", track);
      return down;
   }

   return new Promise((resolve) => {
      runAnimation((time) => {
         if (scapeKey["Escape"] === true) {
            return false;
         }
         state = state.update(time, arrowKeys);
         display.syncState(state);
         if (state.status == "playing") {
            return true;
         } else if (ending > 0) {
            ending -= time;
            return true;
         } else {
            display.clear();
            resolve(state.status);
            return false;
         }
      });
   });
}
*/

// Función trackKeys() reformulada para eliminar sus controladores cuando el juego no se esté ejecutando.
function trackKeys(keys) {
   let down = Object.create(null);
   function track(event) {
      if (keys.includes(event.key)) {
         down[event.key] = event.type == "keydown";
         event.preventDefault();
      }
   }

   window.addEventListener("keydown", track);
   window.addEventListener("keyup", track);
   down.unregister = () => {
      window.removeEventListener("keydown", track);
      window.removeEventListener("keyup", track);
   };

   return down;
}

// Función runLevel() modificada para que se pueda pausar el juego presionando la tecla "Escape".
function runLevel(level, Display) {
   let display = new Display(document.body, level);
   let state = State.start(level);
   let ending = 1;
   let running = "yes";

   return new Promise((resolve) => {
      function escHandler(event) {
         if (event.key != "Escape") return;
         event.preventDefault();
         if (running == "no") {
            running = "yes";
            runAnimation(frame);
         } else if (running == "yes") {
            running = "pausing";
         } else {
            running = "yes";
         }
      }

      window.addEventListener("keydown", escHandler);
      let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

      function frame(time) {
         if (running == "pausing") {
            running = "no";
            return false;
         }

         state = state.update(time, arrowKeys);
         display.syncState(state);
         if (state.status == "playing") {
            return true;
         } else if (ending > 0) {
            ending -= time;
            return true;
         } else {
            display.clear();
            window.removeEventListener("keydown", escHandler);
            arrowKeys.unregister();
            resolve(state.status);
            return false;
         }
      }

      runAnimation(frame);
   });
}

// Función runGame(): toma una matriz de planes de niveles (cadenas) y un constructor de visualización. Cada vez que el jugador muere, se reinicia el nivel actual. Cuando se completa un nivel, pasamos al siguiente nivel.
async function runGame(plans, Display) {
   let lives = 3;
   for (let level = 0; level < plans.length; ) {
      if (lives === 0) {
         level = 0;
         lives = 3;
      }
      console.log("Lives: " + lives);
      let status = await runLevel(new Level(plans[level]), Display);
      if (status == "won") {
         level++;
      } else {
         lives--;
      }
   }
   console.log("You've won!");
}
