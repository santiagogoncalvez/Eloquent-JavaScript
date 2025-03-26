import { rename } from "node:fs";

let oldPath =
   "C:\\Users\\music\\Documents\\Programacion\\Ejercicios-Eloquent-JavaScript\\Capitulo-20\\Practica-libro-codigos\\sample-files\\text-3.txt";
let newName = "sample-text.txt";
let newPath = `C:\\Users\\music\\Documents\\Programacion\\Ejercicios-Eloquent-JavaScript\\Capitulo-20\\Practica-libro-codigos\\sample-files\\${newName}`;

rename(oldPath, newPath, (err) => {
   if (err) throw err;
   console.log(`Renamed file.`, "\n", oldPath, "------>", newPath);
});
