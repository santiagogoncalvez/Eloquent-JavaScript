// Getters, setters y statics
// get y set son propiedades de acceso

// Get: permite obtener el valor de una propiedad.
// Set: permite establecer el valor de una propiedad.

// Static: es un metodo estatico que se puede ejecutar sin necesidad de instanciar la clase.

class Temperatura {
   constructor(celsius) {
      this.celsius = celsius;
   }
   get fahrenheit() {
      return this.celsius * 1.8 + 32;
   }
   set fahrenheit(valor) {
      this.celsius = (valor - 32) / 1.8;
   }
   static desdeFahrenheit(valor) {
      return new Temperatura((valor - 32) / 1.8);
   }
}

let temp = new Temperatura(22);
console.log(temp.fahrenheit);

temp.fahrenheit = 86;
console.log(temp.celsius);

let tempDesdeFarenheit = Temperatura.desdeFahrenheit(100);
console.log(tempDesdeFarenheit.celsius);
