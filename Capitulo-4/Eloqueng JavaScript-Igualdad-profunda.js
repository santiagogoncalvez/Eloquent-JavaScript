                                                                                                                                            // funcion que compara 2 valores para ver si tienen el mismo valor 
// o si son objetos con las mismas propiedades:

function igualdadProfunda(valor1, valor2) {

    // Verificar si algun valor es null, solo van a ser estrictamente equivalentes si los 2 son null
    if (valor1 == null || valor2 == null) {
        if (valor1 == null && valor2 == null) {
            return true;
        } else return false;
    };


    // Analizar si son del mismo tipo y tienen el mismo valor
    if (typeof valor1 == typeof valor2) {

        // Verificar si son objetos
        if ((typeof valor1 && typeof valor2) != "object") {
            // Si no es objeto
            if (valor1 == valor2) {
                return true;
            } else {
                return false;
            };


        } else {
            // Si es un objeto
            let propiedades1 = Object.keys(valor1);
            let propiedades2 = Object.keys(valor2);
            let contadorP;

            for (let i = 0; i < propiedades1.length; i++) {
                contadorP = igualdadProfunda(valor1[propiedades1[i]], valor2[propiedades1[i]]);
            };

            if (contadorP) {
                return true;
            } else {
                return false;
            };

        };


    } else {
        return false;
    };
};

let valorr1 = { nombre: "pablo", edad: 18 };
let valorr2 = { nombre: "pablo", edad: 18 };

let valor3 = {valor: 1};
let valor4 = null;


console.log(igualdadProfunda(valorr1, valorr2))

console.log(igualdadProfunda(valor3, valor4))