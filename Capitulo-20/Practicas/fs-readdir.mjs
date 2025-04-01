import { readdir } from "node:fs";

let dirPath =
   "C:\\Users\\music\\Documents\\Programacion\\Ejercicios-Eloquent-JavaScript\\Capitulo-20\\Practica-libro-codigos";

readdir(dirPath, (err, files) => {
   if (err) throw err;
   console.log(files);
});
