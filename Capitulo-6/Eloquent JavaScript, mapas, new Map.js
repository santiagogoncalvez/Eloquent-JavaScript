// Clase Map
// Esta almacena un mapeo y permite cualquier tipo de llaves

let objeto = {
    Boris: 23,
    Pablo: 20,
    Esteban: 25
};

console.log(`La edad de Boris es ${objeto["Boris"]}`);


let personas = new Map();
personas.set("Boris", 23);

console.log(`Boris tiene ${personas.get("Boris")}`);
console.log("Existe Pablo?", personas.has("Pablo"));

// Los metodos set, get y has son metodos son parte de la interfaz del objeto Map



// Object.keys solo retorna las llaves propias del objeto, no las que estan en el prototipo.
console.log(Object.keys(objeto));



// El operador in devuelve true si la propiedad especificada está en el objeto especificado o su prototipo.
console.log("Boris" in objeto);



// El método hasOwnProperty (“tienePropiaPropiedad”) ignora el prototipo del objeto y devuelve true si la propiedad
// especificada se encuentra en el objeto
console.log(objeto.hasOwnProperty("Boris"));

console.log({ x: 1 }.hasOwnProperty("x"));
console.log({ x: 1 }.hasOwnProperty("toString"))



/*Cuando llamas a la función String() en un
objeto, llamará al método toString en ese objeto para tratar de crear un string
significativo a partir de el. */

class Ardilla {
    constructor(tipo) {
        this.tipo = tipo;
    }

    hablar(linea) {
        console.log(`El conejo ${this.tipo} dice ${linea}`)
    }
}

let conejoAsesino = new Ardilla("Asesino");
console.log(String(conejoAsesino))

// Uno puede definir una propia version de toString
Ardilla.prototype.toString = function () {
    return `El conejo es ${this.tipo}`;
};

console.log(String(conejoAsesino))