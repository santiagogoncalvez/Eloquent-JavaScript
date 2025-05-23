// 'Picture': representa el estado de la aplicación
class Picture {
   constructor(width, height, pixels) {
      this.width = width;
      this.height = height;
      this.pixels = pixels;
   }

   static empty(width, height, color) {
      let pixels = new Array(width * height).fill(color);
      return new Picture(width, height, pixels);
   }
   pixel(x, y) {
      return this.pixels[x + y * this.width];
   }
   draw(pixels) {
      let copy = this.pixels.slice();
      for (let { x, y, color } of pixels) {
         copy[x + y * this.width] = color;
      }
      return new Picture(this.width, this.height, copy);
   }
}

// 'updateState': función para actualizar el estado de la aplicación. La interfaz envía acciones como objetos cuyas propiedades sobreescriben las del estado anterior (propagación de objetos).
function updateState(state, action) {
   return { ...state, ...action };
}

// 'elt': función que permite crear estructuras DOM y asignarles propiedades (no atributos)
function elt(type, props, ...children) {
   let dom = document.createElement(type);
   if (props) Object.assign(dom, props);
   for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
   }

   return dom;
}

const scale = 10;

/*
'PictureCanvas': componente que se encarga de mostrar la imagen como una cuadrícula de cuadros. Se encarga de:
   - Mostrar una imagen
   - Comunicar los eventos del puntero sobre esta al resto de la aplicación.
*/

class PictureCanvas {
   constructor(picture, pointerDown) {
      this.dom = elt("canvas", {
         onmousedown: (event) => this.mouse(event, pointerDown),
         ontouchstart: (event) => this.touch(event, pointerDown),
      });
      this.syncState(picture);
   }

   syncState(picture) {
      if (this.picture == picture) return;
      this.picture = picture;
      drawPicture(this.picture, this.dom, scale);
   }
}

// 'drawPicture': función de dibujo real que establece el tamaño del lienzo en función de la escala y el tamaño de la imagen y lo rellena con una serie de cuadrados, uno para cada píxel.
function drawPicture(picture, canvas, scale) {
   canvas.width = picture.width * scale;
   canvas.height = picture.height * scale;
   let cx = canvas.getContext("2d");

   for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
         cx.fillStyle = picture.pixel(x, y);
         cx.fillRect(x * scale, y * scale, scale, scale);
      }
   }
}

// 'PictureCanvas.prototype.mouse': método que se encarga de responder a los eventos de puntero. Llama a una función de devolución de llamada proporcionada por el código que lo creó, la cual gestionará las partes específicas de la aplicación.
PictureCanvas.prototype.mouse = function (downEvent, onDown) {
   if (downEvent.button != 0) return;
   let pos = pointerPosition(downEvent, this.dom);
   let onMove = onDown(pos);

   if (!onMove) return;
   let move = (moveEvent) => {
      if (moveEvent.buttons == 0) {
         this.dom.removeEventListener("mousemove", move);
      } else {
         let newPos = pointerPosition(moveEvent, this.dom);
         if (newPos.x == pos.x && newPos.y == pos.y) return;
         pos = newPos;
         onMove(newPos);
      }
   };
   this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
   let rect = domNode.getBoundingClientRect();
   return {
      x: Math.floor((pos.clientX - rect.left) / scale),
      y: Math.floor((pos.clientY - rect.top) / scale),
   };
}

// 'PictureCanvas.prototype.mouse': método que se encarga de responder a los eventos tácticles. Llama a una función de devolución de llamada proporcionada por el código que lo creó, la cual gestionará las partes específicas de la aplicación.
PictureCanvas.prototype.touch = function (startEvent, onDown) {
   let pos = pointerPosition(startEvent.touches[0], this.dom);
   let onMove = onDown(pos);

   startEvent.preventDefault();
   if (!onMove) return;
   let move = (moveEvent) => {
      let newPos = pointerPosition(moveEvent.touches[0], this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
   };
   let end = () => {
      this.dom.removeEventListener("touchmove", move);
      this.dom.removeEventListener("touchend", end);
   };
   this.dom.addEventListener("touchmove", move);
   this.dom.addEventListener("touchend", end);
};

// 'PixelEditor': componente principal que engloba a los otros componentes y permite crear la aplicación pieza por pieza.
class PixelEditor {
   constructor(state, config) {
      let { tools, controls, dispatch } = config;

      this.state = state;
      this.canvas = new PictureCanvas(state.picture, (pos) => {
         let tool = tools[this.state.tool];
         let onMove = tool(pos, this.state, dispatch);
         if (onMove) return (pos) => onMove(pos, this.state);
      });

      //? Formato para creación de varios componentes, que son guardados en una propiedad.
      this.controls = controls.map((Control) => new Control(state, config));
      this.dom = elt(
         "div",
         {},
         this.canvas.dom,
         //Se crea un array de los elementos con espacion entre medio, esto va a devolver un array de elementos. Para poder mandarlos a la función se usa el spread-operator (...) para mandar cada valor del array de manera individual a la función 'elt'.
         elt("br"),
         ...this.controls.reduce((a, c) => a.concat(" ", c.dom), [])
      );
   }

   syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
   }
}

// 'ToolSelect': control de menú de selección de herramientas.
class ToolSelect {
   constructor(state, { tools, dispatch }) {
      this.select = elt(
         "select",
         {
            onchange: () => dispatch({ tool: this.select.value }),
         },
         ...Object.keys(tools).map((name) =>
            elt(
               "option",
               {
                  selected: name == state.tool,
               },
               name
            )
         )
      );
      this.dom = elt("label", null, "🖌 Tool: ", this.select);
   }

   syncState(state) {
      this.select.value = state.tool;
   }
}

// 'ColorSelect': control para seleccionar colores.
class ColorSelect {
   constructor(state, { dispatch }) {
      this.input = elt("input", {
         type: "color",
         value: state.color,
         onchange: () => dispatch({ color: this.input.value }),
      });
      this.dom = elt("label", null, "🎨 Color: ", this.input);
   }

   syncState(state) {
      this.input.value = state.color;
   }
}

// Herramientas

// Herramienta de dibujo
function draw(pos, state, dispatch) {
   function drawPixel({ x, y }, state) {
      let drawn = { x, y, color: state.color };
      dispatch({ picture: state.picture.draw([drawn]) });
   }
   drawPixel(pos, state);

   return drawPixel;
}

// Herramienta para crear rectángulos
function rectangle(start, state, dispatch) {
   function drawRectangle(pos) {
      let xStart = Math.min(start.x, pos.x);
      let yStart = Math.min(start.y, pos.y);
      let xEnd = Math.max(start.x, pos.x);
      let yEnd = Math.max(start.y, pos.y);
      let drawn = [];
      for (let y = yStart; y <= yEnd; y++) {
         for (let x = xStart; x <= xEnd; x++) {
            drawn.push({ x, y, color: state.color });
         }
      }
      dispatch({ picture: state.picture.draw(drawn) });
   }
   drawRectangle(start);

   return drawRectangle;
}

// Herramienta de relleno por inundación
const around = [
   { dx: -1, dy: 0 },
   { dx: 1, dy: 0 },
   { dx: 0, dy: -1 },
   { dx: 0, dy: 1 },
];

function fill({ x, y }, state, dispatch) {
   let targetColor = state.picture.pixel(x, y);
   let drawn = [{ x, y, color: state.color }];
   let visited = new Set();

   for (let done = 0; done < drawn.length; done++) {
      for (let { dx, dy } of around) {
         let x = drawn[done].x + dx,
            y = drawn[done].y + dy;
         if (
            x >= 0 &&
            x < state.picture.width &&
            y >= 0 &&
            y < state.picture.height &&
            !visited.has(x + "," + y) &&
            state.picture.pixel(x, y) == targetColor
         ) {
            drawn.push({ x, y, color: state.color });
            visited.add(x + "," + y);
         }
      }
   }
   dispatch({ picture: state.picture.draw(drawn) });
}

// Herramienta selector de color
function pick(pos, state, dispatch) {
   dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}

// Control para guardar imagen
class SaveButton {
   constructor(state) {
      // Se va a mantener actualizado siempre ya que 'this.picture' contiene una referencia al objeto 'state.picture'
      this.picture = state.picture;
      this.dom = elt(
         "button",
         {
            onclick: () => this.save(),
         },
         "💾 Save"
      );
   }

   save() {
      let canvas = elt("canvas");
      drawPicture(this.picture, canvas, 1);
      let link = elt("a", {
         href: canvas.toDataURL(),
         download: "pixelart.png",
      });
      document.body.appendChild(link);
      link.click();
      link.remove();
   }
   syncState(state) {
      this.picture = state.picture;
   }
}

// Control para cargar una imagen
class LoadButton {
   constructor(_, { dispatch }) {
      this.dom = elt(
         "button",
         {
            onclick: () => startLoad(dispatch),
         },
         "📁 Load"
      );
   }

   syncState() {}
}

// Función para acceder al archivo
function startLoad(dispatch) {
   let input = elt("input", {
      type: "file",
      onchange: () => finishLoad(input.files[0], dispatch),
   });
   document.body.appendChild(input);
   input.click();
   input.remove();
}

// Función para procesar el archivo
function finishLoad(file, dispatch) {
   if (file == null) return;
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      let image = elt("img", {
         onload: () => dispatch({ picture: pictureFromImage(image) }),
         src: reader.result,
      });
   });
   reader.readAsDataURL(file);
}

// Función para acceder y procesar los píxeeles de la imagen
function pictureFromImage(image) {
   let width = Math.min(100, image.width),
      height = Math.min(100, image.height),
      canvas = elt("canvas", { width, height }),
      cx = canvas.getContext("2d"),
      pixels = [];
   cx.drawImage(image, 0, 0);
   let { data } = cx.getImageData(0, 0, width, height);

   function hex(n) {
      return n.toString(16).padStart(2, "0");
   }
   for (let i = 0; i < data.length; i += 4) {
      let [r, g, b] = data.slice(i, i + 3);
      pixels.push("#" + hex(r) + hex(g) + hex(b));
   }

   return new Picture(width, height, pixels);
}

// Función que se encarga del procesamiento del historial de deshacer
function historyUpdateState(state, action) {
   if (action.undo == true) {
      if (state.done.length == 0) return state;
      return {
         ...state,
         picture: state.done[0],
         done: state.done.slice(1),
         doneAt: 0,
      };
   } else if (action.picture && state.doneAt < Date.now() - 1000) {
      return {
         ...state,
         ...action,
         done: [state.picture, ...state.done],
         doneAt: Date.now(),
      };
   } else {
      return { ...state, ...action };
   }
}

// Control deshacer
class UndoButton {
   constructor(state, { dispatch }) {
      this.dom = elt(
         "button",
         {
            onclick: () => dispatch({ undo: true }),
            disabled: state.done.length == 0,
         },
         "⮪ Undo"
      );
   }

   syncState(state) {
      this.dom.disabled = state.done.lenght == 0;
   }
}

// Configuración de la aplicación
const startState = {
   tool: "draw",
   color: "#000000",
   picture: Picture.empty(60, 30, "#f0f0f0"),
   done: [],
   doneAt: 0,
};

const baseTools = { draw, fill, rectangle, pick };

const baseControls = [
   ToolSelect,
   ColorSelect,
   SaveButton,
   LoadButton,
   UndoButton,
];

function startPixelEditor({
   state = startState,
   tools = baseTools,
   controls = baseControls,
}) {
   let app = new PixelEditor(state, {
      tools,
      controls,
      dispatch(action) {
         state = historyUpdateState(state, action);
         app.syncState(state);
      },
   });
   return app.dom;
}
