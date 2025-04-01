//Codigo que emula el comortamiento del comando 'grep' en sistemas Unix.
import { readFile, stat, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

const regExp = new RegExp(`${process.argv[2]}`);
const filePaths = process.argv.slice(3).map((path) => {
   return resolve(path);
});

async function evaluateFile(filePaths) {
   try {
      let stats, text;
      for (let path of filePaths) {
         stats = await stat(path);

         if (stats.isDirectory()) {
            let fileNames = await readdir(path);
            let filePathsDirectory = fileNames.map((fileName) => {
               return join(path, fileName);
            });
            await evaluateFile(filePathsDirectory);
         } else {
            text = await readFile(path, "utf8");
            if (regExp.test(text)) {
               console.log(path);
            }
         }
      }
   } catch (error) {
      throw new Error(error);
   }
}

evaluateFile(filePaths);
