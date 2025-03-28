import fs from "node:fs/promises";

const expReg = new RegExp(`${process.argv[2]}`);
const filePaths = process.argv.slice(3);

console.log(expReg, filePaths);
