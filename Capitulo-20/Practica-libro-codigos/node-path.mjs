import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);
c 
// path.basename(): devuelve la última parte de una ruta
// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));
