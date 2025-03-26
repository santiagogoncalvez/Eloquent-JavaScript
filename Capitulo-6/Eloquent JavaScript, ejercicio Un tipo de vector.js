// Ejercicio un tipo de vector, capitulo 6.
// En este caso se hablad e vectores en geometria.
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vector = [x, y];
    }

    mas({x, y}) {
        let suma = { x: this.x + x, y: this.y + y };
        return suma;
    }

    menos({x, y}) {
        let resta = { x: this.x - x, y: this.y - y };
        return resta;
    }

    get longitud() {
        console.log(this.x, this.y)
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

console.log(new Vec(1, 2).mas(new Vec(2,3)));
console.log(new Vec(1,2).menos(new Vec(2,3)));
console.log(new Vec(3,4).longitud);


