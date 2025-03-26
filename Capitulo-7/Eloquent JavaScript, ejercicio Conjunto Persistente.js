// Ejercicio conjuntos, capitulo 6;
class GroupP {
    constructor(array) {

        if (array != undefined) {
            let grupo = [];
            for (let element of array) {
                if (!grupo.includes(element)) {
                    grupo.push(element);
                };
            }
            this.conjunto = grupo;
        } else {
            this.conjunto = [];
        };
    };

    add(valor) {
        if (!this.conjunto.includes(valor)) {
            return new GroupP (this.conjunto.concat(valor));
        };
    };

    delete(valor) {
        if (this.conjunto.includes(valor) == true) {
            return new GroupP (this.conjunto.filter(m => m !== valor));
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

let group = new GroupP ([1,2,2,3,3,4]);
console.log(group);
let group2 = group.add(5)
console.log(group2);
console.log(group);
let group3 = group.delete(4)
console.log(group3)
console.log(group3.delete(1))