import { createServer } from "node:http";
import { resolve, sep } from "node:path";

const methods = Object.create(null);

createServer((request, response) => {
   let handler = methods[request.method] || notAllowed;
   handler(request)
      .catch((error) => {
         if (error.status != null) return error;
         return { body: String(error), status: 500 };
      })
      .then(({ body, status = 200, type = "text/plain" }) => {
         response.writeHead(status, { "Content-Type": type });
         if (body?.pipe) body.pipe(response);
         else response.end(body);
      });
}).listen(8000, "localhost");
console.log("Listening in port 8000.");

async function notAllowed(request) {
   return {
      status: 405,
      body: `Method ${request.method} not allowed.`,
   };
}

const baseDirectory = process.cwd();

function urlPath(url) {
   let { pathname } = new URL(url, "http://d");
   let path = resolve(decodeURIComponent(pathname).slice(1));
   if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
      throw { status: 403, body: "Forbidden" };
   }

   return path;
}
