import { stat } from "node:fs";

let filePath =
   "C:\\Users\\music\\Documents\\Programacion\\Ejercicios-Eloquent-JavaScript\\Capitulo-20\\Practica-libro-codigos\\sample-files\\text.txt";

stat(filePath, (err, stats) => {
   if (err) throw err;
   console.log(stats);
});
