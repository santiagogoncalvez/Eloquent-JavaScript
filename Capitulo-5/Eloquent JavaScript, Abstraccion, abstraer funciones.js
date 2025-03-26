// Hacer que un programa haga algo una cierta cantidad de veces:
for (let i = 0; i < 10; i++) {
    console.log(i)
};


// Abstraer "hacer algo N veces" como una funcion:
function repetirLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i);
    };
};
repetirLog(5);


// Pasar la accion que queremos que se ralice como valor de funcion
function repetir(n, accion) {
    for (let i = 0; i < n; i++) {
        accion(i);
    };
};
// Llamar con console.log
repetir(4, console.log)
//  1
//  2
//  3
//  4

// Llamar con un valor de funcion
let arreglo = [];
repetir(6, (i) => { arreglo.push(`Unidad ${i + 1}`) })

console.log(arreglo)
//  [ 'Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4', 'Unidad 5', 'Unidad 6' ]



// Funciones que crean otras funciones
function mayorQue(n) {
    return m => m > n;
};
let mayorQue10 = mayorQue(10);
console.log(mayorQue10(11))
// true



// Funcion que cambia otra funcion
function ruidosa(funcion) {
    return (...argumentos) => {
        console.log("llamando con", argumentos);
        let resultado = funcion(...argumentos);
        console.log("llamada con", argumentos, ", retorno ", resultado);
    };
};

ruidosa(Math.min)(3, 2, 5);


// forEach proporciona algo como
// un ciclo for/of como una función de orden superior.

// Este metodo se utiliza para iterar sobre los elementos de un array y ejecutar una función determinada en cada uno de ellos.

let array = ["a", "b", "c"];
array.forEach((elemento) => console.log(elemento))



// Esta funcion produce nuevos tipos de flujo de control:
function aMenosQue(prueba, entonces) {
    if (!prueba) entonces()
};

repetir(8, n => {
    aMenosQue(n % 2 == 1, () => console.log(n, " es par"));
});