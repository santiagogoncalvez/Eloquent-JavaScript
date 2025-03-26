// Ejercicio conjuntos, capitulo 6;
class Group {
    constructor() {
        this.conjunto = [];
    };

    add(valor) {
        if (!this.conjunto.includes(valor)) {
            this.conjunto.push(valor);
        };
    };

    delete(valor) {
        if (this.conjunto.includes(valor) == true) {
            this.conjunto.splice(this.conjunto.indexOf(valor), 1);
        };
    };

    has(valor) {
        return this.conjunto.some(element => element === valor);
    };

    static from(arrayBase) {
        let array = [];
        for (let elements of arrayBase) {
            if (array.includes(elements) == false) {
                array.push(elements);
            };
        };

        return array;
    };

    [Symbol.iterator]() {
        class Iterador {
            constructor(matriz) {
                this.i = 0;
                this.matriz = matriz;
            }

            next() {
                if (this.i == this.matriz.length) {
                    return { value: undefined, done: true };
                }

                let value = this.matriz[this.i];
                this.i++;
                return { value, done: false };
            };
        };

        return new Iterador(this.conjunto);
    };


};

console.log(Group.from([1, 2, 3, 3, 2]))

let group = new Group();
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.add(20);
console.log(group.has(10));
console.log(group.has(10))

console.log(group);


// Iterar sobre los elementos del array de la propiedad conjunto, a traves del iterador creado en [Symbol.iterator]
for (let element of group) {
    console.log(element);
}


// Utilizar el iterador sobre un objeto.
let grouIterable = group[Symbol.iterator]();
console.log(grouIterable.next());
console.log(grouIterable.next());
console.log(grouIterable.next());

