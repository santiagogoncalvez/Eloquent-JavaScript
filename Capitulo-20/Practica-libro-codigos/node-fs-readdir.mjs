import { stat, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

const filePaths = process.argv.slice(2).map((path) => {
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

            console.log(filePathsDirectory);
         }
      }
   } catch (error) {
      throw new Error(error);
   }
}

evaluateFile(filePaths);
