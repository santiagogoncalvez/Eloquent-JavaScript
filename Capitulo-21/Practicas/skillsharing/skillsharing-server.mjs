import { createServer } from "node:http";
import serveStatic from "serve-static";
import { Router } from "./router.mjs";

function notFound(request, response) {
   response.writeHead(404, "Not found");
   response.end("<h1>Not found</h1>");
}

class SkillShareServer {
   constructor(talks) {
      this.talks = talks;
      this.version = 0;
      this.waiting = [];

      let fileServer = serveStatic("./public");
      this.server = createServer((request, response) => {
         serveFromRouter(this, request, response, () => {
            fileServer(request, response, () => notFound(request, response));
         });
      });
   }

   start(port) {
      this.server.listen(port);
   }
   stop() {
      this.server.close();
   }
}

const router = new Router();
const defaultHeaders = { "Content-Type": "text/plain" };

async function serveFromRouter(server, request, response, next) {
   let resolved = await router.resolve(request, server).catch((error) => {
      if (error.status != null) return error;
      return { body: String(error), status: 500 };
   });
   if (!resolved) return next();
   let { body, status = 200, headers = defaultHeaders } = await resolved;
   response.writeHead(status, headers);
   response.end(body);
}

const talkPath = /^\/talks\/([^\/]+)$/;

router.add("GET", talkPath, async (server, title) => {
   if (Object.hasOwn(server.talks, title)) {
      return {
         body: JSON.stringify(server.talks[title]),
         headers: { "Content-Type": "application/json" },
      };
   } else {
      return { status: 404, body: `No talk '${title}' found` };
   }
});
