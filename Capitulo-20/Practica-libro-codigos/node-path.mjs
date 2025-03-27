import path from "node:path";

const filePath = "/foo/bar/baz/asdf/index.js";

// path.dirname(): retorna el nombre del directorio de la ruta
console.log("▶︎  path.dirname()");
console.log(path.dirname(filePath));

// path.basename(): retorna la última parte de una ruta
console.log("\n▶︎  path.basename()");
console.log(path.basename(filePath));

// path.extname(): retorna la extensión de la ruta, desde la última ocurrencia del carácter ". (punto)" hasta el final de la cadena en la última parte de la ruta
console.log("\n▶︎  path.extname()");
console.log(path.extname(filePath));

// path.parse(): retorna un objeto cuyas propiedades representan elementos significativos del path
let pathObject = path.parse(filePath);

console.log("\n▶︎  path.parse()");
console.log(pathObject);

// path.format(): devuelve una cadena de ruta desde un objeto. Es lo opuesto a path.parse().
console.log("\n▶︎  path.format()");
console.log(path.format(pathObject));

// path.isAbsolute(): determina si path es una ruta absoluta, si lo es, retorna 'true' si no lo es retorna 'false'.
console.log("\n▶︎  path.isAbsolute()");
console.log(path.isAbsolute(filePath));
console.log(path.isAbsolute("./data.json"));

// path.join(): une todos los segmentos 'path' dados utilizando el separador específico de la plataforma como delimitador y luego normaliza la ruta resultante.
console.log("\n▶︎  path.join()");
console.log(path.join("foo", "bar", "baz"));
console.log(path.join("/foo", "bar", "baz"));
console.log(path.join("/foo", "//bar", "az"));
console.log(path.join("/foo", "//bar", "../baz"));

// path.resolve(): resuelve una secuencia de rutas o segmentos de ruta en una ruta absoluta. Si después de procesar todos los segmentos 'path' dados aún no se ha generado una ruta absoluta, se utiliza el directorio de trabajo actual.
console.log("\n▶︎  path.resolve()");
console.log(path.resolve("foo", "bar", "baz"));
console.log(path.resolve("/foo", "bar", "baz"));
console.log(path.resolve("/foo", "//bar", "az"));
console.log(path.resolve("/foo", "//bar", "../baz"));

// path.sep(): Proporciona el separador de segmento de ruta específico de la plataforma:
console.log("\n▶︎  path.sep()");
console.log(path.sep);
console.log("foo\\bar\\baz".split(path.sep));
