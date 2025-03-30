import { createServer } from "node:http";
import { resolve, sep, join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { stat, readdir, unlink, rmdir, mkdir } from "node:fs/promises";
import { lookup } from "mime-types";

const methods = Object.create(null);

createServer((request, response) => {
   let handler = methods[request.method] || notAllowed;
   handler(request)
      .catch((error) => {
         if (error.status != null) return error;
         return { body: String(error), status: 500 };
      })
      .then(({ body, status = 200, type = "text/plain" }) => {
         response.setHeader("Access-Control-Allow-Origin", "*");
         response.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
         );
         response.setHeader("Access-Control-Allow-Headers", "Content-Type");

         response.writeHead(status, {
            "Content-Type": type,
         });

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
const publicFolder = "public";
const baseDirectory = join(process.cwd(), publicFolder);

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

/* 
Cuando un navegador detecta una solicitud que no cumple con las reglas estándar de CORS (por ejemplo, un PUT con encabezados personalizados o contenido JSON), realiza una solicitud OPTIONS para verificar si el servidor permite esa acción desde el origen de la solicitud. Esto se llama 
'preflight request' y es parte del proceso CORS.

Es una "solicitud preliminar" que permite a los navegadores realizar solicitudes seguras, evitando posibles riesgos de seguridad al permitir el acceso solo a aquellos orígenes que el servidor haya permitido.

Cuando el servidor responde correctamente a esta solicitud OPTIONS con las cabeceras adecuadas, el navegador permite que la solicitud real (en este caso PUT) se ejecute.
*/
methods.OPTIONS = async function (request) {
   return { status: 200 };
};

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

methods.MKCOL = async function (request) {
   let path = urlPath(request.url);
   let stats;
   try {
      stats = await stat(path);
   } catch (error) {
      //La ruta no representa ni un archivo ni una carpeta
      if (error.code != "ENOENT") throw error;
      //Si la ruta previa a la carpeta a crear no es válida el error lo va a lanzar mkdir()
      await mkdir(path);
      return { status: 204 };
   }

   //La ruta es una carpeta existente o un archivo existente
   if (stats.isDirectory()) return { status: 204 };
   else return { status: 400, body: "Not a directory" };
};
