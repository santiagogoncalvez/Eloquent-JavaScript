import { unlink } from "node:fs";

let filePath =
   "C:\\Users\\music\\Documents\\Programacion\\Ejercicios-Eloquent-JavaScript\\Capitulo-20\\Practica-libro-codigos\\sample-files\\sample-text.txt";

unlink(filePath, (err) => {
   if (err) throw err;
   console.log("Eliminado:", filePath);
});
