function elt(type, props, ...children) {
   let dom = document.createElement(type);
   if (props) {
      const { style, ...otherProps } = props;
      if (style && typeof style == "object") {
         Object.assign(dom.style, style);
      }
      Object.assign(dom, otherProps);
   }
   for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
   }
   return dom;
}

class Form {
   constructor(state, dispatch) {
      //El form cuando manda un dato debe utilizar la función 'dispatch' para actualizar el estado general
      this.dom = elt(
         "form",
         {
            style: {
               width: "350px",
               display: "flex",
               "flex-direction": "column",
            },
            onsubmit: (event) => {
               this.sendData(event, state, dispatch);
            },
         },
         "HTML",
         elt("br"),
         elt("textarea", {
            name: "htmlText",
            style: {
               resize: "none",
               width: "345px",
               height: "33.33%",
               margin: "0",
               "flex-grow": "1",
            },
            value: `${state.htmlText}`,
         }),

         elt("br"),
         "CSS",
         elt("textarea", {
            name: "cssText",
            style: {
               resize: "none",
               width: "345px",
               height: "33.33%",
               margin: "0",
               "flex-grow": "1",
            },
            value: `${state.cssText}`,
         }),
         elt("br"),
         "JAVASCRIPT",
         elt("textarea", {
            name: "jsText",
            style: {
               resize: "none",
               width: "345px",
               height: "33.33%",
               margin: "0",
               "flex-grow": "1",
            },
            value: `${state.jsText}`,
         }),
         elt("br"),
         elt("button", { type: "submit" }, "Enviar")
      );
   }

   async sendData(event, state, dispatch) {
      event.preventDefault();
      let newState = {};
      try {
         for (let key of Object.keys(state)) {
            newState[key] = this.dom.querySelector(`[name=${key}]`).value;
            await fetch(`http://localhost:8000/public/${key}.txt`, {
               method: "PUT",
               body: `${newState[key]}`,
               headers: { "Content-Type": "text/plain" },
            });
         }
      } catch (error) {
         throw error;
      }
      dispatch(newState);
   }
   syncState(state) {}
}

class Page {
   constructor(state) {
      this.dom = elt("div", {
         style: { "flex-grow": 1, "margin-left": "10px", overflow: "auto" },
      });
      this.syncState(state);
   }

   syncState(state) {
      if (this.state == state) return;
      //Css
      let styleElement = elt("style");
      styleElement.innerHTML = state.cssText;
      document.head.appendChild(styleElement);

      this.state = state;
      //HTML
      this.dom.innerHTML = state.htmlText;

      //Javascript
      /**
       * !Conflicto al ejecutar el codigo
       * ?El codigo se ejecuta antes de que todos los elementos sean agregados al DOM entonces los elementos a los que hace referencia no existen en el DOM.
       * this.dom.innerHTML agrega el contenido a este elemento pero este elemento en sí, todavía no fue agregado al documento.
       */
      setTimeout(() => {
         Function(state.jsText)();
      }, 0);
   }
}

class PageEditor {
   constructor(state, config) {
      let { dispatch } = config;

      this.state = state;
      this.form = new Form(state, dispatch);
      this.page = new Page(state);
      this.dom = elt(
         "div",
         { style: { display: "flex", width: "100%", height: "90%" } },
         this.form.dom,
         this.page.dom
      );
   }

   syncState(state) {
      this.state = state;
      this.page.syncState(state);
   }
}

async function getData() {
   let result = {
      htmlText: null,
      cssText: null,
      jsText: null,
   };

   try {
      for (let key of Object.keys(result)) {
         let response = await fetch(`http://localhost:8000/public/${key}.txt`, {
            method: "GET",
         });
         if (!response.ok)
            throw new Error(
               `Error getting 'htmlText'. Error ${response.status}: ${response.statusText}`
            );
         let text = await response.text();
         result[key] = text;
      }
   } catch (error) {
      throw error;
   }

   return result;
}

function updateState(state, action) {
   return { ...state, ...action };
}

async function startPageEditor(state) {
   //Asignar estado si no se pasa al argumento
   if (Object.keys(state) != 3) state = await getData();
   let app = new PageEditor(state, {
      dispatch(action) {
         state = updateState(state, action);
         app.syncState(state);
      },
   });
   return app.dom;
}
