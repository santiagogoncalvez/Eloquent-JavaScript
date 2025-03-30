function elt(type, props, ...children) {
   let dom = document.createElement(type);
   if (props) Object.assign(dom, props);
   for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
   }
   return dom;
}

class Form {
   constructor(htmlText, dispatch) {
      //El form cuando manda un dato debe utilizar la función 'dispatch' para actualizar el estado general
      this.dom = elt("form");
   }
   syncState() {}
}

class Page {
   constructor(htmlText) {
      this.dom = elt("div");
      this.syncState(htmlText);
   }

   syncState(htmlText) {
      if (this.htmlText == htmlText) return;
      this.htmlText = htmlText;
      this.dom.innerHTML = htmlText;
   }
}
class PageEditor {
   constructor(state, config) {
      let { dispatch } = config;

      this.state = state;
      this.form = new Form(state.htmlText, dispatch);
      this.page = new Page(state.htmlText);
      this.dom = elt("div", {}, this.form.dom, this.page.dom);
   }
}

async function getData() {
   try {
      let response = await fetch("http://localhost:8000/public/htmlText.txt", {
         method: "GET",
      });
      if (!response.ok)
         throw new Error(
            `Error getting 'htmlText'. Error ${response.status}: ${response.statusText}`
         );
      let text = await response.text();
      return text;
   } catch (error) {
      throw error;
   }
}

async function startPageEditor(state) {
   //Asignar estado si no se pasa al argumento
   if (!state.htmlText) state = { htmlText: await getData() };
   let app = new PageEditor(state, {
      dispatch(action) {
         state = updateState(state, action);
         app.syncState(state);
      },
   });
   return app.dom;
}
