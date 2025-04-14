"use strict";

function handleAction(state, action) {
   if (action.type == "setUser") {
      localStorage.setItem("userName", action.user);
      return { ...state, user: action.user };
   } else if (action.type == "setTalks") {
      return { ...state, talks: action.talks };
   } else if (action.type == "newTalk") {
      fetchOK(talkURL(action.title), {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            presenter: state.user,
            summary: action.summary,
         }),
      }).catch(reportError);
   } else if (action.type == "deleteTalk") {
      fetchOK(talkURL(action.talk), { method: "DELETE" }).catch(reportError);
   } else if (action.type == "newComment") {
      fetchOK(talkURL(action.talk) + "/comments", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            author: state.user,
            message: action.message,
         }),
      }).catch(reportError);
   }
   return state;
}

function fetchOK(url, options) {
   return fetch(url, options).then((response) => {
      if (response.status < 400) return response;
      else throw new Error(response.statusText);
   });
}

function talkURL(title) {
   return "talks/" + encodeURIComponent(title);
}

function reportError(error) {
   alert(String(error));
}

function renderUserField(name, dispatch) {
   return elt(
      "label",
      {},
      "Your name: ",
      elt("input", {
         type: "text",
         value: name,
         onchange(event) {
            dispatch({ type: "setUser", user: event.target.value });
         },
      })
   );
}

function elt(type, props, ...children) {
   let dom = document.createElement(type);
   if (props) Object.assign(dom, props);
   for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
   }
   return dom;
}

function renderTalk(talk, dispatch) {
   return elt(
      "section",
      { className: "talk" },
      elt(
         "h2",
         null,
         talk.title,
         " ",
         elt(
            "button",
            {
               type: "button",
               onclick() {
                  dispatch({ type: "deleteTalk", talk: talk.title });
               },
            },
            "Delete"
         )
      ),
      elt("div", null, "by ", elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      ...talk.comments.map(renderComment),
      elt(
         "form",
         {
            onsubmit(event) {
               event.preventDefault();
               let form = event.target;
               dispatch({
                  type: "newComment",
                  talk: talk.title,
                  message: form.elements.comment.value,
               });
               form.reset();
            },
         },
         elt("input", { type: "text", name: "comment" }),
         " ",
         elt("button", { type: "submit" }, "Add comment")
      )
   );
}

function renderComment(comment) {
   return elt(
      "p",
      { className: "comment" },
      elt("strong", null, comment.author),
      ": ",
      comment.message
   );
}

function renderTalkForm(dispatch) {
   let title = elt("input", { type: "text" });
   let summary = elt("input", { type: "text" });
   return elt(
      "form",
      {
         onsubmit(event) {
            event.preventDefault();
            dispatch({
               type: "newTalk",
               title: title.value,
               summary: summary.value,
            });
            event.target.reset();
         },
      },
      elt("h3", null, "Submit a Talk"),
      elt("label", null, "Title: ", title),
      elt("label", null, "Summary: ", summary),
      elt("button", { type: "submit" }, "Submit")
   );
}

async function pollTalks(update) {
   let tag = undefined;
   for (;;) {
      let response;
      try {
         response = await fetchOK("/talks", {
            headers: tag && { "If-None-Match": tag, Prefer: "wait=90" },
         });
      } catch (e) {
         console.log("Request failed: " + e);
         await new Promise((resolve) => setTimeout(resolve, 500));
         continue;
      }
      if (response.status == 304) continue;
      tag = response.headers.get("ETag");
      update(await response.json());
   }
}

class RenderTalk {
   constructor(talk, dispatch) {
      this.commentsDOM = elt("div", { className: "comments" });
      this.dom = elt(
         "section",
         { className: "talk" },
         elt("h2", null, talk.title, " "),
         elt(
            "button",
            {
               type: "button",
               onclick() {
                  dispatch({ type: "deleteTalk", talk: talk.title });
               },
            },
            "Delete"
         ),
         elt("div", null, "by ", elt("strong", null, talk.presenter)),
         elt("p", null, talk.summary),
         this.commentsDOM,
         elt(
            "form",
            {
               onsubmit(event) {
                  event.preventDefault();
                  let form = event.target;
                  dispatch({
                     type: "newComment",
                     talk: talk.title,
                     message: form.elements.comment.value,
                  });
                  form.reset();
               },
            },
            elt("input", { type: "text", name: "comment" }),
            " ",
            elt("button", { type: "submit" }, "Add comment")
         )
      );

      this.syncState(talk);
   }

   syncState(talk) {
      console.log(talk);
      // Agregar el ULTIMO ELEMENTO del array de comentarios.
      // La verificación se hace por fuera, no por dentro
      this.talk = talk;
      if (talk.comments.length == 0) return;
      this.commentsDOM.appendChild(
         renderComment(talk.comments[talk.comments.length - 1])
      );
   }
}

class RenderTalkDOM {
   constructor(state, dispatch) {
      this.dispatch = dispatch;
      this.talksComponents = {};
      this.dom = elt("div", { className: "talks" });
      this.syncState(state);
   }

   syncState(state) {
      // Guardar una referencia a las charlas
      if (state.talks == this.talks) return;
      this.talks = state.talks;

      // Eliminar charlas
      let talkKeys = Object.keys(this.talksComponents);
      for (let key of talkKeys) {
         if (!state.talks.some((talk) => talk.title == key)) {
            this.talksComponents[key].dom.remove();
            delete this.talksComponents[key];
         }
      }

      for (let talk of state.talks) {
         //? Actualizar charlas
         let found = this.talksComponents[talk.title];
         // Las charlas pueden mantener el título pero cambiar el presentador o la descripción
         if (
            found &&
            found.talk.presenter == talk.presenter &&
            found.talk.summary == talk.summary
         ) {

            // Actualizar solo si se agregó algun comentario
            console.log(found.talk.comments.length, talk.comments.length);
            if (found.talk.comments.length != talk.comments.length) {
               found.syncState(talk);
            }
         } else {
            // Nuevas charlas, O charlas que mantienen el título pero cambian el presentador o la descripción
            if (found) found.dom.remove();
            found = new RenderTalk(talk, this.dispatch);
            this.talksComponents[talk.title] = found;
            this.dom.appendChild(found.dom);
         }
      }
   }
}

var SkillShareApp = class SkillShareApp {
   constructor(state, dispatch) {
      this.dispatch = dispatch;
      //?Convertir this.talkDOM en una clase que contenga el contenedor de conversaciones y las conversaciones
      this.talkComponent = new RenderTalkDOM(state, dispatch);
      this.dom = elt(
         "div",
         null,
         renderUserField(state.user, dispatch),
         this.talkComponent.dom,
         renderTalkForm(dispatch)
      );
      this.syncState(state);
   }

   syncState(state) {
      if (state.talks != this.talks) {
         this.talkComponent.syncState(state);
         this.talks = state.talks;
      }
   }
};

function runApp() {
   let user = localStorage.getItem("userName") || "Anon";
   let state, app;
   function dispatch(action) {
      state = handleAction(state, action);
      app.syncState(state);
   }

   pollTalks((talks) => {
      if (!app) {
         state = { user, talks };
         app = new SkillShareApp(state, dispatch);
         document.body.appendChild(app.dom);
      } else {
         dispatch({ type: "setTalks", talks });
      }
   }).catch(reportError);
}

runApp();
