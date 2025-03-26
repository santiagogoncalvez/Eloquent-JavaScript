// JSON es un formato de almacenamiento y comunicación de datos en la Web

// JSON.stringify:  toma un valor en JavaScript y
// retorna un string codificado en JSON
let string = JSON.stringify(
    {
        ardilla: false,
        eventos: ["Fin de semana"]
    }
);

console.log(string);     // {"ardilla":false,"eventos":["Fin de semana"]}

// JSON.parse: toma un string en formato JSON y
// lo convierte al valor que este codifica
console.log(JSON.parse(string).ardilla)     // false