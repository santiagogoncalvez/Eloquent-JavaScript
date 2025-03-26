// Implementacion del módulo format-date

const { formatDate } = require("./CommonsJs-format-date");
let fs = require("fs");

console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));


// Definicion de require con formato de cache:

require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = fs.readFile(name, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            console.log(data);
        }
    });
    let module = {exports: {}};
    require.cache[name] = module;
    let wrapper = Function("require, exports, module", code);
    wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}