import { writeFile } from "node:fs";

writeFile("./sample-files/text-2.txt", "Node was here", (err) => {
   if (err) console.log(`Filed to write file: ${err}`);
   else console.log("File written.");
});
