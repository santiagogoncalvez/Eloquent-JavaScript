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
      function keyEventTextarea(event) {
         if (event.key == "Tab") {
            event.preventDefault();
            function replaceSelection(field, word) {
               let from = field.selectionStart,
                  to = field.selectionEnd;

               field.value =
                  field.value.slice(0, from) + word + field.value.slice(to);

               //Put the cursor after the word
               field.selectionStart = from + word.length;
               field.selectionEnd = from + word.length;
            }
            replaceSelection(event.target, "  ");
         }
      }
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
               this.sendData(event, this.state, dispatch);
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
               "box-sizing": "border-box",
               padding: "10px",
            },
            value: `${state.texts.htmlText}`,
            onkeydown: (event) => {
               keyEventTextarea(event);
            },
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
               "box-sizing": "border-box",
               padding: "10px",
            },
            value: `${state.texts.cssText}`,
            onkeydown: (event) => {
               keyEventTextarea(event);
            },
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
               "box-sizing": "border-box",
               padding: "10px",
            },
            value: `${state.texts.jsText}`,
            onkeydown: (event) => {
               keyEventTextarea(event);
            },
         }),
         elt("br"),
         elt("button", { type: "submit" }, "Enviar")
      );
      this.syncState(state);
   }

   async sendData(event, state, dispatch) {
      event.preventDefault();
      let newState = {};

      try {
         for (let key of Object.keys(state.texts)) {
            newState[key] = this.dom.querySelector(`[name=${key}]`).value;
            await fetch(`${state.serverUrl}/public/${key}.txt`, {
               method: "PUT",
               body: `${newState[key]}`,
               headers: { "Content-Type": "text/plain" },
            });
         }
      } catch (error) {
         throw error;
      }
      dispatch({ texts: newState });
   }
   syncState(state) {
      this.state = state;
   }
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

      //HTML
      this.dom.innerHTML = state.texts.htmlText;

      // Css
      let styleElement = document.querySelector("#app-style");
      if (styleElement) {
         styleElement.innerHTML = state.texts.cssText;
      } else {
         styleElement = elt("style", { id: "app-style" });
         styleElement.innerHTML = state.texts.cssText;
         document.head.appendChild(styleElement);
      }

      //Javascript
      if (state.domCreated) {
         Function(state.texts.jsText)();
      }

      this.state = state;
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
      this.domCreatedAction = () => {
         dispatch({ domCreated: true });
      };
   }

   syncState(state) {
      this.state = state;
      this.form.syncState(state);
      this.page.syncState(state);
   }
}

async function getData(serverUrl) {
   let result = {
      htmlText: null,
      cssText: null,
      jsText: null,
   };

   try {
      for (let key of Object.keys(result)) {
         let response = await fetch(`${serverUrl}/public/${key}.txt`, {
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

// state = {htmlText, cssText, jsText, createApp}
export async function startPageEditor({ serverUrl, texts, domCreated }) {
   serverUrl = serverUrl || "http://localhost:8000";
   texts = texts || (await getData(serverUrl));
   domCreated = domCreated || false;

   let state = { serverUrl, texts, domCreated };

   let app = new PageEditor(state, {
      dispatch(action) {
         state = updateState(state, action);
         app.syncState(state);
      },
   });
   return app;
}
