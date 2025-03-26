// Analizar archivo INI mediante modulo de npm

const {parse} = require("./Packages/node_modules/ini");

console.log(parse("x = 10\ny = 20"));