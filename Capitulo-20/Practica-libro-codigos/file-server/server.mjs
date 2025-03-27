import { createServer } from "node:http";
import { resolve, sep } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { stat, readdir, unlink } from "node:fs/promises";
import { lookup } from "mime-types";
import { url } from "node:inspector";

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
   // para escuchar solo en local host "localhost"
   // !ponerlo SIEMPRE en "localhost" si estudio fuera de casa
   // para que escuche cualquier dispositivo conectado a la red "0.0.0.0"
}).listen(8000, "localhost", () => {
   console.log("Listening in port 8000.");
});

async function notAllowed(request) {
   return {
      status: 405,
      body: `Method ${request.method} not allowed.`,
   };
}

// process.cwd(): devuelve el directorio de trabajo actual (donde se ejecutó Node). Cambia si el script se ejecuta desde otro directorio.
const baseDirectory = process.cwd();

function urlPath(url) {
   // Se extrae la propiedad 'pathname' del objeto URL
   let { pathname } = new URL(url, "http://d");
   // Se decodifica la ruta para evitar codigos de tipo %20
   // Se elimina el primer caracter de la ruta ("\" o "/")
   let path = resolve(decodeURIComponent(pathname).slice(1));
   // Se evalúa si la ruta es igual al directorio actual o si la ruta se encuentra dentro del directorio actual
   if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
      throw { status: 403, body: "Forbidden" };
   }

   return path;
}

// Url que lanza error "http://d/main.mjs/..//imports". Ya que el constructor va a devolver el "pathname" '//imports', luego la funcíon resolve lo transforma en '/imports' y como es una ruta absoluta empieza por esa ruta.
// console.log(urlPath("http://d/main.mjs/..//imports"));

methods.GET = async function (request) {
   let path = urlPath(request.url);
   let stats;
   try {
      stats = await stat(path);
   } catch (error) {
      if (error.code != "ENOENT") throw error;
      else return { status: 404, body: "File not found" };
   }
   if (stats.isDirectory()) {
      return { body: (await readdir(path)).join("\n") };
   } else {
      return { body: createReadStream(path), type: lookup(path) };
   }
};

methods.DELETE = async function (request) {
   let path = urlPath(request.url);
   let stats;
   try {
      stats = await stat(path);
   } catch (error) {
      if (error.code != "ENOENT") throw error;
      else return { status: 204 };
   }
   if (stats.isDirectory()) await rmdir(path);
   else await unlink(path);
   return { status: 204 };
};

function pipeStream(from, to) {
   return new Promise((resolve, reject) => {
      from.on("error", reject);
      to.on("error", reject);
      to.on("finish", resolve);
      from.pipe(to);
   });
}

methods.PUT = async function (request) {
   let path = urlPath(request.url);
   await pipeStream(request, createWriteStream(path));
   return { status: 204 };
};
