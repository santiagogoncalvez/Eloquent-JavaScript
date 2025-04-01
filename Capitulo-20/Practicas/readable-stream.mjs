import fs from "node:fs";

const readableStream = fs.createReadStream("./sample-files/text-5.txt", {
   encoding: "utf8", highWaterMark: 1024
});

readableStream.on("data", (chunk) => {
   console.log("🔹 Chunk recibido.");
    console.log(chunk);
});

readableStream.on("end", () => {
   console.log("✅ Lectura completada.");
});
