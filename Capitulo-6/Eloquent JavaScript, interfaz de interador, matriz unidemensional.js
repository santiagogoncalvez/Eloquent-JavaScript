// La interfaz de iterador

/*
 Se espera que el objeto dado a un ciclo for/of sea iterable. Esto significa que
tenga un método llamado con el símbolo Symbol.iterator
 */

let iteradorOK = "OK"[Symbol.iterator]();
console.log(iteradorOK);
console.log(iteradorOK.next());
console.log(iteradorOK.next());
console.log(iteradorOK.next());

// Estructura de datos iterable
// Clase matriz, actua como un array bidimensional

// Esta clase crea un arreglo unidimensional que es la representacion de una matriz bidimensional mediante el posicionamiento y * ancho + x
/*
    Matriz en formato bidimesional:
    1  2  3
    4  5  6
    7  8  9

    Matriz en formato unidimensional:
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */

class Matriz {
   constructor(ancho, altura, elemento = (x, y) => undefined) {
      this.ancho = ancho;
      this.altura = altura;
      this.contenido = [];
      for (let y = 0; y < altura; y++) {
         for (let x = 0; x < ancho; x++) {
            this.contenido[y * ancho + x] = elemento(x, y);
         }
      }
   }

   obtener(x, y) {
      return this.contenido[y * this.ancho + x];
   }

   establecer(x, y, valor) {
      this.contenido[y * this.ancho + x] = valor;
   }
}

// let matriz = new Matriz(2, 2);
// console.log(matriz)
// matriz.establecer(1, 1, 4);
// console.log(matriz);
// console.log(matriz.obtener(1, 1))

class IteradorMatriz {
   constructor(matriz) {
      this.x = 0;
      this.y = 0;
      this.matriz = matriz;
   }
   next() {
      if (this.y == this.matriz.altura) return { done: true };
      let value = {
         x: this.x,
         y: this.y,
         value: this.matriz.obtener(this.x, this.y),
      };
      this.x++;
      if (this.x == this.matriz.ancho) {
         this.x = 0;
         this.y++;
      }
      return { value, done: false };
   }
}

// Agregar al prototipo de la clase Matriz el iterador de matriz creado (MatrizIterator):

// Se agrega al prototipo de la clase Matriz la propiedad con el simbolo Symbol.iterator, y se le asigna una funcion que devuelve una instancia del iterador de matriz.

Matriz.prototype[Symbol.iterator] = function () {
   return new IteradorMatriz(this);
};

// Ahora se puede recorrer una matriz con for/of
let matriz2 = new Matriz(2, 2, (x, y) => `valor ${x}, ${y}`);

for (let { x, y, value } of matriz2) {
   console.log(x + "" + y + ":", value);
}

console.log(matriz2);
