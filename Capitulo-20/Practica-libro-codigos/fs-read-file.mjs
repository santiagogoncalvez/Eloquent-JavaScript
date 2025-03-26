import { read, readFile } from "node:fs";

// Codificación 'UTF-8'
readFile("./sample-files/text.txt", "utf8", (error, text) => {
   if (error) throw error;
   console.log("The file contains:", text);
});

// Datos binarios
readFile("./sample-files/text.txt", (error, buffer) => {
   if (error) throw error;
   console.log(
      "El archivo contiene",
      buffer.length,
      "bytes",
      "El primer byte es",
      buffer[0]
   );
});
